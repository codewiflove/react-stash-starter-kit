import { cn } from '@/lib/utils';

interface NeoBrutalistTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'subtitle' | 'body';
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'black';
  shadow?: boolean;
  className?: string;
}

export function NeoBrutalistText({
  children,
  variant = 'body',
  color = 'primary',
  shadow = true,
  className
}: NeoBrutalistTextProps) {
  const baseClasses = "font-bold leading-tight tracking-tight";
  
  const variantClasses = {
    h1: "text-4xl md:text-6xl lg:text-7xl xl:text-8xl",
    h2: "text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
    h3: "text-2xl md:text-3xl lg:text-4xl",
    h4: "text-xl md:text-2xl lg:text-3xl",
    subtitle: "text-lg md:text-xl lg:text-2xl",
    body: "text-base md:text-lg"
  };

  const colorClasses = {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-700 dark:text-gray-300",
    accent: "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent",
    white: "text-white",
    black: "text-black"
  };

  const shadowClasses = shadow ? {
    primary: "drop-shadow-[4px_4px_0px_rgba(0,0,0,0.25)] dark:drop-shadow-[4px_4px_0px_rgba(255,255,255,0.25)]",
    secondary: "drop-shadow-[3px_3px_0px_rgba(0,0,0,0.15)] dark:drop-shadow-[3px_3px_0px_rgba(255,255,255,0.15)]",
    accent: "drop-shadow-[4px_4px_0px_rgba(147,51,234,0.5)]",
    white: "drop-shadow-[4px_4px_0px_rgba(0,0,0,0.5)]",
    black: "drop-shadow-[4px_4px_0px_rgba(255,255,255,0.5)]"
  } : {};

  const Component = variant === 'body' ? 'p' : variant;

  return (
    <Component className={cn(
      baseClasses,
      variantClasses[variant],
      colorClasses[color],
      shadow && shadowClasses[color],
      "transition-all duration-300 hover:scale-105 cursor-default select-none",
      className
    )}>
      {children}
    </Component>
  );
}