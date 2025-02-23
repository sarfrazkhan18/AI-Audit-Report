import React from 'react';
import { motion } from 'framer-motion';
import { DataAnalytics } from './DataAnalytics';
import { getReportAnalytics } from '../../utils/analytics/reportAnalytics';
import { useEffect, useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';

interface AnalyticsData {
  reportCount: number;
  industryDistribution: Record<string, number>;
  riskLevels: Record<string, number>;
}

const AnalyticsDashboard: React.FC = () => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsData = await getReportAnalytics();
        setData(analyticsData);
      } catch (err) {
        setError('Failed to load analytics data. Please try again later.');
        console.error('Analytics error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-destructive">
        <AlertCircle className="w-6 h-6 mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No analytics data available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-8">Analytics Dashboard</h1>
        <DataAnalytics data={data} />
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;