import { Outlet, Link, useLocation } from 'react-router';
import { Heart, Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { Avatar, AvatarFallback } from './ui/avatar';
import { FloatingChatButton } from './FloatingChatButton';
import { AnimatedBackground } from './AnimatedBackground';

export function Layout() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/resources', label: 'Resources' },
    { path: '/assessment', label: 'Self-Assessment' },
    { path: '/community', label: 'Community' },
    { path: '/crisis', label: 'Crisis Support' },
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`${
          scrolled ? 'bg-white/90 shadow-lg' : 'bg-white/80'
        } backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 transition-all duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MindSpace
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Auth Section */}
              {isAuthenticated && user ? (
                <Link to="/profile" className="ml-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`bg-gradient-to-br ${user.avatarColor} text-white text-sm`}>
                        {user.isAnonymous ? '?' : user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-700">
                      {user.isAnonymous ? 'Anonymous' : user.name.split(' ')[0]}
                    </span>
                  </div>
                </Link>
              ) : (
                <Link to="/sign-in" className="ml-2">
                  <Button size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-purple-100 bg-white/95 backdrop-blur-md">
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Auth Section */}
              <div className="pt-2 border-t border-purple-100">
                {isAuthenticated && user ? (
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className={`bg-gradient-to-br ${user.avatarColor} text-white text-sm`}>
                        {user.isAnonymous ? '?' : user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.isAnonymous ? 'Anonymous User' : user.name}
                      </p>
                      <p className="text-xs text-gray-500">View Profile</p>
                    </div>
                  </Link>
                ) : (
                  <Link
                    to="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <Button className="w-full">
                      <User className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </motion.header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-4rem)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-purple-100 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">MindSpace - Mental Health Support for Students</p>
            <p className="text-sm text-gray-500">
              If you're in crisis, please visit our{' '}
              <Link to="/crisis" className="text-purple-600 hover:text-purple-700 underline">
                Crisis Support
              </Link>{' '}
              page for immediate help.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
}