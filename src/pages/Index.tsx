
import { useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import WorkflowSection from '@/components/WorkflowSection';
import DemoSection from '@/components/DemoSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Index = () => {
  useEffect(() => {
    document.title = "GenUI - Build AI Workflows with Python & LangGraph";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <DemoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
