import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0
}: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, { duration: duration * 1000 });
  const display = useTransform(spring, (current) => {
    return prefix + current.toFixed(decimals) + suffix;
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, spring, value]);

  return (
    <motion.span ref={ref}>
      <motion.span>{display}</motion.span>
    </motion.span>
  );
}

interface AnimatedWordsProps {
  text: string;
  delay?: number;
  className?: string;
}

export function AnimatedWords({ text, delay = 0, className = '' }: AnimatedWordsProps) {
  const words = text.split(' ');

  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function AnimatedText({
  text,
  delay = 0,
  className = ''
}: { text: string; delay?: number; className?: string }) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {text}
    </motion.span>
  );
}
