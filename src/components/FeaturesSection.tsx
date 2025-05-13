
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Layers, LineChart, Code2, Lock } from 'lucide-react';

const features = [
  {
    title: "Python Backend Integration",
    description: "Seamlessly connect with Python and LangGraph backends to power your generative AI workflows.",
    icon: <Code2 className="h-10 w-10 text-genui-blue" />,
    benefits: [
      "Full Python language support",
      "Native LangGraph integration",
      "Jupyter notebook compatibility",
      "Import existing Python workflows"
    ]
  },
  {
    title: "Visual Workflow Builder",
    description: "Design complex agent workflows visually with an intuitive drag-and-drop interface.",
    icon: <Layers className="h-10 w-10 text-genui-teal" />,
    benefits: [
      "Interactive node editing",
      "Conditional branching",
      "Save and load workflow templates",
      "Share workflows with your team"
    ]
  },
  {
    title: "Performance Monitoring",
    description: "Track, analyze and optimize your LangGraph workflow performance in real-time.",
    icon: <LineChart className="h-10 w-10 text-genui-purple" />,
    benefits: [
      "Real-time metrics dashboard",
      "Node execution timing",
      "Error rate tracking",
      "Cost optimization insights"
    ]
  },
  {
    title: "Enterprise Security",
    description: "Deploy with confidence with enterprise-grade security features built in.",
    icon: <Lock className="h-10 w-10 text-primary" />,
    benefits: [
      "End-to-end encryption",
      "Role-based access control",
      "API key management",
      "Audit logging"
    ]
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build, visualize, and deploy production-ready LangGraph workflows.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border rounded-lg p-6"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              <ul className="space-y-2">
                {feature.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
