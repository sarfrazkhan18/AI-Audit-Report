import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../firebase';

export const BetaFeedback: React.FC = () => {
  const [feedback, setFeedback] = React.useState('');
  const [rating, setRating] = React.useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback || rating === null) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'feedback'), {
        userId: auth.currentUser?.uid,
        userEmail: auth.currentUser?.email,
        feedback,
        rating,
        timestamp: new Date()
      });

      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve the product."
      });

      setFeedback('');
      setRating(null);
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
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
      className="bg-card rounded-lg p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Share Your Feedback</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            How would you rate your experience?
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className={`p-2 rounded-md transition-colors ${
                  rating === value 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                <Star className={`w-5 h-5 ${rating === value ? 'fill-current' : ''}`} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            What could we improve?
          </label>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[100px]"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || !feedback || rating === null}
          className="w-full"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
          ) : (
            'Submit Feedback'
          )}
        </Button>
      </form>
    </motion.div>
  );
};