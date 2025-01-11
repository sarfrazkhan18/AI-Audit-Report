export class ReportGenerationError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'ReportGenerationError';
  }
}

export const ReportErrorCodes = {
  API_KEY_MISSING: 'API_KEY_MISSING',
  API_KEY_INVALID: 'API_KEY_INVALID',
  NETWORK_ERROR: 'NETWORK_ERROR',
  EMPTY_RESPONSE: 'EMPTY_RESPONSE',
  GENERATION_FAILED: 'GENERATION_FAILED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_CONTENT: 'INVALID_CONTENT',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
} as const;