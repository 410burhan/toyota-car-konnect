import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { generateChatResponse, type ChatMessage } from "@/services/geminiService";

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi! I'm ToyoBot, your AI car advisor. How can I help you find the perfect Toyota today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("🔑 API Key loaded:", !!apiKey);
    console.log("🔑 API Key length:", apiKey?.length || 0);
    if (!apiKey) {
      console.warn("⚠️ VITE_GEMINI_API_KEY is not set in environment variables");
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setError(null);
    
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    
    try {
      const currentMessages: ChatMessage[] = [
        ...messages,
        { role: "user", content: userMessage },
      ];
      
      console.log("📤 Sending to Gemini service...");
      
      const response = await generateChatResponse(currentMessages);
      
      console.log("✅ Successfully received response from Gemini API");
      console.log("📥 Response preview:", response.substring(0, 100) + "...");
      
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);
    } catch (err: any) {
      console.error("❌ Error in handleSend:", err);
      const errorMsg = err?.message || "Unknown error";
      setError(errorMsg);
      
      let userMessage = "I'm having trouble connecting to the AI service. ";
      if (errorMsg.includes("API key")) {
        userMessage += "Please check that your API key is set correctly in the .env file and restart the server.";
      } else if (errorMsg.includes("invalid") || errorMsg.includes("expired")) {
        userMessage += "The API key may be invalid. Please check your Google AI Studio account.";
      } else {
        userMessage += "Please check the browser console for details and try again.";
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: userMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          size="lg"
          className="fixed bottom-6 right-6 rounded-full shadow-red h-16 w-16 z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-lg z-50">
          <div className="bg-gradient-hero p-4 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-full">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">ToyoBot</h3>
                <p className="text-xs text-white/80">AI Car Advisor</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <div className="text-sm whitespace-pre-line">{message.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-secondary text-secondary-foreground">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about cars, features, pricing..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSend()}
                disabled={isLoading}
              />
              <Button size="icon" onClick={handleSend} disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-xs text-muted-foreground text-center">
                Powered by AI • Real-time assistance
              </p>
              {!import.meta.env.VITE_GEMINI_API_KEY && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400 text-center">
                  ⚠️ API key not set - using fallback responses
                </p>
              )}
              {error && (
                <p className="text-xs text-red-600 dark:text-red-400 text-center">
                  {error}
                </p>
              )}
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
