/**
 * Analytics Service
 * Used to track user interactions and content generation events
 */

// Define the event types we want to track
export enum AnalyticsEventType {
  // Wizard events
  WIZARD_STARTED = "wizard_started",
  WIZARD_COMPLETED = "wizard_completed",
  WIZARD_STEP_VIEWED = "wizard_step_viewed",

  // Content generation events
  CONTENT_GENERATION_STARTED = "content_generation_started",
  CONTENT_GENERATION_COMPLETED = "content_generation_completed",
  CONTENT_GENERATION_ERROR = "content_generation_error",

  // Result events
  RESULT_VIEWED = "result_viewed",
  CONTENT_COPIED = "content_copied",
  CONTENT_DOWNLOADED = "content_downloaded",
  CONTENT_SHARED = "content_shared",

  // Platform specific events
  INSTAGRAM_CONTENT_CREATED = "instagram_content_created",
  TWITTER_CONTENT_CREATED = "twitter_content_created",
  LINKEDIN_CONTENT_CREATED = "linkedin_content_created",
  FACEBOOK_CONTENT_CREATED = "facebook_content_created",
}

// Define the event properties interface
interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

/**
 * Track an analytics event
 */
export function trackEvent(
  eventType: AnalyticsEventType,
  properties?: EventProperties
): void {
  // Get session ID from localStorage or create a new one
  let sessionId = localStorage.getItem("analytics_session_id");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("analytics_session_id", sessionId);
  }

  // Add timestamp and session ID to properties
  const eventWithMetadata = {
    event_type: eventType,
    timestamp: new Date().toISOString(),
    session_id: sessionId,
    ...properties,
  };

  // For now, just log to console
  console.log("[Analytics]", eventWithMetadata);

  // In a real implementation, you would send this data to your analytics service
  // Example: sendToAnalyticsService(eventWithMetadata);
}

/**
 * Track wizard step view
 */
export function trackWizardStep(stepNumber: number, stepName: string): void {
  trackEvent(AnalyticsEventType.WIZARD_STEP_VIEWED, {
    step_number: stepNumber,
    step_name: stepName,
  });
}

/**
 * Track content generation
 */
export function trackContentGeneration(
  platform: string,
  contentType: string,
  isSuccess: boolean
): void {
  if (isSuccess) {
    trackEvent(AnalyticsEventType.CONTENT_GENERATION_COMPLETED, {
      platform,
      content_type: contentType,
    });

    // Also track platform-specific event
    switch (platform) {
      case "instagram":
        trackEvent(AnalyticsEventType.INSTAGRAM_CONTENT_CREATED, {
          content_type: contentType,
        });
        break;
      case "twitter":
        trackEvent(AnalyticsEventType.TWITTER_CONTENT_CREATED, {
          content_type: contentType,
        });
        break;
      case "linkedin":
        trackEvent(AnalyticsEventType.LINKEDIN_CONTENT_CREATED, {
          content_type: contentType,
        });
        break;
      case "facebook":
        trackEvent(AnalyticsEventType.FACEBOOK_CONTENT_CREATED, {
          content_type: contentType,
        });
        break;
    }
  } else {
    trackEvent(AnalyticsEventType.CONTENT_GENERATION_ERROR, {
      platform,
      content_type: contentType,
    });
  }
}

/**
 * Track user sharing or downloading content
 */
export function trackContentAction(
  actionType:
    | AnalyticsEventType.CONTENT_COPIED
    | AnalyticsEventType.CONTENT_DOWNLOADED
    | AnalyticsEventType.CONTENT_SHARED,
  platform: string,
  contentType: string
): void {
  trackEvent(actionType, {
    platform,
    content_type: contentType,
  });
}

/**
 * Generate a random session ID
 */
function generateSessionId(): string {
  return (
    "session_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
  );
}
