import { GoogleGenerativeAI } from "@google/generative-ai";

function getApiKey() {
  return import.meta.env.VITE_GEMINI_API_KEY;
}

function getGenAI() {
  const apiKey = getApiKey();
  if (!apiKey) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
}

const SYSTEM_PROMPT = `You are ToyoBot, a helpful and friendly AI car advisor for Toyota. Your role is to help customers find the perfect Toyota vehicle.

Key information about Toyota vehicles:
- Sedans: Corolla (starting ~$22,000), Camry (starting ~$26,420), Prius (starting ~$27,450)
- SUVs: RAV4 (starting ~$28,675), Highlander (starting ~$37,880), 4Runner (starting ~$39,340)
- The Camry has 38.0 inches of headroom and 42.1 inches of legroom, making it great for taller drivers
- Hybrid options are available for many models with excellent fuel economy
- All vehicles come with Toyota Safety Sense 2.5+ standard
- The RAV4 Hybrid gets 40 MPG, Camry Hybrid gets 52 MPG, Prius gets up to 57 MPG

Guidelines:
- Be conversational, friendly, and helpful
- Provide accurate information about Toyota vehicles
- Ask follow-up questions to understand customer needs
- If asked about pricing, provide approximate starting prices
- If asked about features, mention standard and available features
- If asked about test drives, mention they can visit the dealership or call
- Keep responses concise but informative
- Use bullet points for lists when helpful
- If you don't know something specific, acknowledge it and offer to help find the information`;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function generateChatResponse(
  messages: ChatMessage[]
): Promise<string> {
  const API_KEY = getApiKey();
  const genAI = getGenAI();
  
  console.log("🔍 API Key check:");
  console.log("  - API Key present:", !!API_KEY);
  console.log("  - API Key length:", API_KEY?.length || 0);
  console.log("  - API Key first 10 chars:", API_KEY?.substring(0, 10) || "N/A");
  console.log("  - Full env check:", import.meta.env.VITE_GEMINI_API_KEY?.substring(0, 10) || "N/A");
  
  if (!genAI || !API_KEY) {
    const errorMsg = "VITE_GEMINI_API_KEY is not set or invalid. Please check your .env file and restart the dev server.";
    console.error("❌", errorMsg);
    throw new Error(errorMsg);
  }

  try {
    console.log("🚀 Calling Gemini API with", messages.length, "messages");
    
    let model;
    let useSystemInstruction = true;
    
    try {
      model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest",
        systemInstruction: SYSTEM_PROMPT,
      });
      console.log("✅ Using gemini-flash-latest model with system instruction");
    } catch (error: any) {
      console.log("⚠️ gemini-flash-latest with system instruction failed:", error?.message);
      model = genAI.getGenerativeModel({ 
        model: "gemini-flash-latest",
      });
      useSystemInstruction = false;
      console.log("✅ Using gemini-flash-latest model (will include system prompt in messages)");
    }

    const messagesToProcess = messages.filter((msg, index) => {
      if (index === 0 && msg.role === "assistant") {
        return false;
      }
      return true;
    });
    
    let currentMessage = messagesToProcess[messagesToProcess.length - 1]?.content || "";
    
    if (!useSystemInstruction && messagesToProcess.length === 1) {
      currentMessage = `${SYSTEM_PROMPT}\n\nUser: ${currentMessage}`;
      console.log("📝 Prepend system prompt to first message");
    }
    
    const chatHistory: Array<{role: string, parts: Array<{text: string}>}> = [];
    
    for (let i = 0; i < messagesToProcess.length - 1; i++) {
      const msg = messagesToProcess[i];
      const role = msg.role === "user" ? "user" : "model";
      
      if (chatHistory.length === 0 && role !== "user") {
        console.warn("Skipping message that would make history start with non-user role:", role);
        continue;
      }
      
      chatHistory.push({
        role: role,
        parts: [{ text: msg.content }],
      });
    }

    console.log("Sending message to Gemini:", currentMessage.substring(0, 50) + "...");
    console.log("Chat history length:", chatHistory.length);
    if (chatHistory.length > 0) {
      console.log("Chat history roles:", chatHistory.map(h => h.role));
      console.log("First history role:", chatHistory[0]?.role);
    }

    const chat = model.startChat({
      history: chatHistory.length > 0 ? chatHistory : undefined,
    });

    const result = await chat.sendMessage(currentMessage);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Received response from Gemini:", text?.substring(0, 100) + "...");

    if (!text || text.trim().length === 0) {
      console.warn("Empty response from Gemini, using fallback");
      return getFallbackResponse(currentMessage);
    }

    return text;
  } catch (error: any) {
    console.error("❌ Error calling Gemini API:", error);
    console.error("Error details:", {
      message: error?.message,
      status: error?.status,
      statusText: error?.statusText,
      code: error?.code,
      stack: error?.stack?.substring(0, 500),
    });
    
    if (error?.message?.includes("API_KEY") || error?.message?.includes("401") || error?.message?.includes("403")) {
      const errorMsg = "API key may be invalid or expired. Please check your API key in Google AI Studio.";
      console.error("⚠️", errorMsg);
      throw new Error(errorMsg);
    }
    
    throw new Error(`Gemini API error: ${error?.message || "Unknown error"}`);
  }
}

function getFallbackResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.includes("tall") || message.includes("height") || message.includes("headroom")) {
    if (message.includes("sedan")) {
      return "For taller drivers looking for a sedan, I highly recommend the Camry! It offers 38.0 inches of headroom (best in class for sedans) and 42.1 inches of legroom. The Camry provides the best combination of space, comfort, and features for taller individuals. Would you like to learn more about the Camry?";
    }
    return "For taller drivers, I'd recommend the Camry Sedan (38.0\" headroom) or the RAV4 SUV (37.5\" headroom with higher seating). Which type of vehicle are you most interested in?";
  }

  if (message.includes("camry")) {
    return "The Camry is an excellent choice! It's one of our most popular sedans, offering excellent fuel economy (52 MPG in Hybrid), spacious interior perfect for taller drivers, and advanced safety features. Would you like details on specific trims, pricing, or features?";
  }

  if (message.includes("price") || message.includes("cost")) {
    return "Our Toyota vehicles range from affordable entry-level models to premium options. The Corolla starts around $22,000, the Camry starts at $26,420, and the RAV4 Hybrid begins at $31,000. Would you like me to help you find a vehicle within your budget?";
  }

  if (message.includes("sedan")) {
    return "Our sedan lineup features the reliable Corolla, the spacious Camry, and the eco-friendly Prius. The Camry Hybrid offers great fuel economy at 52 MPG, while the Corolla is perfect for city driving. Which one interests you?";
  }

  return "That's a great question! I can help you with information about Toyota vehicles, pricing, features, fuel economy, safety, and more. What specific information are you looking for?";
}

