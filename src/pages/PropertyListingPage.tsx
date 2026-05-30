import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Building2, Sparkles, Heart } from 'lucide-react';
import { GlassCard, GlowButton, Badge } from '../components/ui/GlassCard';
import { supabase, formatPrice, Property } from '../lib/supabase';

export default function PropertyListingPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
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
        .eq('listing_status', 'active')
        .order('ai_investment_score', { ascending: false });

      if (data) {
        setProperties(data);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(p =>
    searchQuery === '' ||
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Your Perfect Investment
          </h1>
          <p className="text-gray-400 text-lg">
            Browse AI-curated properties with transparent investment insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4 mb-6"
        >
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, project name, or builder..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-gold-500 focus:outline-none"
              />
            </div>
          </div>
        </motion.div>

        <p className="text-gray-400 mb-6">
          Showing <span className="text-white font-medium">{filteredProperties.length}</span> properties
        </p>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card p-4">
                <div className="h-48 bg-white/10 rounded-xl mb-4 animate-pulse" />
                <div className="h-6 bg-white/10 rounded w-3/4 mb-2 animate-pulse" />
                <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
              </div>
            ))}
          </div>
        ) : filteredProperties.length === 0 ? (
          <GlassCard className="p-12 text-center" hover={false}>
            <Building2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No properties found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search</p>
            <GlowButton onClick={() => setSearchQuery('')}>Clear Search</GlowButton>
          </GlassCard>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property, index) => (
              <PropertyCard key={property.id} property={property} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const primaryImage = property.property_images?.[0];
  const imageUrl = primaryImage?.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      className="glass-card group overflow-hidden"
    >
      <Link to={`/property/${property.id}`}>
        <div className="relative h-56 overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />

          <div className="absolute top-3 left-3 flex gap-2">
            {property.is_verified && <Badge variant="success">Verified</Badge>}
            {property.is_featured && <Badge variant="gold">Featured</Badge>}
          </div>

          <div className="absolute bottom-3 right-3 glass-card px-3 py-1.5 flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="text-white font-semibold">{property.ai_investment_score}</span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-500 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
            <MapPin className="w-4 h-4" />
            <span>{property.location}, {property.city}</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <p className="text-xl font-bold text-gold-500">{formatPrice(property.price)}</p>
            <span className="text-emerald-400 font-semibold">+{property.expected_roi}% ROI</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
