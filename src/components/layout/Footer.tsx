import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight
} from 'lucide-react';

const footerLinks = {
  platform: [
    { name: 'Properties', path: '/properties' },
    { name: 'AI Analyzer', path: '/ai-analyzer' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Wishlist', path: '/wishlist' }
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Press', path: '/press' },
    { name: 'Contact', path: '/contact' }
  ],
  resources: [
    { name: 'Blog', path: '/blog' },
    { name: 'Market Insights', path: '/insights' },
    { name: 'Investment Guide', path: '/guide' },
    { name: 'FAQs', path: '/faq' }
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Cookie Policy', path: '/cookies' }
  ]
};

const socialLinks = [
  { icon: Twitter, link: '#', label: 'Twitter' },
  { icon: Linkedin, link: '#', label: 'LinkedIn' },
  { icon: Instagram, link: '#', label: 'Instagram' },
  { icon: Youtube, link: '#', label: 'YouTube' }
];

export function Footer() {
  return (
    <footer className="relative bg-primary border-t border-white/10">
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
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

            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              AI-powered real estate investment platform. Discover high-growth properties
              with intelligent insights.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:contact@shivanjalinnovest.com"
                className="flex items-center space-x-3 text-gray-400 hover:text-gold-500 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">contact@shivanjalinnovest.com</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center space-x-3 text-gray-400 hover:text-gold-500 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-gold-500 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-gold-500 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-gold-500 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm hover:text-gold-500 transition-colors flex items-center group"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">
                Get the latest investment insights and market updates.
              </p>
            </div>
            <div className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-72 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-all text-white"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 gold-gradient rounded-xl text-primary font-semibold"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Shivanjal Innovest. All rights reserved.
          </p>

          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.link}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-gold-500 hover:border-gold-500/30 hover:shadow-glow transition-all duration-300"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
