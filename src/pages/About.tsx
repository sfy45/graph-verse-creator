
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  useEffect(() => {
    document.title = "About - GenUI";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="gradient-text">About GenUI</span>
          </h1>
          
          <Card className="mb-8">
            <CardContent className="p-6 prose dark:prose-invert max-w-none">
              <h2>What is GenUI?</h2>
              <p>
                GenUI is an AI assistant powered by LangGraph that integrates with various APIs to provide 
                real-time information and answers to your questions.
              </p>
              
              <h2>API Integration</h2>
              <p>
                GenUI integrates with various APIs to provide real-time data:
              </p>
              <ul>
                <li><strong>Weather API:</strong> Get real-time weather data for any location</li>
                <li><strong>Google API:</strong> Access location services and search functionality</li>
                <li><strong>LangChain/LangGraph API:</strong> Connect to advanced AI workflows and agents</li>
              </ul>
              
              <h2>How to Use</h2>
              <p>
                Simply type your question in the chat interface on the home page. You can ask about the weather, 
                locations, or any other question that our AI can help with.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
