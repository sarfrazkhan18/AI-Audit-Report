import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card';
import { Slider } from '../ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { AlertTriangle, Info } from 'lucide-react';

interface RiskMatrixProps {
  onScoreChange?: (score: number) => void;
}

const RiskMatrix: React.FC<RiskMatrixProps> = ({ onScoreChange }) => {
  const [likelihood, setLikelihood] = useState(3);
  const [impact, setImpact] = useState(3);

  const calculateRiskLevel = (score: number): { level: string; color: string } => {
    if (score >= 20) return { level: 'Critical', color: 'bg-red-600' };
    if (score >= 15) return { level: 'High', color: 'bg-red-500' };
    if (score >= 10) return { level: 'Medium', color: 'bg-yellow-500' };
    if (score >= 5) return { level: 'Low', color: 'bg-green-500' };
    return { level: 'Very Low', color: 'bg-blue-500' };
  };

  const score = likelihood * impact;
  const riskLevel = calculateRiskLevel(score);

  const handleLikelihoodChange = (value: number[]) => {
    setLikelihood(value[0]);
    onScoreChange?.(value[0] * impact);
  };

  const handleImpactChange = (value: number[]) => {
    setImpact(value[0]);
    onScoreChange?.(likelihood * value[0]);
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Risk Assessment Matrix
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Likelihood</label>
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Likelihood Levels</h4>
                    <div className="text-sm">
                      <p>1-2: Rare</p>
                      <p>3-4: Unlikely</p>
                      <p>5-6: Possible</p>
                      <p>7-8: Likely</p>
                      <p>9-10: Almost Certain</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <span className="text-2xl font-bold">{likelihood}</span>
          </div>
          <Slider
            value={[likelihood]}
            min={1}
            max={10}
            step={1}
            onValueChange={handleLikelihoodChange}
            className="w-full"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <label className="text-sm font-medium">Impact</label>
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold">Impact Levels</h4>
                    <div className="text-sm">
                      <p>1-2: Negligible</p>
                      <p>3-4: Minor</p>
                      <p>5-6: Moderate</p>
                      <p>7-8: Major</p>
                      <p>9-10: Severe</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
            <span className="text-2xl font-bold">{impact}</span>
          </div>
          <Slider
            value={[impact]}
            min={1}
            max={10}
            step={1}
            onValueChange={handleImpactChange}
            className="w-full"
          />
        </div>

        <div className="mt-6 p-4 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Risk Score</span>
            <span className="text-2xl font-bold">{score}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risk Level</span>
            <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${riskLevel.color}`}>
              {riskLevel.level}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskMatrix;