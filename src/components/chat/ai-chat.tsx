"use client";

import { useState, useRef, useEffect } from "react";
import { CornerDownLeft, Loader2, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { aiChatAssistance } from "@/ai/flows/ai-chat-assistance";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const altitudeAceLogo = PlaceHolderImages.find(img => img.id === 'altitude-ace-logo');

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: input,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await aiChatAssistance({ query: input });
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        text: result.response,
        isUser: false,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isUser: false,
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("AI chat assistance error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
          style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
        >
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Open AI Chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>AI Flight Assistant</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-[60vh]">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-3",
                    message.isUser ? "justify-end" : "justify-start"
                  )}
                >
                  {!message.isUser && (
                    <Avatar className="h-8 w-8">
                       {altitudeAceLogo && <AvatarImage src={altitudeAceLogo.imageUrl} alt="AI" data-ai-hint={altitudeAceLogo.imageHint} />}
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-xs rounded-lg px-3 py-2 text-sm",
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.text}
                  </div>
                   {message.isUser && (
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><User size={16}/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-3 justify-start">
                   <Avatar className="h-8 w-8">
                      {altitudeAceLogo && <AvatarImage src={altitudeAceLogo.imageUrl} alt="AI" data-ai-hint={altitudeAceLogo.imageHint} />}
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                  <div className="bg-muted rounded-lg px-3 py-2">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="relative">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about flights, dates, and more..."
                className="pr-12"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                disabled={isLoading || !input.trim()}
              >
                <CornerDownLeft className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
