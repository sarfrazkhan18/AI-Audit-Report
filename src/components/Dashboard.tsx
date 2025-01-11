import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  List, 
  PlusCircle, 
  Clock, 
  BarChart2,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { DataAnalytics } from './analytics/DataAnalytics';
import { useAuthState } from '../hooks/useAuthState';

const Dashboard: React.FC = () => {
  const { user } = useAuthState();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8 space-y-8"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.displayName || 'Auditor'}!</h1>
        <p className="text-muted-foreground">Manage your audit reports and analytics from one place.</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            icon={PlusCircle}
            title="New Report"
            description="Create a new audit report"
            link="/create-report"
            variant="default"
          />
          <QuickActionCard
            icon={List}
            title="My Reports"
            description="View and manage reports"
            link="/reports"
            variant="outline"
          />
          <QuickActionCard
            icon={BarChart2}
            title="Analytics"
            description="View audit insights"
            link="/analytics"
            variant="outline"
          />
          <QuickActionCard
            icon={Settings}
            title="Settings"
            description="Configure preferences"
            link="/settings"
            variant="outline"
          />
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="p-2 rounded-full bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics Overview */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-semibold mb-4">Analytics Overview</h2>
        <DataAnalytics data={{
          reportCount: 15,
          industryDistribution: {
            'Finance': 5,
            'Technology': 4,
            'Healthcare': 3,
            'Manufacturing': 3
          },
          riskLevels: {
            'High': 3,
            'Medium': 7,
            'Low': 5
          }
        }} />
      </motion.div>
    </motion.div>
  );
};

interface QuickActionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  link: string;
  variant?: 'default' | 'outline';
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon: Icon,
  title,
  description,
  link,
  variant = 'default'
}) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardHeader>
      <Icon className="h-8 w-8 text-primary mb-2" />
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <Button asChild variant={variant} className="w-full">
        <Link to={link}>
          Get Started
        </Link>
      </Button>
    </CardContent>
  </Card>
);

const recentActivities = [
  {
    title: 'Financial Audit Report Generated',
    time: '2 hours ago'
  },
  {
    title: 'Risk Assessment Updated',
    time: '4 hours ago'
  },
  {
    title: 'New Compliance Review Started',
    time: '1 day ago'
  }
];

export default Dashboard;