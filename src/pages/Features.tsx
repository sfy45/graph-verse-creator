
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Features = () => {
  useEffect(() => {
    document.title = "Features - GenUI";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Visual Workflow Editor</h3>
              <p className="text-muted-foreground">Design complex AI workflows with our intuitive drag-and-drop interface. No coding required for basic use cases.</p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Python Integration</h3>
              <p className="text-muted-foreground">Seamlessly integrate with Python code. Import existing functions or write custom logic directly in our editor.</p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">LangGraph Compatible</h3>
              <p className="text-muted-foreground">Built on top of LangGraph, allowing for powerful stateful workflows and complex reasoning chains.</p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Debug & Inspect</h3>
              <p className="text-muted-foreground">Step through your workflow execution, inspect state at each node, and quickly identify issues.</p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">One-Click Deployment</h3>
              <p className="text-muted-foreground">Deploy your workflows to production with a single click. Scale automatically based on demand.</p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Model Agnostic</h3>
              <p className="text-muted-foreground">Works with OpenAI, Anthropic, custom models, or any other LLM provider you choose.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
