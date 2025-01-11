export interface RiskCriteria {
  id: string;
  name: string;
  weight: number;
  description: string;
}

export interface RiskLevel {
  id: string;
  name: string;
  color: string;
  range: {
    min: number;
    max: number;
  };
}

export interface RiskAssessment {
  id: string;
  findingId: string;
  criteria: Record<string, number>;
  totalScore: number;
  level: string;
  timestamp: Date;
  assessedBy: string;
}

export interface RiskMatrix {
  likelihood: number;
  impact: number;
  score: number;
  level: string;
}