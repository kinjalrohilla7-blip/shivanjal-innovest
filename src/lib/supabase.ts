import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  phone: string;
  investment_budget: number;
  risk_appetite: 'conservative' | 'moderate' | 'aggressive';
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  state: string;
  property_type: 'apartment' | 'villa' | 'plot' | 'commercial' | 'penthouse' | 'rowhouse';
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  possession_status: 'ready' | 'under_construction';
  expected_possession_date: string | null;
  builder_name: string;
  builder_rating: number;
  latitude: number;
  longitude: number;
  ai_investment_score: number;
  expected_roi: number;
  expected_appreciation: number;
  rental_yield: number;
  risk_level: 'low' | 'medium' | 'high';
  metro_proximity_km: number;
  amenities: string[];
  is_verified: boolean;
  is_featured: boolean;
  listing_status: 'active' | 'sold' | 'withdrawn';
  created_at: string;
  updated_at: string;
  property_images?: PropertyImage[];
  locality_insights?: LocalityInsight;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
  created_at: string;
}

export interface LocalityInsight {
  id: string;
  property_id: string;
  nearest_metro_distance: number;
  nearest_school_distance: number;
  nearest_hospital_distance: number;
  growth_score: number;
  infrastructure_score: number;
  connectivity_score: number;
  future_developments: string[];
  created_at: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  property_id: string;
  created_at: string;
}

export interface Portfolio {
  id: string;
  user_id: string;
  property_id: string;
  purchase_price: number;
  purchase_date: string | null;
  current_value: number;
  status: 'interested' | 'booked' | 'purchased';
  created_at: string;
  updated_at: string;
}

export interface AIRecommendation {
  id: string;
  user_id: string;
  property_id: string;
  recommendation_score: number;
  reasoning: string;
  created_at: string;
}

export const formatPrice = (price: number): string => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(1)} Cr`;
  } else if (price >= 100000) {
    return `₹${(price / 100000).toFixed(1)} L`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const calculateEMI = (principal: number, rate: number = 8.5, tenure: number = 20): number => {
  const monthlyRate = rate / 100 / 12;
  const months = tenure * 12;
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
};
