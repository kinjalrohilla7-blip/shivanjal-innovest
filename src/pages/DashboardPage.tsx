import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Building2, Heart, TrendingUp, Bell, Plus,
  Wallet, ArrowUpRight, Sparkles, MapPin, Activity, PieChart
} from 'lucide-react';
import { GlassCard, GlowButton, Badge } from '../components/ui/GlassCard';
import { AnimatedCounter } from '../components/ui/AnimatedNumber';
import { supabase, formatPrice, Property } from '../lib/supabase';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const portfolioHistory = [
  { month: 'Jan', value: 85000000 },
  { month: 'Feb', value: 87200000 },
  { month: 'Mar', value: 89500000 },
  { month: 'Apr', value: 91200000 },
  { month: 'May', value: 94300000 },
  { month: 'Jun', value: 95800000 }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'wishlist'>('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const portfolioStats = {
    totalValue: 95800000,
    investedAmount: 75000000,
    gain: 20800000,
    gainPercent: 27.7
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const { data } = await supabase
        .from('properties')
        .select(`
          *,
          property_images (
            id, image_url, is_primary, display_order
          )
        `)
        .limit(10);

      if (data) {
        setProperties(data);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back, Investor</h1>
            <p className="text-gray-400">Here's your investment portfolio overview</p>
          </div>
          <Link to="/properties">
            <GlowButton>
              <Plus className="w-5 h-5 mr-2" />
              Add Property
            </GlowButton>
          </Link>
        </motion.div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'portfolio', label: 'Portfolio', icon: Building2 },
            { id: 'wishlist', label: 'Wishlist', icon: Heart }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold-500/20 text-gold-500 border border-gold-500/30'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-gold-500/20'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <GlassCard className="p-6" hover={false}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-gold-500" />
                  </div>
                  <Badge variant="success">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +{portfolioStats.gainPercent}%
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm mb-1">Portfolio Value</p>
                <p className="text-2xl font-bold text-white">{formatPrice(portfolioStats.totalValue)}</p>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">Total Gain</p>
                <p className="text-2xl font-bold text-emerald-400">+{formatPrice(portfolioStats.gain)}</p>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">Properties</p>
                <p className="text-2xl font-bold text-white">{properties.length}</p>
              </GlassCard>

              <GlassCard className="p-6" hover={false}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-1">Wishlist</p>
                <p className="text-2xl font-bold text-white">{Math.min(properties.length, 4)}</p>
              </GlassCard>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <GlassCard className="p-6" hover={false}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
                    <p className="text-gray-400 text-sm">6 month overview</p>
                  </div>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    +{formatPrice(portfolioStats.gain)}
                  </span>
                </div>

                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={portfolioHistory}>
                      <defs>
                        <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `₹${(v / 10000000).toFixed(0)}Cr`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 15, 15, 0.9)',
                          border: '1px solid rgba(200, 169, 107, 0.3)',
                          borderRadius: '12px'
                        }}
                        formatter={(value: number) => [formatPrice(value), 'Value']}
                      />
                      <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fill="url(#colorPortfolio)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>

              <GlassCard className="p-6 bg-gradient-to-br from-gold-500/10 to-transparent" hover={false}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">AI Suggestions</h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-white font-medium mb-1">Diversify Your Portfolio</h4>
                    <p className="text-gray-400 text-sm">Consider adding properties in Bangalore's Whitefield area for better yields.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-white font-medium mb-1">Market Alert: Mumbai</h4>
                    <p className="text-gray-400 text-sm">Infrastructure development in Lower Parel accelerating growth.</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {activeTab === 'portfolio' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            {properties.slice(0, 3).map((property, index) => (
              <Link key={property.id} to={`/property/${property.id}`}>
                <GlassCard className="p-4 flex items-center gap-4 group">
                  <img
                    src={property.property_images?.[0]?.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200'}
                    alt={property.title}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gold-500 transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-400">{property.location}, {property.city}</p>
                    <p className="text-gold-500 font-semibold mt-2">{formatPrice(property.price)}</p>
                  </div>
                  <Badge variant="success">+{property.expected_roi}% ROI</Badge>
                </GlassCard>
              </Link>
            ))}
          </motion.div>
        )}

        {activeTab === 'wishlist' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-2 gap-6">
            {properties.slice(0, 4).map((property) => (
              <Link key={property.id} to={`/property/${property.id}`}>
                <GlassCard className="overflow-hidden group">
                  <div className="relative h-48">
                    <img
                      src={property.property_images?.[0]?.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-gold-500 transition-colors">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-2">
                      <MapPin className="w-4 h-4" />
                      {property.location}, {property.city}
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-lg font-bold text-gold-500">{formatPrice(property.price)}</p>
                      <Badge variant="gold">{property.ai_investment_score}/10</Badge>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
