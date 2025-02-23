const AuditAssistant: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Audit Assistant</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Smart recommendations */}
        <RiskPredictions />
        
        {/* Control suggestions */}
        <ControlRecommendations />
        
        {/* Industry benchmarks */}
        <IndustryComparison />
      </CardContent>
    </Card>
  );
}; 