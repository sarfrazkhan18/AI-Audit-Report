import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-4 mb-8">
          <ScrollText className="w-10 h-10 text-primary" />
          <h1 className="text-4xl font-bold">Terms of Service</h1>
        </div>

        <div className="prose prose-lg max-w-none">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              <p className="text-muted-foreground mb-4">{section.content}</p>
            </motion.section>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using this platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.'
  },
  {
    title: '2. Use License',
    content: 'Permission is granted to temporarily access the platform for personal or business use. This is the grant of a license, not a transfer of title.'
  },
  {
    title: '3. Data Privacy',
    content: 'We are committed to protecting your privacy. All data collected through our platform is handled in accordance with our Privacy Policy.'
  },
  {
    title: '4. Service Availability',
    content: 'We strive to provide uninterrupted service but cannot guarantee the platform will be available at all times. Maintenance and updates may cause temporary interruptions.'
  },
  {
    title: '5. User Obligations',
    content: 'Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.'
  }
];

export default Terms;