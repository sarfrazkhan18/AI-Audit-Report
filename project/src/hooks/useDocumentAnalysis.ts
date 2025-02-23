import { useState, useCallback } from 'react';
import { analyzeDocuments, type AnalysisResult } from '../utils/document-analysis';
import { DocumentAnalysisError } from '../utils/document-analysis/errors';

interface UseDocumentAnalysisResult {
  results: AnalysisResult[] | null;
  isAnalyzing: boolean;
  error: string | null;
  analyze: (files: File[], industry: string) => Promise<void>;
  reset: () => void;
}

export function useDocumentAnalysis(): UseDocumentAnalysisResult {
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = useCallback(async (files: File[], industry: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const analysisResults = await analyzeDocuments(files, industry);
      setResults(analysisResults);
    } catch (err) {
      if (err instanceof DocumentAnalysisError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred during document analysis');
      }
      console.error('Document analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResults(null);
    setError(null);
    setIsAnalyzing(false);
  }, []);

  return {
    results,
    isAnalyzing,
    error,
    analyze,
    reset
  };
}