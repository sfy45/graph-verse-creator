
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  useEffect(() => {
    document.title = "About - GenUI";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">About GenUI</h1>
          <div className="prose max-w-none">
            <h2>Our Mission</h2>
            <p>
              GenUI was created to make building sophisticated AI workflows accessible to everyone. We believe that the power of language models and multi-step reasoning should be available to developers of all skill levels.
            </p>
            
            <h2>The Team</h2>
            <p>
              Our team consists of AI engineers, UX designers, and Python enthusiasts who are passionate about creating tools that simplify complex AI systems.
            </p>
            
            <h2>Technology</h2>
            <p>
              GenUI is built on top of LangGraph, a powerful framework for creating stateful, multi-step workflows with language models. We've added a visual layer that makes it easy to design, debug, and deploy these workflows without sacrificing flexibility or power.
            </p>
            
            <h2>Open Source</h2>
            <p>
              We believe in the power of community. Much of our core technology is open source, and we actively contribute to the LangGraph and LangChain ecosystems.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
