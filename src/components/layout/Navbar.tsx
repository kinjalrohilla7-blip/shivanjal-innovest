import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Building2,
  Menu,
  X,
  User,
  LayoutDashboard,
  LogIn,
  LogOut,
  Heart,
  Sparkles,
  Search,
  ChevronDown
} from 'lucide-react';

const navLinks = [
  { name: 'Properties', path: '/properties', icon: Building2 },
  { name: 'AI Analyzer', path: '/ai-analyzer', icon: Sparkles },
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-primary/90 backdrop-blur-xl border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center"
              >
                <Building2 className="w-6 h-6 text-primary" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight">
                  Shivanjal
                </span>
                <span className="text-xs text-gold-500 -mt-0.5 tracking-wider">
                  INNOVEST
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link key={link.name} to={link.path}>
                    <motion.div
                      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gold-500/20 text-gold-500'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{link.name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:border-gold-500/30 transition-all duration-300"
              >
                <Search className="w-5 h-5" />
              </motion.button>

              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-gold-500/30 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </motion.button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 glass-card p-2"
                      >
                        <Link
                          to="/dashboard"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-gold-500" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-gold-500" />
                          <span>Wishlist</span>
                        </Link>
                        <button
                          onClick={() => setIsAuthenticated(false)}
                          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-400" />
                          <span className="text-red-400">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Login</span>
                    </motion.button>
                  </Link>
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(200, 169, 107, 0.4)' }}
                      whileTap={{ scale: 0.98 }}
                      className="gold-gradient px-5 py-2 rounded-xl text-primary font-semibold"
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-primary border-l border-white/10 p-6"
            >
              <div className="mt-20 space-y-4">
                {navLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={link.path}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <Icon className="w-5 h-5 text-gold-500" />
                        <span>{link.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-4 border-t border-white/10 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                      >
                        <LayoutDashboard className="w-5 h-5 text-gold-500" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => setIsAuthenticated(false)}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
                      >
                        <LogOut className="w-5 h-5 text-red-400" />
                        <span className="text-red-400">Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block w-full text-center gold-gradient px-5 py-3 rounded-xl text-primary font-semibold"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="block w-full text-center border-2 border-gold-500 text-gold-500 px-5 py-3 rounded-xl font-semibold"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
