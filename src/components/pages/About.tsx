import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Workflow } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">About Our Platform</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground mb-8">
            Our Internal Audit Report Generator revolutionizes the way organizations handle their audit processes. 
            By leveraging cutting-edge AI technology, we provide a comprehensive solution for creating detailed, 
            professional audit reports across various industries.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-6 rounded-lg">
              <Target className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">
                To simplify and streamline the internal audit process while maintaining the highest standards 
                of quality and compliance.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg">
              <Workflow className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Approach</h3>
              <p className="text-muted-foreground">
                Combining AI technology with industry expertise to deliver comprehensive audit solutions 
                that meet modern business needs.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
          <ul className="space-y-4 mb-8">
            {benefits.map((benefit, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

const benefits = [
  'Time-efficient report generation with AI assistance',
  'Customizable templates for different industries',
  'Compliance with international audit standards',
  'Secure data handling and storage',
  'Multiple export formats (DOCX, PDF, PPTX)',
  'Collaborative features for team coordination'
];

export default About;