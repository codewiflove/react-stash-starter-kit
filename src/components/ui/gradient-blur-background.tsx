import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GradientBlurBackgroundProps {
  variant?: 'primary' | 'secondary' | 'accent';
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
  className?: string;
}

export function GradientBlurBackground({
  variant = 'primary',
  intensity = 'medium',
  animated = true,
  className
}: GradientBlurBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!animated) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [animated]);

  const gradientVariants = {
    primary: 'from-purple-500/30 via-pink-500/20 to-blue-500/30',
    secondary: 'from-emerald-500/30 via-teal-500/20 to-cyan-500/30',
    accent: 'from-orange-500/30 via-red-500/20 to-yellow-500/30'
  };

  const blurIntensity = {
    low: 'blur-sm',
    medium: 'blur-md',
    high: 'blur-lg'
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Animated gradient orbs */}
      <div 
        className={cn(
          "absolute w-96 h-96 rounded-full",
          "bg-gradient-to-r", gradientVariants[variant],
          blurIntensity[intensity],
          animated && "transition-transform duration-1000 ease-out"
        )}
        style={animated ? {
          transform: `translate(${mousePosition.x * 0.1 - 50}%, ${mousePosition.y * 0.1 - 50}%)`
        } : {}}
      />
      
      <div 
        className={cn(
          "absolute w-64 h-64 rounded-full top-1/3 right-1/4",
          "bg-gradient-to-l", gradientVariants[variant],
          blurIntensity[intensity],
          animated && "transition-transform duration-1500 ease-out"
        )}
        style={animated ? {
          transform: `translate(${mousePosition.x * -0.05}%, ${mousePosition.y * -0.05}%)`
        } : {}}
      />

      <div 
        className={cn(
          "absolute w-80 h-80 rounded-full bottom-1/4 left-1/3",
          "bg-gradient-to-br", gradientVariants[variant],
          blurIntensity[intensity],
          animated && "transition-transform duration-2000 ease-out"
        )}
        style={animated ? {
          transform: `translate(${mousePosition.x * 0.03}%, ${mousePosition.y * 0.03}%)`
        } : {}}
      />
    </div>
  );
}