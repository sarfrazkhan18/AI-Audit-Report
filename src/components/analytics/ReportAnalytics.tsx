interface AnalyticsData {
  totalReports: number;
  riskDistribution: Record<string, number>;
  departmentBreakdown: Record<string, number>;
  trendsOverTime: Array<{date: Date, count: number}>;
}

// Analytics visualization component 