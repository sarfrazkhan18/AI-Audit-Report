interface RiskFactor {
  category: string;
  likelihood: number;
  impact: number;
  controls: string[];
}

// Risk assessment component with matrix visualization 