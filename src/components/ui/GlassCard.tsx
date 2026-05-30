import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = '', hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={`glass-card ${hover ? 'hover:border-gold-500/30 hover:shadow-glow' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'solid' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function GlowButton({
  children,
  onClick,
  className = '',
  variant = 'solid',
  disabled = false,
  type = 'button'
}: GlowButtonProps) {
  const baseClasses = 'relative overflow-hidden font-semibold transition-all duration-300';
  const variantClasses =
    variant === 'solid'
      ? 'gold-gradient text-primary hover:shadow-glow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
      : 'border-2 border-gold-500 text-gold-500 hover:bg-gold-500/10 hover:shadow-glow active:scale-95';

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} px-6 py-3 rounded-xl ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/10 rounded-xl ${className}`} />
  );
}

export function Badge({
  children,
  variant = 'default'
}: {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'gold';
}) {
  const variants = {
    default: 'bg-white/10 text-white',
    success: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    gold: 'bg-gold-500/20 text-gold-400 border-gold-500/30'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
