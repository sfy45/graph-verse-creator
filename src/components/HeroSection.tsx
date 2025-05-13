
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Braces, Workflow } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background to-muted py-20 md:py-32">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-genui-purple/20 via-genui-teal/20 to-genui-blue/20"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mx-auto max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build <span className="gradient-text">Generative AI</span> Workflows with Python
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 mx-auto max-w-2xl">
            Create, visualize, and deploy complex LangGraph workflows with an intuitive UI. 
            Harness the power of Python and LLMs for your next AI application.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="font-medium">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="font-medium">
              View Demo
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Python-Powered",
              description: "Leverage the full power of Python's ecosystem for LLM applications",
              icon: <Code className="h-8 w-8 text-genui-teal" />
            },
            {
              title: "Visual Workflows",
              description: "Design complex AI workflows with an intuitive drag-and-drop interface",
              icon: <Workflow className="h-8 w-8 text-genui-blue" />
            },
            {
              title: "LangGraph Integration",
              description: "Seamlessly build with LangGraph for state-of-the-art agent frameworks",
              icon: <Braces className="h-8 w-8 text-genui-purple" />
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-sm border"
            >
              <div className="rounded-full bg-muted w-14 h-14 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
