
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <div className="gradient-bg py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Start Building with GenUI Today
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-8">
              Join the growing community of developers who are creating the next generation
              of AI-powered applications with Python and LangGraph.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-genui-blue hover:bg-white/90">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
