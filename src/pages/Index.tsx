
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Save, Database } from 'lucide-react';
import { toast } from 'sonner';

const Index = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [storedData, setStoredData] = useState<{ [key: string]: string }>({});

  // Load all data from localStorage on component mount
  useEffect(() => {
    loadStoredData();
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">
            Local Storage Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A modern Vite + React starter with local storage functionality. 
            Store and manage data directly in your browser.
          </p>
        </div>

        {/* Add New Data Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              Add New Data
            </CardTitle>
            <CardDescription>
              Store key-value pairs in your browser's local storage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="key">Key</Label>
                <Input
                  id="key"
                  placeholder="Enter a key (e.g., username)"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  placeholder="Enter a value (e.g., John Doe)"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSave()}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save to Local Storage
              </Button>
              <Button 
                onClick={handleClearAll} 
                variant="destructive"
                disabled={Object.keys(storedData).length === 0}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stored Data Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Stored Data ({Object.keys(storedData).length} items)
            </CardTitle>
            <CardDescription>
              All data currently stored in your browser's local storage
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(storedData).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No data stored yet. Add some data above to get started!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(storedData).map(([storageKey, storageValue]) => (
                  <div
                    key={storageKey}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">
                        {storageKey}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {storageValue}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(storageKey)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              What's included in this starter template
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">⚡ Vite</h3>
                <p className="text-sm text-blue-700">
                  Lightning fast build tool with hot module replacement
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">⚛️ React 18</h3>
                <p className="text-sm text-green-700">
                  Latest React with hooks and modern features
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">🎨 Tailwind CSS</h3>
                <p className="text-sm text-purple-700">
                  Utility-first CSS framework for rapid UI development
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-2">🧩 Shadcn/ui</h3>
                <p className="text-sm text-orange-700">
                  Beautiful, accessible components built on Radix UI
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-900 mb-2">💾 Local Storage</h3>
                <p className="text-sm text-red-700">
                  Persistent data storage in the browser
                </p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">📱 Responsive</h3>
                <p className="text-sm text-indigo-700">
                  Mobile-first design that works on all devices
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
