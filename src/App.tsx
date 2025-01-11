import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReportForm';
import ReportList from './components/ReportList';
import EditReport from './components/EditReport';
import Layout from './components/Layout';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Terms from './components/pages/Terms';
import AnalyticsDashboard from './components/analytics/AnalyticsDashboard';
import SettingsPage from './components/settings/SettingsPage';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import TemplateManager from './components/templates/TemplateManager';

function App() {
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/create-report" element={user ? <ReportForm /> : <Navigate to="/login" />} />
            <Route path="/reports" element={user ? <ReportList /> : <Navigate to="/login" />} />
            <Route path="/edit-report/:id" element={user ? <EditReport /> : <Navigate to="/login" />} />
            <Route path="/analytics" element={user ? <AnalyticsDashboard /> : <Navigate to="/login" />} />
            <Route path="/settings" element={user ? <SettingsPage /> : <Navigate to="/login" />} />
            <Route path="/templates" element={user ? <TemplateManager /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;