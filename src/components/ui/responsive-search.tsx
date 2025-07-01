import { useState, useRef, useEffect } from 'react';
import { Search, Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResponsiveSearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  onVoiceToggle?: () => void;
  isVoiceEnabled?: boolean;
  className?: string;
}

export function ResponsiveSearch({
  placeholder = "Search experiences...",
  onSearch,
  onVoiceToggle,
  isVoiceEnabled = false,
  className
}: ResponsiveSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (!searchQuery) {
          setIsExpanded(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchQuery]);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    setIsExpanded(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center transition-all duration-300 ease-out",
        className
      )}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className={cn(
          "relative flex items-center transition-all duration-300 ease-out",
          "backdrop-blur-md border rounded-full",
          "bg-white/10 dark:bg-black/20 border-white/20 dark:border-white/10",
          "hover:bg-white/15 dark:hover:bg-black/30 hover:border-white/30 dark:hover:border-white/20",
          isExpanded 
            ? "w-[70vw] max-w-2xl shadow-2xl shadow-purple-500/10 border-purple-500/30" 
            : "w-48 max-w-[200px] shadow-lg"
        )}>
          {/* Search Icon */}
          <div className={cn(
            "flex items-center justify-center transition-all duration-300",
            isExpanded ? "w-12 h-12 ml-3" : "w-10 h-10 ml-3"
          )}>
            <Search className={cn(
              "transition-all duration-300 text-purple-400",
              isExpanded ? "w-5 h-5" : "w-4 h-4"
            )} />
          </div>

          {/* Input Field */}
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "flex-1 bg-transparent border-none outline-none transition-all duration-300",
              "text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400",
              "text-sm md:text-base",
              isExpanded ? "px-3 py-3" : "px-2 py-2",
              "focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
            )}
          />

          {/* Action Buttons */}
          <div className={cn(
            "flex items-center transition-all duration-300",
            isExpanded ? "mr-3 space-x-2" : "mr-3"
          )}>
            {/* Clear Button - only show when expanded and has content */}
            {isExpanded && searchQuery && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={handleClear}
                className={cn(
                  "h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
                  "hover:bg-white/10 dark:hover:bg-black/20 transition-all duration-200",
                  "animate-in fade-in-0 slide-in-from-right-2"
                )}
              >
                <X className="w-4 h-4" />
              </Button>
            )}

            {/* Voice Button */}
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={onVoiceToggle}
              className={cn(
                "transition-all duration-300 rounded-full",
                isExpanded ? "h-8 w-8 p-0" : "h-7 w-7 p-0",
                isVoiceEnabled 
                  ? "bg-purple-500 text-white hover:bg-purple-600 shadow-lg shadow-purple-500/25" 
                  : "text-gray-400 hover:text-purple-400 hover:bg-white/10 dark:hover:bg-black/20"
              )}
            >
              <Mic className={cn(
                "transition-all duration-300",
                isExpanded ? "w-4 h-4" : "w-3 h-3"
              )} />
            </Button>
          </div>
        </div>

        {/* Expanded State Glow Effect */}
        {isExpanded && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-xl -z-10 animate-pulse" />
        )}
      </form>
    </div>
  );
}