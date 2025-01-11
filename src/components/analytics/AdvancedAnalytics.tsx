const AdvancedAnalytics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Risk trends over time */}
      <RiskTrendsChart />
      
      {/* Department performance */}
      <DepartmentMetrics />
      
      {/* Compliance status */}
      <ComplianceStatus />
      
      {/* AI-powered insights */}
      <AuditInsights />
    </div>
  );
}; 