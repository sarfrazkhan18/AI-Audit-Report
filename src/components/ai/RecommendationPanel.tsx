import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { generateRecommendations } from '../../utils/ai/recommendationEngine';
import { AnalysisResult } from '../../utils/document-analysis/types';

interface RecommendationPanelProps {
  analysisResults: AnalysisResult[];
  industry: string;
  riskScore: number;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({
  analysisResults,
  industry,
  riskScore
}) => {
  const recommendations = generateRecommendations(analysisResults, industry, riskScore);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-500 dark:text-red-400';
      case 'medium':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'low':
        return 'text-green-500 dark:text-green-400';
      default:
        return 'text-blue-500 dark:text-blue-400';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-5 h-5" />;
      case 'medium':
        return <Info className="w-5 h-5" />;
      case 'low':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5" />
          AI-Generated Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className={getSeverityColor(rec.severity)}>
                  {getSeverityIcon(rec.severity)}
                </span>
                <h4 className="font-medium">{rec.type}</h4>
                <span className={`ml-auto text-sm font-medium ${getSeverityColor(rec.severity)}`}>
                  {rec.severity.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {rec.description}
              </p>
              <div className="pt-2">
                <p className="text-sm font-medium">Recommendation:</p>
                <p className="text-sm text-muted-foreground">
                  {rec.recommendation}
                </p>
              </div>
            </motion.div>
          ))}

          {recommendations.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No recommendations generated. All analyzed aspects appear to meet standards.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};