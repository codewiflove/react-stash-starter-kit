import { cn } from '@/lib/utils';

interface GlowingTextProps {
  children: React.ReactNode;
  variant?: 'headline' | 'subheadline' | 'accent' | 'subtle';
  color?: 'purple' | 'pink' | 'blue' | 'cyan' | 'emerald';
  intensity?: 'low' | 'medium' | 'high';
  pulse?: boolean;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export function GlowingText({
  children,
  variant = 'accent',
  color = 'purple',
  intensity = 'medium',
  pulse = true,
  className,
  as: Component = 'span'
}: GlowingTextProps) {
  const colorMap = {
    purple: {
      text: 'text-purple-300 dark:text-purple-200',
      glow: 'drop-shadow-[0_0_10px_rgba(168,85,247,0.5)] drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]',
      glowHigh: 'drop-shadow-[0_0_15px_rgba(168,85,247,0.7)] drop-shadow-[0_0_30px_rgba(168,85,247,0.4)] drop-shadow-[0_0_45px_rgba(168,85,247,0.2)]'
    },
    pink: {
      text: 'text-pink-300 dark:text-pink-200',
      glow: 'drop-shadow-[0_0_10px_rgba(236,72,153,0.5)] drop-shadow-[0_0_20px_rgba(236,72,153,0.3)]',
      glowHigh: 'drop-shadow-[0_0_15px_rgba(236,72,153,0.7)] drop-shadow-[0_0_30px_rgba(236,72,153,0.4)] drop-shadow-[0_0_45px_rgba(236,72,153,0.2)]'
    },
    blue: {
      text: 'text-blue-300 dark:text-blue-200',
      glow: 'drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]',
      glowHigh: 'drop-shadow-[0_0_15px_rgba(59,130,246,0.7)] drop-shadow-[0_0_30px_rgba(59,130,246,0.4)] drop-shadow-[0_0_45px_rgba(59,130,246,0.2)]'
    },
    cyan: {
      text: 'text-cyan-300 dark:text-cyan-200',
      glow: 'drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]',
      glowHigh: 'drop-shadow-[0_0_15px_rgba(34,211,238,0.7)] drop-shadow-[0_0_30px_rgba(34,211,238,0.4)] drop-shadow-[0_0_45px_rgba(34,211,238,0.2)]'
    },
    emerald: {
      text: 'text-emerald-300 dark:text-emerald-200',
      glow: 'drop-shadow-[0_0_10px_rgba(52,211,153,0.5)] drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]',
      glowHigh: 'drop-shadow-[0_0_15px_rgba(52,211,153,0.7)] drop-shadow-[0_0_30px_rgba(52,211,153,0.4)] drop-shadow-[0_0_45px_rgba(52,211,153,0.2)]'
    }
  };

  const variantStyles = {
    headline: 'text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight',
    subheadline: 'text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide',
    accent: 'text-lg md:text-xl font-medium',
    subtle: 'text-base md:text-lg font-normal'
  };

  const intensityGlow = intensity === 'high' ? colorMap[color].glowHigh : colorMap[color].glow;
  const lowIntensityGlow = intensity === 'low' ? 'drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]' : intensityGlow;

  return (
    <Component
      className={cn(
        variantStyles[variant],
        colorMap[color].text,
        intensity === 'low' ? lowIntensityGlow : intensityGlow,
        pulse && 'animate-glow-pulse',
        'transition-all duration-300 will-change-transform',
        'hover:scale-105 cursor-default select-none',
        className
      )}
    >
      {children}
    </Component>
  );
}