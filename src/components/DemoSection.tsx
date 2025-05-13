
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Loader2 } from 'lucide-react';

const DemoSection = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse(`This is a simulated response for the query: "${query}"\n\nIn a real implementation, this would connect to your Python backend that leverages LangGraph to process this query through a multi-step reasoning workflow.\n\nThe response would be generated after passing through multiple nodes in the LangGraph workflow, potentially including:\n\n1. Query understanding\n2. Knowledge retrieval\n3. Answer synthesis\n4. Response formatting`);
      setIsLoading(false);
    }, 1500);
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
          <Tabs defaultValue="chat">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="chat">Interactive Chat</TabsTrigger>
              <TabsTrigger value="workflow">Workflow Visualization</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <Input
                          placeholder="Ask me anything..."
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="text-lg"
                        />
                        <Button 
                          type="submit" 
                          className="w-full" 
                          disabled={isLoading || !query.trim()}
                        >
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Query
                            </>
                          )}
                        </Button>
                      </div>
                    </form>

                    {response && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Response:</h3>
                        <Textarea 
                          value={response} 
                          readOnly 
                          className="min-h-[200px] bg-muted/50"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="workflow">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-muted/30 border rounded-lg p-6"
              >
                <div className="flex justify-center items-center mb-4">
                  <h3 className="font-medium">Multi-Step Agent Workflow</h3>
                </div>
                
                <div className="relative h-[400px] flex items-center justify-center">
                  <svg width="100%" height="100%" viewBox="0 0 800 400" className="max-w-full">
                    {/* Input Node */}
                    <g>
                      <circle cx="100" cy="200" r="40" fill="hsl(var(--primary))" opacity="0.8" />
                      <text x="100" y="200" textAnchor="middle" fill="white" dominantBaseline="middle">Input</text>
                    </g>
                    
                    {/* Arrow */}
                    <path d="M 150 200 L 230 200" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* Parser Node */}
                    <g>
                      <circle cx="280" cy="120" r="40" fill="hsl(var(--secondary))" opacity="0.8" />
                      <text x="280" y="120" textAnchor="middle" fill="white" dominantBaseline="middle">Parser</text>
                    </g>
                    
                    {/* Retrieval Node */}
                    <g>
                      <circle cx="280" cy="280" r="40" fill="hsl(var(--secondary))" opacity="0.8" />
                      <text x="280" y="280" textAnchor="middle" fill="white" dominantBaseline="middle">Retrieval</text>
                    </g>
                    
                    {/* Arrows */}
                    <path d="M 150 190 L 240 130" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <path d="M 150 210 L 240 270" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <path d="M 320 120 L 420 190" stroke="hsl(var(--secondary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <path d="M 320 280 L 420 210" stroke="hsl(var(--secondary))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* Generator Node */}
                    <g>
                      <circle cx="470" cy="200" r="40" fill="hsl(var(--accent))" opacity="0.8" />
                      <text x="470" y="200" textAnchor="middle" fill="white" dominantBaseline="middle">Generator</text>
                    </g>
                    
                    {/* Arrow */}
                    <path d="M 510 200 L 580 200" stroke="hsl(var(--accent))" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    
                    {/* Output Node */}
                    <g>
                      <circle cx="630" cy="200" r="40" fill="hsl(var(--primary))" opacity="0.8" />
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
                  <p className="text-sm text-muted-foreground">
                    This simplified visualization shows how a query flows through a multi-step LangGraph workflow.
                  </p>
                  <Button variant="outline" className="mt-4">
                    Explore Full Workflow Builder
                  </Button>
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
