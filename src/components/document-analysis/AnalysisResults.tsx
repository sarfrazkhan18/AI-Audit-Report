import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Table, AlertTriangle, Clock, BarChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AnalysisResult } from '../../utils/document-analysis/types';

interface AnalysisResultsProps {
  results: AnalysisResult[];
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ results }) => {
  const renderMetrics = (result: AnalysisResult) => {
    if (result.type === 'excel') {
      const data = result.data as any;
      return Object.entries(data.sheets).map(([sheetName, sheet]: [string, any]) => (
        <div key={sheetName} className="space-y-2">
          <h4 className="font-medium">{sheetName}</h4>
          {sheet.summary && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Totals</p>
                {Object.entries(sheet.summary.totals).map(([col, val]) => (
                  <p key={col} className="text-sm">
                    {col}: {typeof val === 'number' ? val.toLocaleString() : val}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Averages</p>
                {Object.entries(sheet.summary.averages).map(([col, val]) => (
                  <p key={col} className="text-sm">
                    {col}: {typeof val === 'number' ? val.toLocaleString() : val}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      ));
    }

    if (result.type === 'text') {
      const data = result.data as any;
      return (
        <div className="space-y-4">
          {data.keyFindings.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Key Findings</h4>
              <ul className="list-disc list-inside space-y-1">
                {data.keyFindings.map((finding: string, index: number) => (
                  <li key={index} className="text-sm">{finding}</li>
                ))}
              </ul>
            </div>
          )}
          {Object.entries(data.metrics).length > 0 && (
            <div>
              <h4 className="font-medium mb-2">Metrics</h4>
              {Object.entries(data.metrics).map(([key, value]) => (
                <p key={key} className="text-sm">
                  {key}: {value}
                </p>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Analysis Results</h3>
      
      {results.map((result, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                {result.type === 'pdf' && <FileText className="w-5 h-5" />}
                {result.type === 'excel' && <Table className="w-5 h-5" />}
                {result.type === 'text' && <FileText className="w-5 h-5" />}
                {result.metadata.filename}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Processing Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {result.metrics?.processingTime.toFixed(2)}s
                  </div>
                  {result.metrics?.confidenceScore && (
                    <div className="flex items-center gap-1">
                      <BarChart className="w-4 h-4" />
                      {(result.metrics.confidenceScore * 100).toFixed(0)}% confidence
                    </div>
                  )}
                </div>

                {/* Warnings */}
                {result.metadata.warnings.length > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md">
                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                      <AlertTriangle className="w-4 h-4" />
                      <p className="text-sm font-medium">Warnings</p>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {result.metadata.warnings.map((warning, i) => (
                        <li key={i} className="text-sm text-yellow-600 dark:text-yellow-400">
                          {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Analysis Results */}
                <div className="mt-4">
                  {renderMetrics(result)}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};