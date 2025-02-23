import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export const BetaSignup: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'betaSignups'), {
        email,
        timestamp: new Date(),
        source: window.location.hostname
      });

      toast({
        title: "Thank you for signing up!",
        description: "We'll notify you when beta access is available."
      });

      setEmail('');
    } catch (error) {
      console.error('Beta signup error:', error);
      toast({
        title: "Error",
        description: "Failed to sign up. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-primary/5 rounded-lg p-6 max-w-md mx-auto"
    >
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Join the Beta</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Get early access to our AI-powered audit report generator and help shape its future.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            Sign Up
          </Button>
        </div>
      </form>

      <div className="mt-4 text-xs text-muted-foreground">
        <p>By signing up, you'll receive:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Early access to new features</li>
          <li>Priority support</li>
          <li>Influence on product development</li>
        </ul>
      </div>
    </motion.div>
  );
};