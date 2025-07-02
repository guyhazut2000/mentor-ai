"use client";

import { useState, useRef, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  Mic,
  MicOff,
  Camera,
  FileText,
  Target,
  Brain,
  Sparkles,
  CheckCircle,
  Clock,
  TrendingUp,
  Plus,
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  type: "text" | "goal" | "reflection" | "feedback";
  metadata?: {
    goalId?: string;
    codeSnippet?: string;
    topic?: string;
    difficulty?: "easy" | "medium" | "hard";
  };
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: "coding" | "productivity" | "mindset" | "habits";
  targetDate: Date;
  progress: number;
  status: "active" | "completed" | "paused";
  dailyCheckins: Array<{
    date: Date;
    completed: boolean;
    notes: string;
  }>;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your AI mentor. I'm here to help you with coding, productivity, mindset, and habits. What would you like to work on today?",
      role: "assistant",
      timestamp: new Date(),
      type: "text",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Learn Docker",
      description: "Master containerization and deployment",
      category: "coding",
      targetDate: new Date("2024-02-15"),
      progress: 65,
      status: "active",
      dailyCheckins: [],
    },
    {
      id: "2",
      title: "Wake up at 6 AM",
      description: "Establish a consistent morning routine",
      category: "habits",
      targetDate: new Date("2024-01-30"),
      progress: 40,
      status: "active",
      dailyCheckins: [],
    },
  ]);
  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        role: "assistant",
        timestamp: new Date(),
        type: "text",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "That's a great question! Let me help you with that. Can you tell me more about your current understanding?",
      "I see you're working on this. Here's what I suggest: break it down into smaller steps and practice regularly.",
      "Excellent progress! Based on what you've shared, I'd recommend focusing on these key areas...",
      "This is a common challenge. Let me share some strategies that have worked for others...",
      "I'm impressed by your approach! Here are some additional resources that might help...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleGoalCheckin = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return;

    const checkinMessage: Message = {
      id: Date.now().toString(),
      content: `Let's check in on your goal: "${goal.title}". How did you progress today?`,
      role: "assistant",
      timestamp: new Date(),
      type: "goal",
      metadata: { goalId },
    };

    setMessages((prev) => [...prev, checkinMessage]);
    setActiveGoal(goal);
  };

  const handleDailyReflection = () => {
    const reflectionMessage: Message = {
      id: Date.now().toString(),
      content:
        "Time for your daily reflection! What did you learn today? What challenges did you face? How did you overcome them?",
      role: "assistant",
      timestamp: new Date(),
      type: "reflection",
    };

    setMessages((prev) => [...prev, reflectionMessage]);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex h-screen flex-col">
          {/* Header */}
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Brain className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">AI Chat Mentor</h1>
                  <p className="text-xs text-muted-foreground">
                    Your personalized learning companion
                  </p>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDailyReflection}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Daily Reflection
                </Button>
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Goals
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex">
            {/* Main Chat */}
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatars/ai-mentor.jpg" />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}

                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium">
                            {message.role === "user" ? "You" : "AI Mentor"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.type !== "text" && (
                            <Badge variant="secondary" className="text-xs">
                              {message.type}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>

                      {message.role === "user" && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="/avatars/user.jpg" />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex gap-3 justify-start">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div
                              className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            AI is thinking...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="border-t bg-background p-4">
                <div className="max-w-4xl mx-auto flex gap-2">
                  <div className="flex-1 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? (
                        <MicOff className="h-4 w-4" />
                      ) : (
                        <Mic className="h-4 w-4" />
                      )}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Camera className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>

                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Ask your AI mentor anything..."
                    className="flex-1"
                  />

                  <Button onClick={handleSendMessage} disabled={isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Goals Sidebar */}
            <div className="w-80 border-l bg-muted/30 p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  <h3 className="font-semibold">Your Goals</h3>
                </div>

                {goals.map((goal) => (
                  <Card
                    key={goal.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{goal.title}</CardTitle>
                        <Badge
                          variant={
                            goal.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {goal.progress}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground mb-2">
                        {goal.description}
                      </p>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          Due: {goal.targetDate.toLocaleDateString()}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleGoalCheckin(goal.id)}
                        >
                          Check-in
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Button className="w-full" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Goal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
