
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { setApiKeys } from '@/services/queryService';
import { motion } from 'framer-motion';

const ApiConfig = () => {
  const navigate = useNavigate();
  const [weatherKey, setWeatherKey] = useState('');
  const [googleKey, setGoogleKey] = useState('');
  const [langChainKey, setLangChainKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  useEffect(() => {
    document.title = "API Configuration - GenUI";
    
    // Check if any keys were previously saved in localStorage
    const savedWeatherKey = localStorage.getItem('weather_api_key');
    const savedGoogleKey = localStorage.getItem('google_api_key');
    const savedLangChainKey = localStorage.getItem('langchain_api_key');
    
    if (savedWeatherKey) setWeatherKey(savedWeatherKey);
    if (savedGoogleKey) setGoogleKey(savedGoogleKey);
    if (savedLangChainKey) setLangChainKey(savedLangChainKey);
    
    setIsConfigured(
      !!localStorage.getItem('api_configured') && 
      (!!savedWeatherKey || !!savedGoogleKey || !!savedLangChainKey)
    );
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage (in a production app, these would be securely stored)
    if (weatherKey) localStorage.setItem('weather_api_key', weatherKey);
    if (googleKey) localStorage.setItem('google_api_key', googleKey);
    if (langChainKey) localStorage.setItem('langchain_api_key', langChainKey);
    
    localStorage.setItem('api_configured', 'true');
    
    // Set the API keys for use in the application
    setApiKeys(weatherKey, googleKey, langChainKey);
    
    setIsConfigured(true);
    toast.success("API keys saved successfully");
    
    // Navigate to home page
    navigate('/');
  };
  
  const clearConfiguration = () => {
    localStorage.removeItem('weather_api_key');
    localStorage.removeItem('google_api_key');
    localStorage.removeItem('langchain_api_key');
    localStorage.removeItem('api_configured');
    
    setWeatherKey('');
    setGoogleKey('');
    setLangChainKey('');
    setIsConfigured(false);
    
    setApiKeys('', '', '');
    toast.info("API configuration cleared");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">API Configuration</CardTitle>
                <CardDescription>
                  Configure your API keys to enable real-time data in the application.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <FormItem>
                    <FormLabel htmlFor="weatherKey">Weather API Key (OpenWeatherMap)</FormLabel>
                    <FormControl>
                      <Input
                        id="weatherKey"
                        placeholder="Enter your Weather API key"
                        value={weatherKey}
                        onChange={(e) => setWeatherKey(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Required for real-time weather data queries.
                    </FormDescription>
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel htmlFor="googleKey">Google API Key</FormLabel>
                    <FormControl>
                      <Input
                        id="googleKey"
                        placeholder="Enter your Google API key"
                        value={googleKey}
                        onChange={(e) => setGoogleKey(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Used for location and search functionality.
                    </FormDescription>
                  </FormItem>
                  
                  <FormItem>
                    <FormLabel htmlFor="langChainKey">LangChain/LangGraph API Key</FormLabel>
                    <FormControl>
                      <Input
                        id="langChainKey"
                        placeholder="Enter your LangChain API key"
                        value={langChainKey}
                        onChange={(e) => setLangChainKey(e.target.value)}
                      />
                    </FormControl>
                    <FormDescription>
                      Required for AI-powered responses and workflows.
                    </FormDescription>
                  </FormItem>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={clearConfiguration}
                  >
                    Clear Configuration
                  </Button>
                  <Button type="submit">
                    {isConfigured ? "Update Keys" : "Save Keys"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
            
            {isConfigured && (
              <div className="mt-6 text-center">
                <p className="text-green-600 dark:text-green-400 mb-4">
                  ✓ API keys configured successfully
                </p>
                <Button onClick={() => navigate('/')} variant="secondary">
                  Return to Home
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiConfig;
