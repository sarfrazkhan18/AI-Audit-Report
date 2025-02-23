import { AnalysisResult } from '../document-analysis/types';

interface RiskIndicator {
  type: string;
  severity: 'high' | 'medium' | 'low';
  description: string;
  recommendation: string;
}

export function generateRecommendations(
  analysisResults: AnalysisResult[],
  industry: string,
  riskScore: number
): RiskIndicator[] {
  const recommendations: RiskIndicator[] = [];

  // Process Excel data
  analysisResults.forEach(result => {
    if (result.type === 'excel') {
      const excelData = result.data as any;
      Object.entries(excelData.sheets).forEach(([sheetName, data]: [string, any]) => {
        if (data.summary) {
          // Financial risk indicators
          Object.entries(data.summary.averages).forEach(([column, value]: [string, number]) => {
            // Check for expense-related columns
            if (column.toLowerCase().includes('expense') || column.toLowerCase().includes('cost')) {
              const revenueColumn = Object.entries(data.summary.averages)
                .find(([col]) => col.toLowerCase().includes('revenue'));
              
              if (revenueColumn && value > revenueColumn[1]) {
                recommendations.push({
                  type: 'Financial Risk',
                  severity: 'high',
                  description: `Expenses (${column}) exceed revenue in ${sheetName}`,
                  recommendation: 'Conduct detailed cost analysis and implement expense reduction measures'
                });
              }
            }

            // Check for unusual variances
            const stdDev = calculateStandardDeviation(data.rows.map((row: any[]) => row[data.headers.indexOf(column)]));
            if (stdDev > value * 0.5) { // High variance threshold
              recommendations.push({
                type: 'Data Variance',
                severity: 'medium',
                description: `High variance detected in ${column}`,
                recommendation: 'Investigate unusual patterns and verify data consistency'
              });
            }
          });
        }
      });
    }

    // Process text/PDF content
    if (result.type === 'text' || result.type === 'pdf') {
      const content = result.type === 'text' ? 
        (result.data as any).sections : 
        (result.data as any).text;

      // Check for compliance-related keywords
      const complianceKeywords = ['compliance', 'regulation', 'policy', 'requirement'];
      const hasComplianceTerms = complianceKeywords.some(keyword => 
        content.toLowerCase().includes(keyword)
      );

      if (!hasComplianceTerms) {
        recommendations.push({
          type: 'Compliance',
          severity: 'high',
          description: 'No compliance-related terms found in documentation',
          recommendation: 'Review and document compliance requirements and controls'
        });
      }

      // Check for risk-related keywords
      const riskKeywords = ['risk', 'threat', 'vulnerability', 'exposure'];
      const hasRiskTerms = riskKeywords.some(keyword => 
        content.toLowerCase().includes(keyword)
      );

      if (!hasRiskTerms) {
        recommendations.push({
          type: 'Risk Assessment',
          severity: 'medium',
          description: 'Limited risk assessment documentation found',
          recommendation: 'Conduct and document comprehensive risk assessment'
        });
      }

      // Industry-specific checks
      if (industry === 'Finance') {
        const controlKeywords = ['control', 'oversight', 'monitoring', 'review'];
        const hasControls = controlKeywords.some(keyword => 
          content.toLowerCase().includes(keyword)
        );

        if (!hasControls) {
          recommendations.push({
            type: 'Internal Controls',
            severity: 'high',
            description: 'Limited internal control documentation',
            recommendation: 'Strengthen and document internal control framework'
          });
        }
      }

      // Check OCR confidence
      if (result.metrics?.confidenceScore && result.metrics.confidenceScore < 0.8) {
        recommendations.push({
          type: 'Data Quality',
          severity: 'medium',
          description: `Low OCR confidence (${(result.metrics.confidenceScore * 100).toFixed(0)}%) in document analysis`,
          recommendation: 'Verify extracted data manually and consider rescanning documents'
        });
      }
    }
  });

  // Risk score-based recommendations
  if (riskScore > 15) {
    recommendations.push({
      type: 'Overall Risk',
      severity: 'high',
      description: `High risk score detected (${riskScore})`,
      recommendation: 'Implement immediate risk mitigation measures and increase monitoring frequency'
    });
  }

  return recommendations;
}

function calculateStandardDeviation(values: number[]): number {
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const squareDiffs = values.map(value => Math.pow(value - avg, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / squareDiffs.length;
  return Math.sqrt(avgSquareDiff);
}