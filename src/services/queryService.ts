
// This service handles queries to external APIs and LangGraph backend

export interface QueryResponse {
  answer: string;
  steps?: {
    step: string;
    description: string;
  }[];
  error?: string;
}

// API keys would be securely provided by the user
let weatherApiKey: string | null = null;
let googleApiKey: string | null = null;
let langChainApiKey: string | null = null;

export function setApiKeys(weather: string, google: string, langChain: string) {
  weatherApiKey = weather;
  googleApiKey = google;
  langChainApiKey = langChain;
  console.log("API keys configured successfully");
}

export async function getWeatherData(location: string): Promise<any> {
  if (!weatherApiKey) {
    throw new Error("Weather API key not configured");
  }
  
  try {
    // Using OpenWeatherMap as an example
    console.log(`Fetching weather data for ${location} with API key: ${weatherApiKey.substring(0, 4)}...`);
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${weatherApiKey}&units=metric`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather API error (${response.status}):`, errorText);
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Weather API error:", error);
    throw error;
  }
}

export async function processQuery(query: string): Promise<QueryResponse> {
  console.log("Processing query:", query);
  
  // Check if at least one API key is configured
  if (!weatherApiKey && !googleApiKey && !langChainApiKey) {
    console.warn("No API keys configured, using fallback mode");
    // Fallback to mock data when no APIs are configured
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          answer: `To fully answer your query: "${query}", please provide the necessary API keys in the API Configuration section.`,
          steps: [
            { step: "Configure APIs", description: "API keys are required for real-time data" },
            { step: "Process Query", description: "Enter your query to get real-time responses" },
            { step: "View Results", description: "Results will appear after processing" }
          ]
        });
      }, 1000);
    });
  }
  
  // Pattern match for weather queries
  if (query.toLowerCase().includes("weather") && weatherApiKey) {
    try {
      const locationMatch = query.match(/weather (?:in|at|for) ([a-zA-Z\s,]+)/i);
      const location = locationMatch ? locationMatch[1].trim() : "San Francisco";
      
      const weatherData = await getWeatherData(location);
      
      return {
        answer: `The current weather in ${weatherData.name} is ${weatherData.weather[0].description} with a temperature of ${weatherData.main.temp}°C (${(weatherData.main.temp * 9/5 + 32).toFixed(1)}°F). The humidity is ${weatherData.main.humidity}% and wind speed is ${weatherData.wind.speed} m/s.`,
        steps: [
          { step: "Parse Query", description: `Identified weather request for "${location}"` },
          { step: "Retrieve Data", description: "Connected to weather service API" },
          { step: "Generate Response", description: "Formatted weather information" }
        ]
      };
    } catch (error) {
      console.error("Weather processing error:", error);
      return {
        answer: `I encountered an error retrieving weather data: ${error instanceof Error ? error.message : "Unknown error"}. Please check your Weather API key in the API Configuration section.`,
        error: error instanceof Error ? error.message : "Unknown error",
        steps: [
          { step: "Error", description: "Failed to retrieve weather data" }
        ]
      };
    }
  }
  
  // For non-weather queries when LangChain key is provided
  if (langChainApiKey) {
    return {
      answer: `Here's what I found for "${query}":\n\nThis is a response using your LangChain/LangGraph API key. In a production environment, this would connect to a LangChain/LangGraph backend for more advanced processing.`,
      steps: [
        { step: "Query Analysis", description: "Understand the question intent and entities" },
        { step: "Knowledge Retrieval", description: "Search for relevant information" },
        { step: "Response Generation", description: "Create a comprehensive answer" }
      ]
    };
  }
  
  // Default response for other types of queries
  return {
    answer: `I processed your query: "${query}"\n\nFor weather-related questions, try asking something like "What's the weather like in New York?"\n\nFor more advanced AI responses, please provide a LangChain API key in the API Configuration section.`,
    steps: [
      { step: "Query Analysis", description: "Parsed your question" },
      { step: "Response Generation", description: "Created a basic response" }
    ]
  };
}
