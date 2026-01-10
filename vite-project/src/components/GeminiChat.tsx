import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion, AnimatePresence } from "framer-motion";


const VITE_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 


interface Message {
  role: 'user' | 'model';
  text: string;
}

export function GeminiChat() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: "Namaskar! 🙏 I am your AI guide to Kolkata. Ask me about the city's history, best food spots, or hidden gems!",
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Auto-scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Add User Message
    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input; // Store for API call
    setInput("");
    setIsLoading(true);

    try {
      // 2. Call Gemini API
      const genAI = new GoogleGenerativeAI(VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const prompt = `
        You are an expert tour guide for Kolkata, West Bengal. 
        Your tone is warm, welcoming, and nostalgic (using terms like 'City of Joy').
        Only answer questions related to Kolkata, its history, culture, food, and tourism.
        If asked about other topics, politely redirect the conversation to Kolkata.
        Keep answers concise (under 100 words) unless asked for a detailed history.
        
        User Question: ${currentInput}
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // 3. Add AI Response
      setMessages((prev) => [...prev, { role: "model", text }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Sorry, I encountered a temporary error. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 pointer-events-auto"
          >
            <Card className="w-[350px] h-[500px] shadow-2xl border-amber-200 flex flex-col bg-white">
              <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-xl p-4 flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                    <CardTitle className="text-lg">Kolkata AI Guide</CardTitle>
                </div>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="text-white hover:bg-white/20 h-8 w-8"
                    onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-amber-50/30">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-amber-600 text-white rounded-br-none"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                        <span className="text-xs text-gray-500">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="p-3 bg-white border-t flex gap-2">
                <Input
                  placeholder="Ask about Victoria Memorial..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="focus-visible:ring-amber-500"
                />
                <Button 
                    onClick={handleSend} 
                    disabled={isLoading || !input}
                    size="icon"
                    className="bg-amber-600 hover:bg-amber-700 text-white shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="h-14 w-14 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xl flex items-center justify-center pointer-events-auto border-4 border-white"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}