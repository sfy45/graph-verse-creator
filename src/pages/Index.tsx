
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatInterface from '@/components/ChatInterface';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "GenUI - AI Query Assistant";
    
    // Check if API keys are configured
    const weatherKey = localStorage.getItem('weather_api_key');
    const googleKey = localStorage.getItem('google_api_key');
    const langChainKey = localStorage.getItem('langchain_api_key');
    
    if (!weatherKey && !googleKey && !langChainKey) {
      toast.info("Please configure your API keys to get real-time data", {
        action: {
          label: "Configure",
          onClick: () => navigate('/api-config')
        },
        duration: 5000
      });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">GenUI Assistant</span>
            </h1>
            <p className="text-muted-foreground">
              Ask anything or check the weather using the power of LangGraph and connected APIs
            </p>
          </div>
          
          <Card className="shadow-md">
            <CardContent className="p-6">
              <ChatInterface />
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
