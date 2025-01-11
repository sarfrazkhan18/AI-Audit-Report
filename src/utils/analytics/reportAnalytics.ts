import { db, auth } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export const getReportAnalytics = async () => {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated');
  }

  const q = query(
    collection(db, 'reports'),
    where('userId', '==', auth.currentUser.uid)
  );

  const snapshot = await getDocs(q);
  const reports = snapshot.docs.map(doc => doc.data());

  // Calculate analytics
  const industryDistribution: Record<string, number> = {};
  const riskLevels: Record<string, number> = {
    High: 0,
    Medium: 0,
    Low: 0,
  };

  reports.forEach(report => {
    // Count industries
    if (report.industry) {
      industryDistribution[report.industry] = (industryDistribution[report.industry] || 0) + 1;
    }

    // Count risk levels (assuming the report content contains risk level information)
    const content = report.content as string;
    if (content.includes('Risk Level: High')) riskLevels.High++;
    if (content.includes('Risk Level: Medium')) riskLevels.Medium++;
    if (content.includes('Risk Level: Low')) riskLevels.Low++;
  });

  return {
    reportCount: reports.length,
    industryDistribution,
    riskLevels,
  };
};