import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Star, Shield, Brain, Upload, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthState } from '../../hooks/useAuthState';
import { DocumentUploader } from '../document-analysis/DocumentUploader';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Insights',
    description: 'Upload your files, and our AI instantly uncovers key patterns, insights, and actionable recommendations.'
  },
  {
    icon: Shield,
    title: 'Industry-Ready Reports',
    description: 'Reports built to comply with audit standards across finance, healthcare, manufacturing, and more.'
  },
  {
    icon: FileText,
    title: 'Smart, Flexible Templates',
    description: 'Custom templates adapt to your data, ensuring every report fits your industry and needs.'
  }
];

const Home: React.FC = () => {
  const { user } = useAuthState();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/40">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Create Audit Reports
            <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              {' '}10x Faster with AI
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Upload your documents, and let our AI instantly deliver professional, insight-packed audit reports.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {user ? (
              <div className="flex gap-4">
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/create-report">
                    Generate Report <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                  <Link to="/create-report#document-analysis">
                    Try Document Analysis
                  </Link>
                </Button>
              </div>
            ) : (
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/register">
                  Start Free <ArrowRight className="ml-2" />
                </Link>
              </Button>
            )}
          </div>

          {/* Document Analysis Preview */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-2xl mx-auto mb-16"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Upload className="w-6 h-6 text-primary" />
                  See the Power of AI in Action
                </h2>
                <p className="text-muted-foreground mb-6">
                  Upload your documents and watch our AI transform them into comprehensive audit reports.
                </p>
                <DocumentUploader
                  onAnalysisComplete={(data) => {
                    console.log('Analysis complete:', data);
                  }}
                  industry="Finance"
                />
              </div>
            </motion.div>
          )}

          {/* Trust Section */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="ml-2 font-semibold">Trusted by 300+ Auditors</span>
            </div>
            <p className="text-muted-foreground italic">
              "This tool cut my reporting time in half!" – Jane D., Senior Auditor
            </p>
          </div>

          {/* Auth Links */}
          <div className="space-y-2 text-center">
            {!user && (
              <>
                <p className="text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Login
                  </Link>
                </p>
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl transition-opacity group-hover:opacity-100 opacity-0" />
              <feature.icon className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Revolutionize Your Audits?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of auditors saving time and delivering smarter, higher-quality reports.
            </p>
            {user ? (
              <Button asChild size="lg">
                <Link to="/create-report">Create Your First Report</Link>
              </Button>
            ) : (
              <Button asChild size="lg">
                <Link to="/register">Start Free</Link>
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Audit Report Generator</h3>
            <p className="text-muted-foreground mb-8">
              Your all-in-one tool to simplify audits and boost productivity.
            </p>
            <div className="flex justify-center gap-8 mb-8">
              <Link to="/about" className="text-muted-foreground hover:text-primary">About</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary">Terms of Service</Link>
              <a 
                href="mailto:meet4sarfraz@gmail.com"
                className="text-muted-foreground hover:text-primary flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:meet4sarfraz@gmail.com";
                }}
              >
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Need help? <a 
                href="mailto:meet4sarfraz@gmail.com"
                className="text-primary hover:underline flex items-center gap-1 inline-flex"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:meet4sarfraz@gmail.com";
                }}
              >
                <Mail className="h-4 w-4" />
                Reach out to our support team
              </a>
            </p>
            <p className="text-sm text-muted-foreground mt-8">
              © {new Date().getFullYear()} Audit Report Generator. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;