import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  variant?: 'card' | 'text' | 'avatar' | 'custom';
  lines?: number;
  className?: string;
  animated?: boolean;
}

export function SkeletonLoader({ 
  variant = 'card', 
  lines = 3, 
  className,
  animated = true 
}: SkeletonLoaderProps) {
  const baseClasses = cn(
    "bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700",
    animated && "animate-pulse bg-[length:200%_100%] animate-shimmer"
  );

  if (variant === 'avatar') {
    return (
      <div className={cn("w-12 h-12 rounded-full", baseClasses, className)} />
    );
  }

  if (variant === 'text') {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 rounded",
              baseClasses,
              i === lines - 1 ? "w-3/4" : "w-full",
              className
            )}
          />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className={cn("p-6 space-y-4", className)}>
        <div className={cn("h-48 rounded-lg", baseClasses)} />
        <div className="space-y-2">
          <div className={cn("h-6 rounded w-3/4", baseClasses)} />
          <div className={cn("h-4 rounded w-full", baseClasses)} />
          <div className={cn("h-4 rounded w-2/3", baseClasses)} />
        </div>
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, className)} />
  );
}

// Add shimmer animation to global CSS
export const shimmerKeyframes = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .animate-shimmer {
    animation: shimmer 1.5s ease-in-out infinite;
  }
`;