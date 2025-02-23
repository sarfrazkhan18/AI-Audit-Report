import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { ModeToggle } from './mode-toggle';
import { 
  FileText, 
  Menu, 
  X,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  Settings,
  HelpCircle,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { useAuthState } from '../hooks/useAuthState';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

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

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Reports', href: '/reports', icon: ClipboardList },
    { label: 'Settings', href: '/settings', icon: Settings },
    { label: 'Help', href: '/about', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link to="/" className="flex items-center gap-2 mr-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <FileText className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl hidden md:inline">ARG</span>
          </Link>

          {/* Desktop Navigation */}
          {!isAuthPage && (
            <div className="hidden md:flex items-center space-x-4 flex-1">
              {user && navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                    location.pathname === item.href
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              ))}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <ModeToggle />
            
            {user && !loading && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      <span className="font-medium">
                        {user.displayName?.[0] || user.email?.[0] || 'U'}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.displayName || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {navItems.map((item) => (
                    <DropdownMenuItem
                      key={item.href}
                      onClick={() => navigate(item.href)}
                      className="cursor-pointer"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-600 cursor-pointer focus:text-red-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Button */}
            {!isAuthPage && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
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
              className="md:hidden border-t bg-background"
            >
              <div className="container py-4 space-y-1">
                {user && navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                      location.pathname === item.href
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                ))}
                {user && (
                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>

      <footer className="bg-muted/50 border-t py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Audit Report Generator
              </span>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <a
                href="mailto:meet4sarfraz@gmail.com"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "mailto:meet4sarfraz@gmail.com";
                }}
              >
                <Mail className="h-4 w-4" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;