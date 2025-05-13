
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import ApiConfig from "./pages/ApiConfig";
import { useEffect } from "react";
import { setApiKeys } from "./services/queryService";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize API keys from localStorage if available
    const weatherKey = localStorage.getItem('weather_api_key') || '';
    const googleKey = localStorage.getItem('google_api_key') || '';
    const langChainKey = localStorage.getItem('langchain_api_key') || '';
    
    if (weatherKey || googleKey || langChainKey) {
      setApiKeys(weatherKey, googleKey, langChainKey);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/api-config" element={<ApiConfig />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
