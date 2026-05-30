import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Shield, Target, Zap, MapPin, CheckCircle } from 'lucide-react';
import { GlassCard, GlowButton, Badge } from '../components/ui/GlassCard';
import { AnimatedCounter } from '../components/ui/AnimatedNumber';
import { supabase, formatPrice, Property } from '../lib/supabase';

const cities = ['Mumbai', 'Bangalore', 'Gurgaon', 'Pune', 'Hyderabad', 'Delhi'];
const riskProfiles = [
  { value: 'conservative', label: 'Conservative', description: 'Prioritize stability over high returns' },
  { value: 'moderate', label: 'Moderate', description: 'Balance between growth and stability' },
  { value: 'aggressive', label: 'Aggressive', description: 'Maximize returns, accept higher risk' }
];

export default function AIAnalyzerPage() {
  const [step, setStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [budget, setBudget] = useState(50000000);
  const [selectedCity, setSelectedCity] = useState('');
  const [riskProfile, setRiskProfile] = useState('moderate');
  const [recommendations, setRecommendations] = useState<Property[]>([]);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    setStep(4);

    await new Promise(resolve => setTimeout(resolve, 2500));

    const { data } = await supabase
      .from('properties')
      .select(`
        *,
        property_images (
          id, image_url, is_primary, display_order
        )
      `)
      .eq('listing_status', 'active')
      .lte('price', budget)
      .order('ai_investment_score', { ascending: false })
      .limit(6);

    if (data) {
      setRecommendations(data);
    }

    setIsAnalyzing(false);
    setShowResults(true);
  };

  const resetAnalysis = () => {
    setStep(1);
    setShowResults(false);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="gold" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Investment Analysis
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Find Your Perfect Investment
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Our AI analyzes hundreds of data points to recommend properties
            that match your investment goals and risk appetite.
          </p>
        </motion.div>

        {!showResults && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`flex flex-col items-center ${step >= s ? '' : 'opacity-50'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2 transition-all ${
                      step > s ? 'bg-gold-500 text-primary' :
                      step === s ? 'bg-gold-500/20 border-2 border-gold-500 text-gold-500' :
                      'bg-white/10 text-gray-400'
                    }`}>
                      {step > s ? <CheckCircle className="w-6 h-6" /> : s}
                    </div>
                    <span className={`text-sm ${step >= s ? 'text-gold-500' : 'text-gray-500'}`}>
                      {s === 1 ? 'Budget' : s === 2 ? 'Location' : 'Profile'}
                    </span>
                  </div>
                  {s < 3 && (
                    <div className={`w-24 h-1 mx-2 rounded-full transition-all ${
                      step > s ? 'bg-gold-500' : 'bg-white/10'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!showResults && step === 1 && (
          <GlassCard className="p-8 max-w-2xl mx-auto" hover={false}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-gold-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">What's Your Investment Budget?</h2>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-400 mb-4 text-center">
                Investment Budget: <span className="text-gold-500 font-bold text-xl">{formatPrice(budget)}</span>
              </label>
              <input
                type="range"
                min="5000000"
                max="200000000"
                step="5000000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>₹50L</span>
                <span>₹20Cr</span>
              </div>
            </div>

            <div className="flex justify-end">
              <GlowButton onClick={() => setStep(2)}>Next</GlowButton>
            </div>
          </GlassCard>
        )}

        {!showResults && step === 2 && (
          <GlassCard className="p-8 max-w-2xl mx-auto" hover={false}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-gold-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Preferred Investment Location</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => setSelectedCity('')}
                className={`p-4 rounded-xl border transition-all text-center ${
                  selectedCity === '' ? 'bg-gold-500/20 border-gold-500 text-gold-500' : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                All Cities
              </button>
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`p-4 rounded-xl border transition-all text-center ${
                    selectedCity === city ? 'bg-gold-500/20 border-gold-500 text-gold-500' : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <GlowButton variant="outline" onClick={() => setStep(1)}>Back</GlowButton>
              <GlowButton onClick={() => setStep(3)}>Next</GlowButton>
            </div>
          </GlassCard>
        )}

        {!showResults && step === 3 && (
          <GlassCard className="p-8 max-w-2xl mx-auto" hover={false}>
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gold-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gold-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Your Risk Profile</h2>
            </div>

            <div className="space-y-4 mb-8">
              {riskProfiles.map((profile) => (
                <button
                  key={profile.value}
                  onClick={() => setRiskProfile(profile.value)}
                  className={`w-full p-4 rounded-xl border transition-all flex items-center gap-4 ${
                    riskProfile === profile.value ? 'bg-gold-500/20 border-gold-500' : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    riskProfile === profile.value ? 'bg-gold-500 text-primary' : 'bg-white/10 text-gray-400'
                  }`}>
                    {profile.value === 'conservative' ? <Shield className="w-5 h-5" /> :
                     profile.value === 'moderate' ? <TrendingUp className="w-5 h-5" /> :
                     <Zap className="w-5 h-5" />}
                  </div>
                  <div className="text-left">
                    <p className={`font-semibold ${riskProfile === profile.value ? 'text-gold-500' : 'text-white'}`}>
                      {profile.label}
                    </p>
                    <p className="text-sm text-gray-400">{profile.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <GlowButton variant="outline" onClick={() => setStep(2)}>Back</GlowButton>
              <GlowButton onClick={runAnalysis}>
                <Sparkles className="w-4 h-4 mr-2" />
                Run AI Analysis
              </GlowButton>
            </div>
          </GlassCard>
        )}

        {step === 4 && isAnalyzing && (
          <div className="text-center py-20">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-32 h-32 rounded-full border-4 border-gold-500/20 border-t-gold-500"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">AI is Analyzing Your Profile</h2>
            <p className="text-gray-400">Finding the best investment opportunities...</p>
          </div>
        )}

        {showResults && recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <GlassCard className="p-6 text-center" hover={false}>
                <p className="text-gray-400 text-sm mb-2">Investment Budget</p>
                <p className="text-2xl font-bold text-gold-500">{formatPrice(budget)}</p>
              </GlassCard>
              <GlassCard className="p-6 text-center" hover={false}>
                <p className="text-gray-400 text-sm mb-2">Properties Found</p>
                <p className="text-2xl font-bold text-white">{recommendations.length}</p>
              </GlassCard>
              <GlassCard className="p-6 text-center" hover={false}>
                <p className="text-gray-400 text-sm mb-2">Avg ROI</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {(recommendations.reduce((acc, p) => acc + p.expected_roi, 0) / recommendations.length).toFixed(1)}%
                </p>
              </GlassCard>
              <GlassCard className="p-6 text-center" hover={false}>
                <p className="text-gray-400 text-sm mb-2">Risk Profile</p>
                <p className="text-2xl font-bold text-gold-400 capitalize">{riskProfile}</p>
              </GlassCard>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">AI-Recommended Properties</h2>
              <GlowButton variant="outline" onClick={resetAnalysis}>New Analysis</GlowButton>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((property, index) => (
                <PropertyRecommendationCard key={property.id} property={property} rank={index + 1} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function PropertyRecommendationCard({ property, rank }: { property: Property; rank: number }) {
  const primaryImage = property.property_images?.[0];
  const imageUrl = primaryImage?.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.1 }}
    >
      <Link to={`/property/${property.id}`}>
        <GlassCard className="overflow-hidden group">
          <div className="relative h-48">
            <img
              src={imageUrl}
              alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />

            <div className="absolute top-3 left-3">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center text-primary font-bold">
                #{rank}
              </div>
            </div>

            <div className="absolute top-3 right-3">
              <Badge variant="gold">
                <Sparkles className="w-3 h-3 mr-1" />
                {property.ai_investment_score}/10
              </Badge>
            </div>
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-500 transition-colors line-clamp-1">
              {property.title}
            </h3>
            <p className="text-sm text-gray-400 mb-3">{property.location}, {property.city}</p>
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <p className="text-lg font-bold text-gold-500">{formatPrice(property.price)}</p>
              <span className="text-emerald-400 font-semibold">+{property.expected_roi}% ROI</span>
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
