import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Search, 
  Menu, 
  Mic, 
  Globe, 
  User, 
  Sun, 
  Moon,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GlassNavProps {
  isDark: boolean;
  onThemeToggle: () => void;
}

export function GlassNav({ isDark, onThemeToggle }: GlassNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleVoiceToggle = () => {
    setIsVoiceEnabled(!isVoiceEnabled);
    if (!isVoiceEnabled) {
      // Simulate voice activation
      console.log('Voice navigation activated');
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      "backdrop-blur-md bg-white/10 dark:bg-black/20",
      "border-b border-white/20 dark:border-white/10",
      isScrolled && "backdrop-blur-xl bg-white/20 dark:bg-black/30 shadow-2xl"
    )}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              NeoSpace
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search experiences..."
                className="w-full pl-10 pr-12 py-2 bg-white/10 dark:bg-black/20 border border-white/20 rounded-full backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 dark:text-white placeholder-gray-500"
              />
              <Button
                size="sm"
                variant="ghost"
                className={cn(
                  "absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 rounded-full",
                  isVoiceEnabled ? "bg-purple-500 text-white" : "text-gray-400 hover:text-purple-500"
                )}
                onClick={handleVoiceToggle}
              >
                <Mic className="w-3 h-3" />
              </Button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="w-4 h-4 text-yellow-500" />
              <Switch
                checked={isDark}
                onCheckedChange={onThemeToggle}
                className="data-[state=checked]:bg-purple-600"
              />
              <Moon className="w-4 h-4 text-blue-500" />
            </div>

            {/* Globe Icon */}
            <Button size="sm" variant="ghost" className="hidden md:flex">
              <Globe className="w-4 h-4" />
            </Button>

            {/* User Menu */}
            <Button size="sm" variant="ghost" className="hidden md:flex">
              <User className="w-4 h-4" />
            </Button>

            {/* Mobile Menu */}
            <Button size="sm" variant="ghost" className="md:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}