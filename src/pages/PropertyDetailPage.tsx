import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Building2, BedDouble, Bath, Maximize, Calendar,
  Shield, TrendingUp, Star, Sparkles, ChevronLeft, ChevronRight,
  Heart, Share2, Train, School, CheckCircle
} from 'lucide-react';
import { GlassCard, GlowButton, Badge } from '../components/ui/GlassCard';
import { supabase, formatPrice, calculateEMI, Property, LocalityInsight } from '../lib/supabase';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const { data } = await supabase
        .from('properties')
        .select(`
          *,
          property_images (
            id, image_url, is_primary, display_order
          ),
          locality_insights (*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (data) {
        setProperty(data);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary pt-24">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-white/10 rounded-2xl mb-8" />
            <div className="h-8 bg-white/10 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-primary pt-24 flex items-center justify-center">
        <GlassCard className="p-12 text-center" hover={false}>
          <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">Property Not Found</h2>
          <Link to="/properties">
            <GlowButton>Back to Properties</GlowButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  const images = property.property_images || [];
  const locality = property.locality_insights?.[0] as LocalityInsight | undefined;

  return (
    <div className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 group"
        >
          <img
            src={images[currentImageIndex]?.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />

          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass-card opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setCurrentImageIndex((currentImageIndex + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full glass-card opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute top-4 left-4 flex gap-2">
            {property.is_verified && <Badge variant="success">Verified</Badge>}
            {property.is_featured && <Badge variant="gold">Featured</Badge>}
          </div>
        </motion.div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/properties" className="hover:text-gold-500">Properties</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gold-500">{property.city}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{property.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-gold-500 font-medium mb-2">{property.builder_name}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5" />
                <span>{property.location}, {property.city}, {property.state}</span>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <GlassCard className="p-6" hover={false}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {property.bedrooms > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                      <BedDouble className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Bedrooms</p>
                      <p className="text-xl font-semibold text-white">{property.bedrooms}</p>
                    </div>
                  </div>
                )}
                {property.bathrooms > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                      <Bath className="w-6 h-6 text-gold-500" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Bathrooms</p>
                      <p className="text-xl font-semibold text-white">{property.bathrooms}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                    <Maximize className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Area</p>
                    <p className="text-xl font-semibold text-white">{property.area_sqft.toLocaleString()} sqft</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className="text-xl font-semibold text-white capitalize">
                      {property.possession_status === 'ready' ? 'Ready' : 'Under Construction'}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* AI Score */}
            <GlassCard className="p-6 bg-gradient-to-br from-gold-500/10 to-transparent" hover={false}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">AI Investment Score</h2>
                  <p className="text-gray-400 text-sm">Powered by advanced machine learning</p>
                </div>
              </div>

              <div className="flex items-center justify-center mb-6">
                <div className="text-center">
                  <span className="text-5xl font-bold gold-text-gradient">{property.ai_investment_score}</span>
                  <span className="text-gray-400 text-2xl ml-1">/10</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <p className="text-emerald-400 font-bold text-lg">+{property.expected_roi}%</p>
                  <p className="text-xs text-gray-400">Expected ROI</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white/5">
                  <p className="text-gold-400 font-bold text-lg">{property.rental_yield}%</p>
                  <p className="text-xs text-gray-400">Rental Yield</p>
                </div>
              </div>
            </GlassCard>

            {/* Locality Insights */}
            {locality && (
              <GlassCard className="p-6" hover={false}>
                <h2 className="text-xl font-semibold text-white mb-6">Locality Insights</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Train className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Nearest Metro</p>
                      <p className="text-xl font-semibold text-white">{locality.nearest_metro_distance} km</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                      <School className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Nearest School</p>
                      <p className="text-xl font-semibold text-white">{locality.nearest_school_distance} km</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <GlassCard className="p-6 sticky top-24" hover={false}>
              <div className="mb-6">
                <p className="text-gray-400 text-sm">Price</p>
                <p className="text-3xl font-bold text-gold-500">{formatPrice(property.price)}</p>
                <p className="text-gray-400 text-sm mt-1">
                  ₹{(property.price / property.area_sqft).toLocaleString()}/sqft
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <p className="text-emerald-400 font-bold text-lg">+{property.expected_roi}%</p>
                  <p className="text-xs text-gray-400">Expected ROI</p>
                </div>
                <div className="p-3 rounded-xl bg-gold-500/10 border border-gold-500/20 text-center">
                  <p className="text-gold-400 font-bold text-lg">{property.rental_yield}%</p>
                  <p className="text-xs text-gray-400">Rental Yield</p>
                </div>
              </div>

              <div className="space-y-3">
                <GlowButton className="w-full justify-center">Schedule Visit</GlowButton>
                <GlowButton variant="outline" className="w-full justify-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Save to Wishlist
                </GlowButton>
              </div>
            </GlassCard>

            {/* Builder Info */}
            <GlassCard className="p-6" hover={false}>
              <h3 className="text-lg font-semibold text-white mb-4">Builder Profile</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-white font-medium">{property.builder_name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(property.builder_rating) ? 'text-gold-500 fill-gold-500' : 'text-gray-600'}`}
                      />
                    ))}
                    <span className="text-gray-400 text-sm ml-1">{property.builder_rating}/5</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
