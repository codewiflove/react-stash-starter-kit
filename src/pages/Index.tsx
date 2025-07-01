
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Save, Database, Sparkles, Zap, Palette, Globe, Shield, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { GlassNav } from '@/components/ui/glass-nav';
import { Floating3DCard } from '@/components/ui/floating-3d-card';
import { GradientBlurBackground } from '@/components/ui/gradient-blur-background';
import { ImmersiveScrollSection } from '@/components/ui/immersive-scroll-section';
import { NeoBrutalistText } from '@/components/ui/neo-brutalist-text';
import { SkeletonLoader } from '@/components/ui/skeleton-loader';
import { GestureHandler } from '@/components/ui/gesture-handler';
import { cn } from '@/lib/utils';

const Index = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [storedData, setStoredData] = useState<{ [key: string]: string }>({});
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);

  // Load all data from localStorage on component mount
  useEffect(() => {
    setIsLoading(true);
    // Simulate loading time for demonstration
    setTimeout(() => {
      loadStoredData();
      setIsLoading(false);
    }, 1500);

    // Set dark mode by default and sync with system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle('dark', prefersDark);
  }, []);

  useEffect(() => {
    loadStoredData();
    
    // Infinite scroll simulation - load more data when near bottom
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        // Load more content logic would go here
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadStoredData = () => {
    const data: { [key: string]: string } = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        data[key] = localStorage.getItem(key) || '';
      }
    }
    setStoredData(data);
  };

  const handleThemeToggle = useCallback(() => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  }, [isDarkMode]);

  const handleGestureSwipe = useCallback((direction: string) => {
    toast.info(`Gesture detected: Swipe ${direction}`);
  }, []);

  const handleSave = () => {
    if (!key.trim()) {
      toast.error('Please enter a key');
      return;
    }
    
    localStorage.setItem(key, value);
    loadStoredData();
    toast.success(`Saved "${key}" to local storage`);
    setKey('');
    setValue('');
  };

  const handleDelete = (keyToDelete: string) => {
    localStorage.removeItem(keyToDelete);
    loadStoredData();
    toast.success(`Deleted "${keyToDelete}" from local storage`);
  };

  const handleClearAll = () => {
    localStorage.clear();
    loadStoredData();
    toast.success('Cleared all local storage data');
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Vite-powered development with hot module replacement",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Sparkles,
      title: "Modern React",
      description: "React 18 with hooks and cutting-edge features",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Palette,
      title: "Stunning Design",
      description: "Tailwind CSS with beautiful, responsive components",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Globe,
      title: "Global Ready",
      description: "Internationalization and accessibility built-in",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Secure Storage",
      description: "Safe browser storage with data persistence",
      gradient: "from-red-500 to-pink-500"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Responsive design optimized for all devices",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-4xl mx-auto p-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl animate-pulse" />
            <SkeletonLoader variant="text" lines={2} className="max-w-md mx-auto" />
          </div>
          <SkeletonLoader variant="card" />
          <SkeletonLoader variant="card" />
        </div>
      </div>
    );
  }

  return (
    <GestureHandler
      onSwipeLeft={() => handleGestureSwipe('left')}
      onSwipeRight={() => handleGestureSwipe('right')}
      onSwipeUp={() => handleGestureSwipe('up')}
      onSwipeDown={() => handleGestureSwipe('down')}
    >
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Background gradients */}
        <GradientBlurBackground variant="primary" className="fixed inset-0 z-0" />
        
        {/* Navigation */}
        <GlassNav isDark={isDarkMode} onThemeToggle={handleThemeToggle} />

        <div className="relative z-10 max-w-6xl mx-auto space-y-16 pt-24 pb-16 px-4">
        {/* Header */}
          <ImmersiveScrollSection 
            parallaxStrength={0.3} 
            fadeEffect={true}
            className="text-center space-y-8"
          >
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl mb-6 animate-float shadow-2xl">
                <Database className="w-12 h-12 text-white" />
              </div>
              
              <NeoBrutalistText variant="h1" color="accent" className="animate-gradient bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
                NeoSpace Storage
              </NeoBrutalistText>
              
              <NeoBrutalistText variant="subtitle" color="secondary" className="max-w-3xl mx-auto leading-relaxed">
                Experience the future of data management with our cutting-edge local storage platform. 
                Built with 2025's most advanced technologies for unprecedented performance and user experience.
              </NeoBrutalistText>
            </div>
          </ImmersiveScrollSection>

          {/* Interactive Storage Section */}
          <ImmersiveScrollSection 
            parallaxStrength={0.2} 
            scaleEffect={true}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Add New Data Card */}
            <Floating3DCard intensity="medium" className="h-full">
              <Card className="glass-dark border-white/10 shadow-2xl h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Save className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Data Input Hub
                    </span>
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Store encrypted key-value pairs with advanced security protocols
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="key" className="text-gray-300 font-medium">Storage Key</Label>
                      <Input
                        id="key"
                        placeholder="Enter unique identifier..."
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                        className="bg-black/20 border-white/20 text-white placeholder-gray-500 focus:border-emerald-500/50 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="value" className="text-gray-300 font-medium">Data Value</Label>
                      <Input
                        id="value"
                        placeholder="Enter your data..."
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                        className="bg-black/20 border-white/20 text-white placeholder-gray-500 focus:border-emerald-500/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleSave} 
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Secure Save
                    </Button>
                    <Button 
                      onClick={handleClearAll} 
                      variant="destructive"
                      disabled={Object.keys(storedData).length === 0}
                      className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Purge All
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Floating3DCard>

            {/* Data Visualization */}
            <Floating3DCard intensity="medium" className="h-full">
              <Card className="glass-dark border-white/10 shadow-2xl h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Storage Analytics
                    </span>
                    <div className="ml-auto bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-3 py-1 rounded-full">
                      <span className="text-purple-300 text-sm font-medium">
                        {Object.keys(storedData).length} items
                      </span>
                    </div>
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Real-time visualization of your stored data with advanced metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {Object.keys(storedData).length === 0 ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                        <Database className="w-8 h-8 text-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-300">No Data Stored</h3>
                        <p className="text-gray-500">Start by adding some data to see the magic happen!</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {Object.entries(storedData).map(([storageKey, storageValue], index) => (
                        <div
                          key={storageKey}
                          className={cn(
                            "group relative p-4 bg-gradient-to-r from-black/20 to-black/10 rounded-xl border border-white/10",
                            "hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                          )}
                          style={{
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0 space-y-1">
                              <div className="font-semibold text-white truncate text-lg">
                                {storageKey}
                              </div>
                              <div className="text-sm text-gray-400 truncate">
                                {storageValue}
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(storageKey)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Floating3DCard>
          </ImmersiveScrollSection>

          {/* Features Grid */}
          <ImmersiveScrollSection 
            parallaxStrength={0.1}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <NeoBrutalistText variant="h2" color="accent">
                Next-Gen Features
              </NeoBrutalistText>
              <NeoBrutalistText variant="body" color="secondary" className="max-w-2xl mx-auto">
                Powered by cutting-edge technologies and designed for the future of web development
              </NeoBrutalistText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Floating3DCard 
                  key={feature.title} 
                  intensity="low"
                  className="h-full"
                  style={{
                    animationDelay: `${index * 150}ms`
                  }}
                >
                  <Card className="glass-dark border-white/10 shadow-xl h-full group hover:shadow-2xl transition-all duration-500">
                    <CardContent className="p-6 space-y-4 h-full flex flex-col">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                        feature.gradient,
                        "group-hover:scale-110 transition-transform duration-300"
                      )}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Floating3DCard>
              ))}
            </div>
          </ImmersiveScrollSection>

          {/* Technical Specifications */}
          <ImmersiveScrollSection 
            parallaxStrength={0.2}
            className="space-y-8"
          >
            <Floating3DCard intensity="medium">
              <Card className="glass-dark border-white/10 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    2025 Technology Stack
                  </CardTitle>
                  <CardDescription className="text-gray-400 text-lg">
                    Built with tomorrow's technologies, available today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { name: "WebGL 2.0", desc: "Hardware-accelerated graphics", color: "from-red-500 to-orange-500" },
                      { name: "120Hz Optimized", desc: "Silky smooth animations", color: "from-green-500 to-emerald-500" },
                      { name: "WCAG 2.1 AA", desc: "Universal accessibility", color: "from-blue-500 to-cyan-500" },
                      { name: "Core Web Vitals", desc: "Perfect performance scores", color: "from-purple-500 to-pink-500" }
                    ].map((tech, index) => (
                      <div key={tech.name} className="text-center space-y-3">
                        <div className={cn(
                          "w-16 h-16 mx-auto rounded-full bg-gradient-to-br flex items-center justify-center",
                          tech.color,
                          "animate-glow"
                        )} style={{ animationDelay: `${index * 200}ms` }}>
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">{tech.name}</h4>
                          <p className="text-gray-400 text-sm">{tech.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Floating3DCard>
          </ImmersiveScrollSection>

          {/* Call to Action */}
          <ImmersiveScrollSection 
            parallaxStrength={0.3}
            fadeEffect={true}
            className="text-center space-y-8"
          >
            <div className="space-y-6">
              <NeoBrutalistText variant="h2" color="accent">
                Ready to Experience the Future?
              </NeoBrutalistText>
              <NeoBrutalistText variant="body" color="secondary" className="max-w-2xl mx-auto">
                Join thousands of developers already building with tomorrow's technology stack
              </NeoBrutalistText>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/25 transition-all duration-300 animate-glow"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </ImmersiveScrollSection>
        </div>

        {/* Footer gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </div>
    </GestureHandler>
  );
};

export default Index;
