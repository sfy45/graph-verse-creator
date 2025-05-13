
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { processQuery } from '@/services/queryService';
import { Loader2, Send, File, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ChatInterfaceProps {
  onQueryCompleted?: (result: any) => void;
}

const ChatInterface = ({ onQueryCompleted }: ChatInterfaceProps) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [apiConfigured, setApiConfigured] = useState(false);

  const checkApiConfigured = () => {
    const weatherKey = localStorage.getItem('weather_api_key');
    const googleKey = localStorage.getItem('google_api_key');
    const langChainKey = localStorage.getItem('langchain_api_key');
    
    const isConfigured = 
      (weatherKey && weatherKey.length > 5) || 
      (googleKey && googleKey.length > 5) || 
      (langChainKey && langChainKey.length > 5);
      
    setApiConfigured(isConfigured);
    return isConfigured;
  };

  useEffect(() => {
    // Focus the input field when component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Check if API keys are configured
    checkApiConfigured();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter a query");
      return;
    }
    
    if (!checkApiConfigured()) {
      toast.error("API keys not configured or invalid. Please set up your API keys first.");
      navigate('/api-config');
      return;
    }

    setIsLoading(true);
    setResponse(null);
    
    try {
      const result = await processQuery(query);
      
      setResponse(result.answer);
      
      if (onQueryCompleted) {
        onQueryCompleted(result);
      }
      
      if (result.error) {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error processing query:", error);
      toast.error("Failed to process your query. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
      toast.success(`File selected: ${files[0].name}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* API Configuration Alert */}
        {!apiConfigured && (
          <Alert className="border-amber-300 bg-amber-50 dark:bg-amber-900/20 m-4">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-300">
              API keys not configured. Real-time data features will be limited.{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-amber-700 dark:text-amber-400"
                onClick={() => navigate('/api-config')}
              >
                Configure API keys
              </Button>
            </AlertDescription>
          </Alert>
        )}
        
        {/* Response area */}
        <AnimatePresence mode="wait">
          {response && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-6"
            >
              <Textarea
                value={response}
                readOnly
                className="min-h-[200px] bg-muted/30 text-foreground"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              ref={inputRef}
              placeholder="What's the weather like in San Francisco?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 h-12 text-base"
              disabled={isLoading}
            />

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* File button */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-12"
                onClick={handleFileClick}
                disabled={isLoading}
              >
                <span className="hidden md:inline mr-2">Choose File</span>
                <File className="h-4 w-4" />
                {selectedFile && <span className="hidden md:inline ml-2 text-xs truncate max-w-[100px]">{selectedFile.name}</span>}
              </Button>

              {/* Submit button */}
              <Button 
                type="submit" 
                className="h-12 px-6" 
                disabled={isLoading || !query.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="hidden md:inline">Processing...</span>
                  </>
                ) : (
                  <>
                    <span className="hidden md:inline mr-2">Submit</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
          
          {/* API configuration notice */}
          <div className="mt-2 text-center">
            <Button 
              variant="link" 
              className="text-xs text-muted-foreground"
              onClick={() => navigate('/api-config')}
            >
              Configure API Keys
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
