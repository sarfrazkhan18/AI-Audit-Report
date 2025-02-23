export class DocumentAnalysisError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'DocumentAnalysisError';
  }
}

export const DocumentAnalysisErrorCodes = {
  PDF_EXTRACTION_ERROR: 'PDF_EXTRACTION_ERROR',
  EXCEL_PROCESSING_ERROR: 'EXCEL_PROCESSING_ERROR',
  TEXT_PROCESSING_ERROR: 'TEXT_PROCESSING_ERROR',
  UNSUPPORTED_FILE_TYPE: 'UNSUPPORTED_FILE_TYPE',
  FILE_SIZE_ERROR: 'FILE_SIZE_ERROR',
  OCR_ERROR: 'OCR_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  ANALYSIS_ERROR: 'ANALYSIS_ERROR'
} as const;