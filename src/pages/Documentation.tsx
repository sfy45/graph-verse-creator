
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Documentation = () => {
  useEffect(() => {
    document.title = "Documentation - GenUI";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Documentation</h1>
          <div className="prose max-w-none">
            <h2>Getting Started</h2>
            <p>Welcome to the GenUI documentation. This page will help you get started with building AI workflows using Python and LangGraph.</p>
            
            <h2>Installation</h2>
            <pre className="bg-muted p-4 rounded-md"><code>pip install genui-framework</code></pre>
            
            <h2>Basic Usage</h2>
            <p>Create your first workflow by following these simple steps:</p>
            <ol>
              <li>Import the GenUI library</li>
              <li>Define your workflow states</li>
              <li>Create workflow nodes</li>
              <li>Connect nodes with edges</li>
              <li>Compile and run your workflow</li>
            </ol>
            
            <h2>Example</h2>
            <pre className="bg-muted p-4 rounded-md"><code>{`
from genui import StateGraph, NodeTypes

# Define your workflow
workflow = StateGraph()

# Add nodes
workflow.add_node("input", NodeTypes.INPUT)
workflow.add_node("process", NodeTypes.PROCESSOR)
workflow.add_node("output", NodeTypes.OUTPUT)

# Connect nodes
workflow.connect("input", "process")
workflow.connect("process", "output")

# Run the workflow
result = workflow.run({"query": "Hello, world!"})
            `}</code></pre>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Documentation;
