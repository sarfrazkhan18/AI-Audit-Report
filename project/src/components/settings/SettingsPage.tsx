import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Settings, Bell, Shield, User } from 'lucide-react';
import { useAuthState } from '../../hooks/useAuthState';
import ApiSettings from './ApiSettings';

const SettingsPage: React.FC = () => {
  const { user } = useAuthState();

  const settingsSections = [
    {
      title: 'Profile Settings',
      icon: User,
      description: 'Manage your personal information and preferences',
      items: [
        { label: 'Display Name', value: user?.displayName || 'Not set' },
        { label: 'Email', value: user?.email || 'Not set' },
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      description: 'Configure your security preferences',
      items: [
        { label: 'Two-Factor Authentication', value: 'Disabled' },
        { label: 'Password', value: '********' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Customize your notification preferences',
      items: [
        { label: 'Email Notifications', value: 'Enabled' },
        { label: 'Report Updates', value: 'Enabled' },
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-4">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <section.icon className="w-5 h-5 text-primary" />
                    <CardTitle>{section.title}</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full mt-4">
                      Manage {section.title}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ApiSettings />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;