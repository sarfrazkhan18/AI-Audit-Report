import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { useDocumentAnalysis } from '../../hooks/useDocumentAnalysis';
import { useToast } from '../ui/use-toast';
import { AnalysisResults } from './AnalysisResults';

interface DocumentUploaderProps {
  onAnalysisComplete: (data: any) => void;
  industry: string;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({
  onAnalysisComplete,
  industry
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const { results, isAnalyzing, error, analyze } = useDocumentAnalysis();
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const totalSize = acceptedFiles.reduce((acc, file) => acc + file.size, 0);
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (totalSize > maxSize) {
      toast({
        title: "Error",
        description: "Total file size exceeds 50MB limit",
        variant: "destructive"
      });
      return;
    }

    setFiles(acceptedFiles);
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/plain': ['.txt']
    },
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const handleAnalysis = async () => {
    if (files.length === 0) return;

    try {
      await analyze(files, industry);
      onAnalysisComplete(results);
      
      toast({
        title: "Analysis Complete",
        description: `Successfully analyzed ${files.length} document${files.length > 1 ? 's' : ''}`
      });
    } catch (err: any) {
      toast({
        title: "Analysis Failed",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Document Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary'}`}
          >
            <input {...getInputProps()} />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="flex justify-center">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  {isDragActive
                    ? "Drop the files here"
                    : "Drag & drop files here, or click to select"}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Supported formats: PDF, Excel (.xlsx, .xls), Text (.txt)
                </p>
                <p className="text-sm text-muted-foreground">
                  Maximum total size: 50MB
                </p>
              </div>
            </motion.div>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Selected Files:</h3>
              <ul className="space-y-1">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
                  </li>
                ))}
              </ul>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <Button
            onClick={handleAnalysis}
            disabled={files.length === 0 || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Documents...
              </>
            ) : (
              'Analyze Documents'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {results && <AnalysisResults results={results} />}
    </div>
  );
};