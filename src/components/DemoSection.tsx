
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CircleCheck } from 'lucide-react';
import { QueryResponse } from '@/services/queryService';
import ChatInterface from './ChatInterface';

const DemoSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [activeTab, setActiveTab] = useState('chat');

  const handleQueryCompleted = (result: QueryResponse) => {
    setResponse(result);
    setIsLoading(false);
    
    // If we're in chat tab, auto-switch to workflow to show the process
    if (activeTab === 'chat') {
      setTimeout(() => setActiveTab('workflow'), 500);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try the Demo</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience how GenUI can power intelligent, multi-step workflows with Python and LangGraph.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="chat">Interactive Chat</TabsTrigger>
              <TabsTrigger value="workflow">Workflow Visualization</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <ChatInterface 
                      onQueryCompleted={handleQueryCompleted}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="workflow">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative bg-muted/30 border rounded-lg p-6"
              >
                <div className="flex justify-center items-center mb-4">
                  <h3 className="font-medium">Multi-Step Agent Workflow</h3>
                </div>
                
                <div className="relative h-[400px] flex items-center justify-center">
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                      <div className="text-center">
                        <Loader2 className="h-10 w-10 animate-spin mx-auto text-primary" />
                        <p className="mt-2">Processing your query...</p>
                      </div>
                    </div>
                  )}
                  
                  <svg width="100%" height="100%" viewBox="0 0 800 400" className="max-w-full">
                    {/* Input Node */}
                    <g>
                      <circle 
                        cx="100" 
                        cy="200" 
                        r="40" 
                        fill="hsl(var(--primary))" 
                        opacity={response ? "0.8" : "1"} 
                      />
                      <text x="100" y="200" textAnchor="middle" fill="white" dominantBaseline="middle">Input</text>
                    </g>
                    
                    {/* Arrows */}
                    <path d="M 150 200 L 230 200" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* Parser Node */}
                    <g>
                      <circle 
                        cx="280" 
                        cy="120" 
                        r="40" 
                        fill="hsl(var(--secondary))" 
                        opacity={response && response.steps && response.steps.length > 0 ? "1" : "0.5"} 
                      />
                      <text x="280" y="120" textAnchor="middle" fill="white" dominantBaseline="middle">
                        {response && response.steps ? response.steps[0]?.step : "Parser"}
                      </text>
                    </g>
                    
                    {/* Retrieval Node */}
                    <g>
                      <circle 
                        cx="280" 
                        cy="280" 
                        r="40" 
                        fill="hsl(var(--secondary))" 
                        opacity={response && response.steps && response.steps.length > 1 ? "1" : "0.5"} 
                      />
                      <text x="280" y="280" textAnchor="middle" fill="white" dominantBaseline="middle">
                        {response && response.steps ? response.steps[1]?.step : "Retrieval"}
                      </text>
                    </g>
                    
                    {/* Arrows */}
                    <path d="M 150 190 L 240 130" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <path d="M 150 210 L 240 270" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <path d="M 320 120 L 420 190" stroke="hsl(var(--secondary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <path d="M 320 280 L 420 210" stroke="hsl(var(--secondary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* Generator Node */}
                    <g>
                      <circle 
                        cx="470" 
                        cy="200" 
                        r="40" 
                        fill="hsl(var(--accent))" 
                        opacity={response && response.steps && response.steps.length > 2 ? "1" : "0.5"} 
                      />
                      <text x="470" y="200" textAnchor="middle" fill="white" dominantBaseline="middle">
                        {response && response.steps ? response.steps[2]?.step : "Generator"}
                      </text>
                    </g>
                    
                    {/* Arrow */}
                    <path d="M 510 200 L 580 200" stroke="hsl(var(--accent))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* Output Node */}
                    <g>
                      <circle 
                        cx="630" 
                        cy="200" 
                        r="40" 
                        fill="hsl(var(--primary))" 
                        opacity={response ? "1" : "0.5"} 
                      />
                      <text x="630" y="200" textAnchor="middle" fill="white" dominantBaseline="middle">Output</text>
                    </g>
                    
                    {/* Arrowhead definition */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="9"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
                      </marker>
                    </defs>
                  </svg>
                </div>
                
                <div className="text-center mt-4">
                  {response ? (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        This visualization shows how your query flows through a multi-step LangGraph workflow.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {response.steps && response.steps.map((step, index) => (
                          <div key={index} className="bg-background p-3 rounded border text-left">
                            <h4 className="font-medium text-sm">{step.step}</h4>
                            <p className="text-xs text-muted-foreground">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Submit a query to see how it flows through a multi-step LangGraph workflow.
                    </p>
                  )}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default DemoSection;
