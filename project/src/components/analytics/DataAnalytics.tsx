import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsData {
  reportCount: number;
  industryDistribution: Record<string, number>;
  riskLevels: Record<string, number>;
}

interface DataAnalyticsProps {
  data: AnalyticsData;
}

export const DataAnalytics: React.FC<DataAnalyticsProps> = ({ data }) => {
  const industryChartData = {
    labels: Object.keys(data.industryDistribution),
    datasets: [
      {
        label: 'Reports by Industry',
        data: Object.values(data.industryDistribution),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const riskChartData = {
    labels: Object.keys(data.riskLevels),
    datasets: [
      {
        label: 'Risk Level Distribution',
        data: Object.values(data.riskLevels),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Reports Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{data.reportCount}</div>
          <p className="text-muted-foreground">Total Reports Generated</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Industry Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={industryChartData} options={options} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Risk Level Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={riskChartData} options={options} />
        </CardContent>
      </Card>
    </div>
  );
};