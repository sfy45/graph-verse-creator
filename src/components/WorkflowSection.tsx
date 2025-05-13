
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeIcon, ArrowRight } from 'lucide-react';

const WorkflowSection = () => {
  const pythonCode = `
# Define a simple LangGraph workflow
from typing import Dict, TypedDict, Annotated, Sequence
from langgraph.graph import StateGraph
from langchain_openai import ChatOpenAI

# Define the state
class AgentState(TypedDict):
    question: str
    intermediate_steps: Annotated[Sequence[str], "Steps taken so far"]
    answer: str

# Create the nodes
def generate_answer(state: AgentState) -> AgentState:
    llm = ChatOpenAI(temperature=0)
    question = state["question"]
    response = llm.invoke(f"Answer the following question: {question}")
    return {"answer": response.content}

def enrich_answer(state: AgentState) -> AgentState:
    intermediate_steps = list(state.get("intermediate_steps", []))
    intermediate_steps.append("Enriching the answer with more context")
    return {"intermediate_steps": intermediate_steps}

# Define the graph
workflow = StateGraph(AgentState)
workflow.add_node("generate", generate_answer)
workflow.add_node("enrich", enrich_answer)

# Add edges
workflow.add_edge("generate", "enrich")
workflow.add_edge("enrich", "END")

# Set the entry point
workflow.set_entry_point("generate")

# Compile the graph
app = workflow.compile()
`;

  return (
    <div className="bg-background py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Create <span className="gradient-text">LangGraph</span> Workflows
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Design powerful agent workflows with Python and LangGraph. Visualize execution paths,
            debug states, and deploy with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-2">How It Works</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="rounded-full bg-primary/10 text-primary h-8 w-8 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium">Define Your Workflow</h4>
                  <p className="text-muted-foreground">Write Python code using LangGraph's StateGraph to define your workflow structure.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="rounded-full bg-primary/10 text-primary h-8 w-8 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium">Visualize</h4>
                  <p className="text-muted-foreground">See your workflow as an interactive graph with nodes and edges.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="rounded-full bg-primary/10 text-primary h-8 w-8 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium">Debug & Test</h4>
                  <p className="text-muted-foreground">Step through execution, inspect state transitions, and debug issues.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="rounded-full bg-primary/10 text-primary h-8 w-8 flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-medium">Deploy</h4>
                  <p className="text-muted-foreground">Export your workflow as Python code or deploy directly to production.</p>
                </div>
              </div>
            </div>
            
            <Button className="mt-4">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue="code">
              <TabsList className="mb-4">
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="visual">Visual Editor</TabsTrigger>
              </TabsList>

              <TabsContent value="code">
                <Card className="overflow-hidden">
                  <div className="bg-muted p-2 flex items-center justify-between border-b">
                    <div className="flex items-center">
                      <CodeIcon className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">workflow.py</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                  </div>
                  <pre className="p-4 text-left overflow-auto text-sm bg-muted/30 max-h-[400px]">
                    <code>{pythonCode}</code>
                  </pre>
                </Card>
              </TabsContent>

              <TabsContent value="visual">
                <Card className="p-6 h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium">Visual Workflow Editor</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Drag and drop nodes to create your workflow visually.
                      Connect them with edges to define the execution flow.
                    </p>
                    <Button variant="outline" className="mt-4">Preview Visual Editor</Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSection;
