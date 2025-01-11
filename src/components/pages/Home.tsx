import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, ArrowRight, Star, Shield, Brain } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuthState } from '../../hooks/useAuthState';

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
            Generate Audit Reports
            <span className="bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              {' '}10x faster.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Forget manual report writing. Get professional internal audit reports, findings, and recommendations 
            by just filling a form. Our AI will write everything for you.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {user ? (
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/create-report">
                  Generate Report <ArrowRight className="ml-2" />
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/register">
                  Get Started Now <ArrowRight className="ml-2" />
                </Link>
              </Button>
            )}
          </div>

          {/* Reviews Section */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-2 font-semibold">300+ 5-Star Reviews</span>
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
              Ready to streamline your audit process?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join hundreds of auditors who are saving time and improving their reporting quality.
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
    </div>
  );
};

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Generation',
    description: 'Leverage advanced AI to generate comprehensive audit reports with detailed insights and recommendations.'
  },
  {
    icon: Shield,
    title: 'Industry Standards',
    description: 'All reports follow professional audit standards and best practices across various industries.'
  },
  {
    icon: FileText,
    title: 'Multiple Formats',
    description: 'Export your reports in multiple formats including DOCX, PDF, and PPTX with a single click.'
  }
];

export default Home;