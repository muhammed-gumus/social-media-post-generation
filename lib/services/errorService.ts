/**
 * Error Handling Service
 * Centralized error handling and logging
 */

// Error types for the application
export enum ErrorType {
  // API Errors
  API_ERROR = "api_error",
  NETWORK_ERROR = "network_error",
  TIMEOUT_ERROR = "timeout_error",

  // Content Generation Errors
  TEXT_GENERATION_ERROR = "text_generation_error",
  IMAGE_GENERATION_ERROR = "image_generation_error",

  // User Input Errors
  VALIDATION_ERROR = "validation_error",
  MISSING_PARAMETERS = "missing_parameters",

  // Storage Errors
  STORAGE_ERROR = "storage_error",

  // General Errors
  UNKNOWN_ERROR = "unknown_error",
}

// Custom error class
export class AppError extends Error {
  type: ErrorType;
  details: any;
  timestamp: string;

  constructor(type: ErrorType, message: string, details?: any) {
    super(message);
    this.name = "AppError";
    this.type = type;
    this.details = details || {};
    this.timestamp = new Date().toISOString();
  }
}

// Error handler function
export function handleError(
  error: unknown,
  defaultMessage = "Bilinmeyen bir hata oluştu."
): { message: string; type: ErrorType } {
  console.error("[Error Handler]", error);

  if (error instanceof AppError) {
    // Return our custom app error
    return {
      message: error.message,
      type: error.type,
    };
  } else if (error instanceof Error) {
    // For standard JS errors
    return {
      message: error.message || defaultMessage,
      type: ErrorType.UNKNOWN_ERROR,
    };
  } else if (typeof error === "string") {
    // For string error messages
    return {
      message: error,
      type: ErrorType.UNKNOWN_ERROR,
    };
  }

  // For any other type of errors
  return {
    message: defaultMessage,
    type: ErrorType.UNKNOWN_ERROR,
  };
}

// Helper function for API errors
export function handleApiError(error: unknown, context: string): AppError {
  console.error(`[API Error] ${context}:`, error);

  // Determine error type based on error properties
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase();

    if (errorMessage.includes("network") || errorMessage.includes("fetch")) {
      return new AppError(
        ErrorType.NETWORK_ERROR,
        "Ağ bağlantısı hatası. Lütfen internet bağlantınızı kontrol edin.",
        { originalError: error.message, context }
      );
    } else if (errorMessage.includes("timeout")) {
      return new AppError(
        ErrorType.TIMEOUT_ERROR,
        "İstek zaman aşımına uğradı. Lütfen daha sonra tekrar deneyin.",
        { originalError: error.message, context }
      );
    }
  }

  // Default to generic API error
  return new AppError(
    ErrorType.API_ERROR,
    "API isteği sırasında bir hata oluştu. Lütfen tekrar deneyin.",
    {
      originalError: error instanceof Error ? error.message : String(error),
      context,
    }
  );
}

// Helper function for content generation errors
export function handleContentGenerationError(
  error: unknown,
  contentType: string
): AppError {
  console.error(`[Content Generation Error] ${contentType}:`, error);

  if (contentType === "image") {
    return new AppError(
      ErrorType.IMAGE_GENERATION_ERROR,
      "Görsel içerik oluşturulurken bir hata oluştu. Varsayılan görsel kullanılacak.",
      { originalError: error instanceof Error ? error.message : String(error) }
    );
  } else {
    return new AppError(
      ErrorType.TEXT_GENERATION_ERROR,
      "İçerik oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
      {
        originalError: error instanceof Error ? error.message : String(error),
        contentType,
      }
    );
  }
}

// Validate required parameters
export function validateRequiredParams(
  params: Record<string, any>,
  requiredKeys: string[]
): void {
  const missingParams = requiredKeys.filter((key) => !params[key]);

  if (missingParams.length > 0) {
    throw new AppError(
      ErrorType.MISSING_PARAMETERS,
      `Gerekli parametreler eksik: ${missingParams.join(", ")}`,
      { missingParams }
    );
  }
}
