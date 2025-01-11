import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ModeToggle } from './mode-toggle';
import { 
  FileText, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useAuthState } from '../hooks/useAuthState';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuthState();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="text-xl font-bold hidden md:inline">Audit Report Generator</span>
              <span className="text-xl font-bold md:hidden">ARG</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {!isAuthPage && (
                <>
                  <Link to="/" className="hover:text-primary-foreground/80">Home</Link>
                  <Link to="/about" className="hover:text-primary-foreground/80">About</Link>
                  {user && (
                    <>
                      <Link to="/dashboard" className="hover:text-primary-foreground/80">Dashboard</Link>
                      <Link to="/reports" className="hover:text-primary-foreground/80">Reports</Link>
                    </>
                  )}
                  <Link to="/terms" className="hover:text-primary-foreground/80">Terms</Link>
                  <ModeToggle />
                  {user && !loading && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleSignOut}
                      className="flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            {!isAuthPage && (
              <button
                className="md:hidden p-2 rounded-md hover:bg-primary-foreground/10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-primary border-t border-primary-foreground/10"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                <Link 
                  to="/" 
                  className="block hover:text-primary-foreground/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/about" 
                  className="block hover:text-primary-foreground/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                {user && (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="block hover:text-primary-foreground/80"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/reports" 
                      className="block hover:text-primary-foreground/80"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Reports
                    </Link>
                  </>
                )}
                <Link 
                  to="/terms" 
                  className="block hover:text-primary-foreground/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Terms
                </Link>
                <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/10">
                  <ModeToggle />
                  {user && !loading && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-primary/5 border-t border-primary/10 py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Audit Report Generator</h3>
              <p className="text-sm text-muted-foreground">
                Streamline your audit process with our powerful report generation tools.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link></li>
                <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary/10 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Audit Report Generator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;