
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form';
import { setApiKeys } from '@/services/queryService';
import { motion } from 'framer-motion';
import { Key } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface ApiFormValues {
  weatherKey: string;
  googleKey: string;
  langChainKey: string;
}

const ApiConfig = () => {
  const navigate = useNavigate();
  const [isConfigured, setIsConfigured] = useState(false);
  
  // Set up react-hook-form
  const form = useForm<ApiFormValues>({
    defaultValues: {
      weatherKey: '',
      googleKey: '',
      langChainKey: ''
    }
  });
  
  useEffect(() => {
    document.title = "API Configuration - GenUI";
    
    // Check if any keys were previously saved in localStorage
    const savedWeatherKey = localStorage.getItem('weather_api_key');
    const savedGoogleKey = localStorage.getItem('google_api_key');
    const savedLangChainKey = localStorage.getItem('langchain_api_key');
    
    if (savedWeatherKey) form.setValue('weatherKey', savedWeatherKey);
    if (savedGoogleKey) form.setValue('googleKey', savedGoogleKey);
    if (savedLangChainKey) form.setValue('langChainKey', savedLangChainKey);
    
    setIsConfigured(
      !!localStorage.getItem('api_configured') && 
      (!!savedWeatherKey || !!savedGoogleKey || !!savedLangChainKey)
    );
  }, [form]);
  
  const onSubmit = (data: ApiFormValues) => {
    // Save to localStorage (in a production app, these would be securely stored)
    if (data.weatherKey) localStorage.setItem('weather_api_key', data.weatherKey);
    if (data.googleKey) localStorage.setItem('google_api_key', data.googleKey);
    if (data.langChainKey) localStorage.setItem('langchain_api_key', data.langChainKey);
    
    localStorage.setItem('api_configured', 'true');
    
    // Set the API keys for use in the application
    setApiKeys(data.weatherKey, data.googleKey, data.langChainKey);
    
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
    
    form.reset({
      weatherKey: '',
      googleKey: '',
      langChainKey: ''
    });
    
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
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
                <Key className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">API Configuration</h1>
              <p className="text-muted-foreground">
                Enter your API keys to enable real-time data
              </p>
            </div>
            
            <Card>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent className="space-y-4 pt-6">
                    <FormItem>
                      <FormLabel htmlFor="weatherKey">Weather API Key (OpenWeatherMap)</FormLabel>
                      <FormControl>
                        <Input
                          id="weatherKey"
                          placeholder="Enter your Weather API key"
                          {...form.register('weatherKey')}
                          className="font-mono text-sm"
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
                          {...form.register('googleKey')}
                          className="font-mono text-sm"
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
                          {...form.register('langChainKey')}
                          className="font-mono text-sm"
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
              </Form>
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
