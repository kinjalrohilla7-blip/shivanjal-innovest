import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Sparkles,
  TrendingUp,
  Shield,
  MapPin,
  Building2,
  ArrowRight,
  Play,
  Star,
  Zap,
  LineChart,
  Wallet,
  Target,
  ChevronRight,
  MoveRight
} from 'lucide-react';
import { AnimatedCounter, AnimatedWords } from '../components/ui/AnimatedNumber';
import { GlassCard, GlowButton, Badge } from '../components/ui/GlassCard';
import { supabase, formatPrice, Property } from '../lib/supabase';

const stats = [
  { value: 500, suffix: '+', label: 'Premium Properties', icon: Building2 },
  { value: 98, suffix: '%', label: 'Client Satisfaction', icon: Star },
  { value: 2500, suffix: 'Cr+', label: 'Investment Facilitated', icon: Wallet },
  { value: 15, suffix: '+', label: 'Cities Covered', icon: MapPin }
];

const features = [
  {
    icon: Sparkles,
    title: 'AI Investment Score',
    description: 'Advanced ML algorithms analyze locality growth, infrastructure, and market trends to score every property.',
    stat: '9.2',
    statLabel: 'Avg Score'
  },
  {
    icon: TrendingUp,
    title: 'ROI Predictions',
    description: 'Get projected returns with confidence intervals based on historical data and market analysis.',
    stat: '28%',
    statLabel: 'Avg ROI'
  },
  {
    icon: Shield,
    title: 'Verified Properties',
    description: 'Every property undergoes rigorous legal and quality verification before listing.',
    stat: '100%',
    statLabel: 'Verified'
  },
  {
    icon: Target,
    title: 'Smart Matching',
    description: 'AI matches your investment profile with properties that fit your goals and risk appetite.',
    stat: '95%',
    statLabel: 'Match Rate'
  }
];

const trendingZones = [
  { city: 'Mumbai', area: 'Lower Parel', growth: '+35%', properties: 45, color: 'from-gold-500 to-amber-500', trend: 'Hot' },
  { city: 'Bangalore', area: 'Whitefield', growth: '+42%', properties: 62, color: 'from-emerald-500 to-teal-500', trend: 'Rising' },
  { city: 'Gurgaon', area: 'Sector 42', growth: '+28%', properties: 38, color: 'from-blue-500 to-indigo-500', trend: 'Stable' },
  { city: 'Mumbai', area: 'Bandra West', growth: '+55%', properties: 28, color: 'from-pink-500 to-rose-500', trend: 'Premium' }
];

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const { data } = await supabase
        .from('properties')
        .select(`
          *,
          property_images (
            id,
            image_url,
            is_primary,
            display_order
          )
        `)
        .eq('is_featured', true)
        .limit(8);

      if (data) {
        setFeaturedProperties(data);
      }
    } catch (err) {
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/95 to-primary" />
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920"
            alt="City skyline"
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />

          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(200, 169, 107, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 169, 107, 0.3) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Glow Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-[5%] w-[400px] h-[400px] rounded-full bg-gold-500/20 blur-[120px]"
          />
          <motion.div
            animate={{
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] rounded-full bg-gold-600/10 blur-[150px]"
          />
          <motion.div
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-emerald-500/5 blur-[100px]"
          />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 right-20 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="glass-card p-4 animate-float"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Average ROI</p>
                <p className="text-xl font-bold text-emerald-400">+28.5%</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-32 left-20 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="glass-card p-4 animate-float-delayed"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Properties Verified</p>
                <p className="text-xl font-bold text-gold-500">100%</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-gold-500" />
              </motion.div>
              <span className="text-sm text-gold-400 font-medium">AI-Powered Real Estate Investment</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-tight"
          >
            <AnimatedWords text="Invest Smarter" />
            <br />
            <span className="relative">
              <span className="bg-gradient-to-r from-gold-200 via-gold-400 to-gold-500 bg-clip-text text-transparent text-shadow-glow">
                In Real Estate
              </span>
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            AI-powered insights for high-growth property investments.
            <span className="block mt-2 text-gray-400">Discover opportunities before anyone else.</span>
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-10"
          >
            <div className="glass-card p-2 flex flex-col md:flex-row gap-3 shadow-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by city, locality, or project name..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 transition-all"
                />
              </div>
              <Link to="/properties" className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full md:w-auto px-8 py-4 gold-gradient rounded-xl text-primary font-semibold flex items-center justify-center gap-2 shadow-glow"
                >
                  <Search className="w-5 h-5" />
                  <span>Explore Properties</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {['Mumbai', 'Bangalore', 'Under ₹1 Cr', 'High ROI', 'Verified'].map((tag, i) => (
              <motion.button
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.05 }}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(200, 169, 107, 0.15)' }}
                className="px-4 py-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-full hover:border-gold-500/30 transition-all"
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/properties">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(200, 169, 107, 0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 gold-gradient rounded-xl text-primary font-semibold text-lg flex items-center gap-3 shadow-glow"
              >
                <span>Explore Properties</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.span>
              </motion.button>
            </Link>
            <Link to="/ai-analyzer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 border-2 border-gold-500/50 text-gold-400 rounded-xl font-semibold text-lg flex items-center gap-3 hover:bg-gold-500/10 hover:border-gold-500 transition-all"
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.span>
                <span>Ask AI Advisor</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 border-2 border-primary flex items-center justify-center text-xs text-primary font-bold">
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span>2,500+ Happy Investors</span>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-500 fill-gold-500" />
              ))}
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Properties</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-white/10 bg-gradient-to-b from-primary to-primary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Trusted by <span className="gold-text-gradient">Thousands</span>
            </h2>
            <p className="text-gray-400">Join the smart investment revolution</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <GlassCard className="p-8 text-center group hover:shadow-glow transition-all duration-300">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gold-400/20 to-gold-600/20 flex items-center justify-center group-hover:shadow-glow"
                  >
                    <stat.icon className="w-8 h-8 text-gold-500" />
                  </motion.div>
                  <div className="text-4xl md:text-5xl font-bold mb-2 gold-text-gradient">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-500/5 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6"
            >
              <Zap className="w-4 h-4 text-gold-500" />
              <span className="text-sm text-gold-400 font-medium">Powered by AI</span>
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose{' '}
              <span className="gold-text-gradient">Shivanjal Innovest</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We combine cutting-edge AI technology with deep real estate expertise
              to help you make smarter investment decisions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <GlassCard className="p-6 h-full relative overflow-hidden">
                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/10 group-hover:to-transparent transition-all duration-500" />

                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-5 shadow-glow"
                      >
                        <Icon className="w-7 h-7 text-primary" />
                      </motion.div>

                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gold-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        {feature.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold gold-text-gradient">{feature.stat}</span>
                        <span className="text-xs text-gray-500 uppercase">{feature.statLabel}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Zones */}
      <section className="py-24 bg-gradient-to-b from-primary via-white/[0.02] to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-400 font-medium">Hot Investment Zones</span>
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Trending{' '}
              <span className="gold-text-gradient">Investment Zones</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Discover the fastest-growing localities with highest ROI potential
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingZones.map((zone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <GlassCard className="overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${zone.color}`} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">{zone.city}</p>
                        <h3 className="text-xl font-semibold text-white group-hover:text-gold-400 transition-colors">
                          {zone.area}
                        </h3>
                      </div>
                      <div className="text-right">
                        <motion.p
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                          className="text-2xl font-bold text-emerald-400"
                        >
                          {zone.growth}
                        </motion.p>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400">
                          {zone.trend}
                        </span>
                      </div>
                    </div>

                    <div className="h-20 relative rounded-xl overflow-hidden mb-4">
                      <img
                        src={`https://images.unsplash.com/photo-${1558618666 + index * 100}-f260e9c05d9f?w=400`}
                        alt={zone.area}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <p className="text-gray-400 text-sm">{zone.properties} Properties</p>
                      <motion.span
                        whileHover={{ x: 5 }}
                        className="text-gold-500 flex items-center gap-1 text-sm"
                      >
                        Explore
                        <ChevronRight className="w-4 h-4" />
                      </motion.span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12"
          >
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6">
                <Star className="w-4 h-4 text-gold-500" />
                <span className="text-sm text-gold-400 font-medium">Premium Collection</span>
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Featured{' '}
                <span className="gold-text-gradient">Luxury Properties</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Hand-picked premium properties with exceptional investment potential
              </p>
            </div>
            <Link to="/properties" className="mt-6 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-6 py-3 border-2 border-gold-500 text-gold-500 rounded-xl font-semibold hover:bg-gold-500/10 transition-all"
              >
                View All Properties
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass-card p-4"
                  >
                    <div className="h-56 bg-white/10 rounded-xl mb-4 animate-pulse" />
                    <div className="h-6 bg-white/10 rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
                  </motion.div>
                ))
              : featuredProperties.slice(0, 6).map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gold-500/5 via-transparent to-gold-500/5" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/5 blur-[150px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-6"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-4 h-4 text-gold-500" />
                </motion.div>
                <span className="text-sm text-gold-400 font-medium">Powered by Advanced AI</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                AI Investment{' '}
                <span className="gold-text-gradient">Analyzer</span>
              </h2>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our proprietary AI analyzes hundreds of data points to provide
                accurate investment recommendations tailored to your goals.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  { text: 'Locality growth prediction using ML models', delay: 0 },
                  { text: 'Historical appreciation analysis', delay: 0.1 },
                  { text: 'Future infrastructure impact assessment', delay: 0.2 },
                  { text: 'Rental demand forecasting', delay: 0.3 },
                  { text: 'Risk-adjusted return calculations', delay: 0.4 }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center flex-shrink-0"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <span className="text-gray-300">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <Link to="/ai-analyzer">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(200, 169, 107, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 gold-gradient rounded-xl text-primary font-semibold text-lg flex items-center gap-3 shadow-glow"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Try AI Analyzer</span>
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </motion.button>
              </Link>
            </motion.div>

            {/* AI Score Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <GlassCard className="p-8 relative overflow-hidden" hover={false}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">AI Investment Score</p>
                      <div className="flex items-baseline gap-2">
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="text-6xl font-bold gold-text-gradient"
                        >
                          9.2
                        </motion.span>
                        <span className="text-2xl text-gray-500">/10</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-24 h-24 rounded-full border-4 border-gold-500/20 border-t-gold-500"
                    />
                  </div>

                  {[
                    { label: 'Growth Potential', value: 92, color: 'from-emerald-400 to-emerald-600' },
                    { label: 'Risk Assessment', value: 85, color: 'from-blue-400 to-blue-600' },
                    { label: 'Rental Yield', value: 88, color: 'from-gold-400 to-gold-600' },
                    { label: 'Infrastructure', value: 90, color: 'from-purple-400 to-purple-600' }
                  ].map((metric, i) => (
                    <div key={i} className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">{metric.label}</span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + i * 0.1 }}
                          className="text-white font-medium"
                        >
                          {metric.value}%
                        </motion.span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${metric.value}%` }}
                          transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
                          className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}

                  <div className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                    </motion.div>
                    <div>
                      <p className="text-emerald-400 font-semibold">+32% Expected ROI</p>
                      <p className="text-gray-400 text-sm">Based on AI Analysis</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GlassCard
            hover={false}
            className="p-12 md:p-20 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-emerald-500/5" />
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gold-500/10 blur-2xl" />
            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl" />

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 mb-8 shadow-glow"
                >
                  <Building2 className="w-10 h-10 text-primary" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Ready to Invest{' '}
                  <span className="gold-text-gradient">Smarter?</span>
                </h2>

                <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                  Join thousands of smart investors building wealth through
                  AI-powered real estate investments. Start your journey today.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(200, 169, 107, 0.5)' }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 gold-gradient rounded-xl text-primary font-semibold text-lg flex items-center gap-3 shadow-glow"
                    >
                      <span>Get Started Free</span>
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.span>
                    </motion.button>
                  </Link>
                  <Link to="/properties">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-10 py-5 border-2 border-white/20 text-white rounded-xl font-semibold text-lg flex items-center gap-3 hover:bg-white/5 hover:border-white/30 transition-all"
                    >
                      <Play className="w-5 h-5" />
                      <span>Browse Properties</span>
                    </motion.button>
                  </Link>
                </div>

                <p className="mt-8 text-gray-500 text-sm">
                  No credit card required • Free forever plan available
                </p>
              </motion.div>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const primaryImage = property.property_images?.find(img => img.is_primary) || property.property_images?.[0];
  const imageUrl = primaryImage?.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <Link to={`/property/${property.id}`}>
        <GlassCard className="overflow-hidden">
          <div className="relative h-64 overflow-hidden">
            <motion.img
              src={imageUrl}
              alt={property.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {property.is_verified && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1.5 text-xs font-semibold bg-emerald-500/90 text-white rounded-lg shadow-lg flex items-center gap-1"
                >
                  <Shield className="w-3 h-3" />
                  Verified
                </motion.span>
              )}
              {property.is_featured && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="px-3 py-1.5 text-xs font-semibold bg-gold-500/90 text-primary rounded-lg shadow-lg flex items-center gap-1"
                >
                  <Star className="w-3 h-3" />
                  Featured
                </motion.span>
              )}
            </div>

            {/* AI Score Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 glass-card px-4 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-gold-500" />
                </motion.div>
                <div>
                  <p className="text-xs text-gray-400">AI Score</p>
                  <p className="text-lg font-bold gold-text-gradient">{property.ai_investment_score}/10</p>
                </div>
              </div>
            </motion.div>

            {/* Price Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-4 right-4 glass-card px-4 py-2 shadow-lg"
            >
              <p className="text-xs text-gray-400">Starting at</p>
              <p className="text-lg font-bold text-white">{formatPrice(property.price)}</p>
            </motion.div>

            {/* ROI Badge */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-emerald-500/90 text-white rounded-lg text-sm font-semibold shadow-lg">
              +{property.expected_roi}% ROI
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <p className="text-xs text-gold-400 font-medium mb-1 uppercase tracking-wider">
                {property.builder_name}
              </p>
              <h3 className="text-xl font-semibold text-white group-hover:text-gold-400 transition-colors line-clamp-1">
                {property.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">{property.location}, {property.city}</span>
            </div>

            <div className="flex items-center gap-4 py-4 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-gray-300 text-sm">
                <Building2 className="w-4 h-4" />
                <span>{property.bedrooms} BHK</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300 text-sm">
                <span>{property.area_sqft.toLocaleString()} sqft</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-emerald-400 font-bold">{property.rental_yield}%</p>
                <p className="text-xs text-gray-400">Rental Yield</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-gold-500/10 border border-gold-500/20">
                <p className="text-gold-400 font-bold capitalize">{property.risk_level}</p>
                <p className="text-xs text-gray-400">Risk Level</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-gold-500 font-medium"
            >
              <span>View Details</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
