import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface ImmersiveScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  parallaxStrength?: number;
  fadeEffect?: boolean;
  scaleEffect?: boolean;
}

export function ImmersiveScrollSection({
  children,
  className,
  parallaxStrength = 0.5,
  fadeEffect = true,
  scaleEffect = false
}: ImmersiveScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate visibility
      const visibilityThreshold = windowHeight * 0.1;
      const visible = rect.top < windowHeight - visibilityThreshold && rect.bottom > visibilityThreshold;
      setIsVisible(visible);

      // Calculate scroll progress through the section
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const transform = `translateY(${(scrollProgress - 0.5) * parallaxStrength * 100}px)`;
  const opacity = fadeEffect ? Math.max(0.3, 1 - Math.abs(scrollProgress - 0.5) * 2) : 1;
  const scale = scaleEffect ? 0.8 + (1 - Math.abs(scrollProgress - 0.5) * 2) * 0.2 : 1;

  return (
    <div
      ref={sectionRef}
      className={cn(
        "transition-all duration-300 ease-out will-change-transform",
        className
      )}
      style={{
        transform: `${transform} scale(${scale})`,
        opacity,
      }}
    >
      <div className={cn(
        "transition-all duration-500",
        isVisible ? "animate-in slide-in-from-bottom-4" : "opacity-50"
      )}>
        {children}
      </div>
    </div>
  );
}