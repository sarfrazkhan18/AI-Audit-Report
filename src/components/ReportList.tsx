import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { AlertCircle } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  createdAt: any;
}

const ReportList: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      setIsLoading(true);
      setError(null);
      if (auth.currentUser) {
        try {
          const q = query(collection(db, 'reports'), where('userId', '==', auth.currentUser.uid));
          const querySnapshot = await getDocs(q);
          const fetchedReports: Report[] = [];
          querySnapshot.forEach((doc) => {
            fetchedReports.push({ id: doc.id, ...doc.data() } as Report);
          });
          setReports(fetchedReports);
        } catch (error) {
          console.error('Error fetching reports:', error);
          setError('Unable to load reports. Please check your internet connection and try again.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <div className="flex items-center">
            <AlertCircle className="mr-2" size={20} />
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
        <Link to="/dashboard" className="mt-6 inline-block text-blue-500 hover:underline">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Reports</h1>
      {reports.length === 0 ? (
        <p>No reports found. <Link to="/create-report" className="text-blue-500 hover:underline">Create a new report</Link></p>
      ) : (
        <ul className="space-y-4">
          {reports.map((report) => (
            <li key={report.id} className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-semibold">{report.title}</h2>
              <p className="text-gray-500">Created: {report.createdAt.toDate().toLocaleDateString()}</p>
              <Link to={`/edit-report/${report.id}`} className="text-blue-500 hover:underline">Edit Report</Link>
            </li>
          ))}
        </ul>
      )}
      <Link to="/dashboard" className="mt-6 inline-block text-blue-500 hover:underline">Back to Dashboard</Link>
    </div>
  );
};

export default ReportList;