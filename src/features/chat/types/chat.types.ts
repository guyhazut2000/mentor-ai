export interface Message {
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

export interface Goal {
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
