/**
 * Twitter API Service
 * Handles Twitter API requests to fetch user statistics
 */

// Simple request cache to reduce API calls
type CacheEntry<T> = {
  data: T;
  timestamp: number;
};

class RequestCache {
  private static cache: Map<string, CacheEntry<unknown>> = new Map();
  private static CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache time

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if the entry has expired
    if (Date.now() - entry.timestamp > this.CACHE_TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  static set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  static clear(): void {
    this.cache.clear();
  }
}

// Request queue to manage API calls and prevent overwhelming the API
class RequestQueue {
  private static queue: Array<() => Promise<unknown>> = [];
  private static isProcessing = false;
  private static minRequestInterval = 1000; // Min 1 second between requests
  private static lastRequestTime = 0;

  static async add<T>(requestFn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          // Ensure minimum time between requests
          const now = Date.now();
          const elapsed = now - this.lastRequestTime;
          if (elapsed < this.minRequestInterval) {
            await sleep(this.minRequestInterval - elapsed);
          }

          this.lastRequestTime = Date.now();
          const result = await requestFn();
          resolve(result);
          return result;
        } catch (error) {
          reject(error);
          throw error;
        }
      });

      if (!this.isProcessing) {
        this.processQueue();
      }
    });
  }

  private static async processQueue() {
    if (this.queue.length === 0) {
      this.isProcessing = false;
      return;
    }

    this.isProcessing = true;
    const nextRequest = this.queue.shift();

    try {
      if (nextRequest) {
        await nextRequest();
      }
    } finally {
      // Continue processing queue regardless of success/failure
      this.processQueue();
    }
  }
}

/**
 * Interface for user profile data
 */
export interface TwitterUserProfile {
  id: string;
  username: string;
  name: string;
  description: string;
  profileImageUrl: string;
  followersCount: number;
  followingCount: number;
  tweetCount: number;
  createdAt: string;
  verified: boolean;
}

/**
 * Interface for user timeline/tweets data
 */
export interface TwitterUserTweets {
  tweets: {
    id: string;
    text: string;
    createdAt: string;
    publicMetrics: {
      retweetCount: number;
      replyCount: number;
      likeCount: number;
      quoteCount: number;
      impressionCount?: number;
    };
  }[];
}

// Rate limit error class for better error handling
export class RateLimitError extends Error {
  retryAfter: number;

  constructor(message: string, retryAfter: number = 60) {
    super(message);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

/**
 * Retry configuration
 */
interface RetryConfig {
  maxRetries: number;
  initialDelayMs: number;
  backoffFactor: number;
  maxDelayMs: number;
}

// Enhanced retry configuration with more retries and longer delays
const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3, // Lower to 3 but with smarter handling
  initialDelayMs: 2000,
  backoffFactor: 2,
  maxDelayMs: 30000, // Cap maximum delay at 30 seconds
};

/**
 * Sleep for specified milliseconds
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Parse retry-after header or generate exponential backoff delay
 * @param retryAfter Retry-After header value
 * @param attempt Current attempt number
 * @param config Retry configuration
 */
function calculateBackoff(
  retryAfter: string | null,
  attempt: number,
  config: RetryConfig
): number {
  // First try to use the retry-after header if available
  if (retryAfter) {
    const retryAfterMs = parseInt(retryAfter) * 1000;
    return retryAfterMs;
  }

  // Calculate exponential backoff with jitter
  const exponentialDelay =
    config.initialDelayMs * Math.pow(config.backoffFactor, attempt);
  const jitter = Math.random() * 1000; // Add random jitter to prevent thundering herd
  return Math.min(exponentialDelay + jitter, config.maxDelayMs);
}

/**
 * Wrapper to handle API requests with retry logic for rate limiting
 */
async function fetchWithRetry<T>(
  url: string,
  options: RequestInit = {},
  retryConfig: RetryConfig = DEFAULT_RETRY_CONFIG
): Promise<T> {
  let retries = 0;

  while (true) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return (await response.json()) as T;
      }

      // Check if we got a rate limit error (429)
      if (response.status === 429) {
        // Extract retry-after header if available
        const retryAfter = response.headers.get("retry-after");
        const retrySeconds = retryAfter ? parseInt(retryAfter) : 60;

        if (retries < retryConfig.maxRetries) {
          const delayMs = calculateBackoff(retryAfter, retries, retryConfig);

          console.log(
            `Rate limit exceeded. Retrying after ${delayMs}ms (Retry ${
              retries + 1
            }/${retryConfig.maxRetries})...`
          );

          await sleep(delayMs);
          retries++;
          continue;
        }

        // If we've exhausted retries, throw a specific rate limit error
        throw new RateLimitError(
          `Twitter API hız sınırına ulaşıldı. Lütfen ${retrySeconds} saniye sonra tekrar deneyin.`,
          retrySeconds
        );
      }

      // Handle other errors
      const errorData = await response.json();
      throw new Error(
        errorData.error ||
          `Twitter API error: ${response.status} ${JSON.stringify(errorData)}`
      );
    } catch (error) {
      if (
        retries < retryConfig.maxRetries &&
        error instanceof Error &&
        (error.message.includes("429") || error.message.includes("rate limit"))
      ) {
        const delayMs = calculateBackoff(null, retries, retryConfig);

        console.log(
          `Error occurred: ${
            error.message
          }. Retrying after ${delayMs}ms (Retry ${retries + 1}/${
            retryConfig.maxRetries
          })...`
        );

        await sleep(delayMs);
        retries++;
        continue;
      }
      throw error;
    }
  }
}

/**
 * Fetch a user's profile information from Twitter API
 * @param username Twitter handle without the @ symbol
 */
export async function fetchTwitterUserProfile(
  username: string
): Promise<TwitterUserProfile> {
  // Check cache first
  const cacheKey = `profile:${username}`;
  const cachedProfile = RequestCache.get<TwitterUserProfile>(cacheKey);
  if (cachedProfile) {
    console.log("Using cached profile data for:", username);
    return cachedProfile;
  }

  try {
    // Queue the request to prevent overwhelming the API
    const profile = await RequestQueue.add<TwitterUserProfile>(() =>
      fetchWithRetry<TwitterUserProfile>(
        `/api/twitter/user?username=${encodeURIComponent(username)}`
      )
    );

    // Cache the result
    RequestCache.set(cacheKey, profile);
    return profile;
  } catch (error) {
    // Let rate limit errors bubble up with specific message
    if (error instanceof RateLimitError) {
      throw error;
    }
    console.error("Twitter kullanıcı profili alınırken hata:", error);
    throw new Error(
      error instanceof Error
        ? `Twitter kullanıcı verisi alınamadı: ${error.message}`
        : "Twitter kullanıcı verisi alınamadı"
    );
  }
}

/**
 * Fetch a user's recent tweets from Twitter API
 * @param userId Twitter user ID
 * @param count Number of tweets to fetch (default: 10)
 */
export async function fetchUserTweets(
  userId: string,
  count: number = 10
): Promise<TwitterUserTweets> {
  // Check cache first
  const cacheKey = `tweets:${userId}:${count}`;
  const cachedTweets = RequestCache.get<TwitterUserTweets>(cacheKey);
  if (cachedTweets) {
    console.log("Using cached tweets data for:", userId);
    return cachedTweets;
  }

  try {
    // For larger requests, split into multiple smaller batches to avoid rate limits
    const safeCount = Math.min(count, 10); // Never request more than 10 at a time

    // Queue the request to prevent overwhelming the API
    const tweets = await RequestQueue.add<TwitterUserTweets>(() =>
      fetchWithRetry<TwitterUserTweets>(
        `/api/twitter/tweets?userId=${encodeURIComponent(
          userId
        )}&count=${safeCount}`
      )
    );

    // Cache the result
    RequestCache.set(cacheKey, tweets);
    return tweets;
  } catch (error) {
    // Let rate limit errors bubble up with specific message
    if (error instanceof RateLimitError) {
      throw error;
    }
    console.error("Twitter gönderileri alınırken hata:", error);
    throw new Error(
      error instanceof Error
        ? `Twitter tweetleri alınamadı: ${error.message}`
        : "Twitter tweetleri alınamadı"
    );
  }
}

/**
 * Generate user insights based on Twitter data using Gemini API
 * @param userProfile User profile data
 * @param userTweets User tweets data
 */
export async function generateTwitterInsights(
  userProfile: TwitterUserProfile,
  userTweets: TwitterUserTweets
): Promise<string> {
  // Check cache first
  const cacheKey = `insights:${userProfile.id}:${userTweets.tweets.length}`;
  const cachedInsights = RequestCache.get<string>(cacheKey);
  if (cachedInsights) {
    console.log("Using cached insights data");
    return cachedInsights;
  }

  try {
    // Queue the request to prevent overwhelming the API
    const response = await RequestQueue.add<{ insights: string }>(() =>
      fetchWithRetry<{ insights: string }>("/api/twitter/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userProfile, userTweets }),
      })
    );

    // Cache the result
    RequestCache.set(cacheKey, response.insights);
    return response.insights;
  } catch (error) {
    console.error("Twitter içgörüleri oluşturulurken hata:", error);
    throw new Error(
      error instanceof Error
        ? `İçgörüler oluşturulamadı: ${error.message}`
        : "İçgörüler oluşturulamadı"
    );
  }
}

/**
 * Clear all cached Twitter data
 */
export function clearTwitterCache(): void {
  RequestCache.clear();
}
