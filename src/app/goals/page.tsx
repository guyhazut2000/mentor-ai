"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  Plus,
  Calendar as CalendarIcon,
  TrendingUp,
  CheckCircle,
  Clock,
  Brain,
  Star,
  BarChart3,
  Trophy,
  Edit,
  Trash2,
  Eye,
  MessageCircle,
} from "lucide-react";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: "coding" | "productivity" | "mindset" | "habits";
  targetDate: Date;
  progress: number;
  status: "active" | "completed" | "paused";
  priority: "low" | "medium" | "high";
  dailyCheckins: Array<{
    date: Date;
    completed: boolean;
    notes: string;
    mood: "great" | "good" | "okay" | "bad";
  }>;
  milestones: Array<{
    id: string;
    title: string;
    completed: boolean;
    dueDate: Date;
  }>;
  aiSuggestions: Array<{
    id: string;
    suggestion: string;
    type: "tip" | "resource" | "challenge" | "motivation";
    timestamp: Date;
  }>;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Learn Docker",
      description:
        "Master containerization and deployment to improve my development workflow",
      category: "coding",
      targetDate: new Date("2024-02-15"),
      progress: 65,
      status: "active",
      priority: "high",
      dailyCheckins: [
        {
          date: new Date("2024-01-15"),
          completed: true,
          notes: "Read Docker basics documentation",
          mood: "good",
        },
        {
          date: new Date("2024-01-16"),
          completed: true,
          notes: "Created first container",
          mood: "great",
        },
        {
          date: new Date("2024-01-17"),
          completed: false,
          notes: "",
          mood: "okay",
        },
      ],
      milestones: [
        {
          id: "1",
          title: "Understand Docker basics",
          completed: true,
          dueDate: new Date("2024-01-20"),
        },
        {
          id: "2",
          title: "Create first container",
          completed: true,
          dueDate: new Date("2024-01-25"),
        },
        {
          id: "3",
          title: "Deploy application with Docker",
          completed: false,
          dueDate: new Date("2024-02-05"),
        },
        {
          id: "4",
          title: "Master Docker Compose",
          completed: false,
          dueDate: new Date("2024-02-15"),
        },
      ],
      aiSuggestions: [
        {
          id: "1",
          suggestion: "Try building a simple Node.js app container today",
          type: "challenge",
          timestamp: new Date(),
        },
        {
          id: "2",
          suggestion: "Watch this Docker tutorial: https://example.com",
          type: "resource",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "2",
      title: "Wake up at 6 AM",
      description:
        "Establish a consistent morning routine for better productivity",
      category: "habits",
      targetDate: new Date("2024-01-30"),
      progress: 40,
      status: "active",
      priority: "medium",
      dailyCheckins: [
        {
          date: new Date("2024-01-15"),
          completed: true,
          notes: "Woke up at 6:15 AM",
          mood: "good",
        },
        {
          date: new Date("2024-01-16"),
          completed: false,
          notes: "Slept in until 7:30",
          mood: "bad",
        },
        {
          date: new Date("2024-01-17"),
          completed: true,
          notes: "Woke up at 6:00 AM sharp!",
          mood: "great",
        },
      ],
      milestones: [
        {
          id: "1",
          title: "Wake up before 7 AM for 3 days",
          completed: true,
          dueDate: new Date("2024-01-20"),
        },
        {
          id: "2",
          title: "Wake up at 6 AM for 1 week",
          completed: false,
          dueDate: new Date("2024-01-27"),
        },
        {
          id: "3",
          title: "Establish morning routine",
          completed: false,
          dueDate: new Date("2024-01-30"),
        },
      ],
      aiSuggestions: [
        {
          id: "1",
          suggestion:
            "Try placing your phone across the room to force you to get up",
          type: "tip",
          timestamp: new Date(),
        },
        {
          id: "2",
          suggestion: "You're doing great! Keep up the consistency",
          type: "motivation",
          timestamp: new Date(),
        },
      ],
    },
    {
      id: "3",
      title: "Learn React Hooks",
      description: "Master React Hooks for modern functional components",
      category: "coding",
      targetDate: new Date("2024-03-01"),
      progress: 25,
      status: "active",
      priority: "high",
      dailyCheckins: [],
      milestones: [
        {
          id: "1",
          title: "Understand useState",
          completed: true,
          dueDate: new Date("2024-01-25"),
        },
        {
          id: "2",
          title: "Master useEffect",
          completed: false,
          dueDate: new Date("2024-02-10"),
        },
        {
          id: "3",
          title: "Build app with custom hooks",
          completed: false,
          dueDate: new Date("2024-02-25"),
        },
      ],
      aiSuggestions: [],
    },
  ]);

  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "coding":
        return "💻";
      case "productivity":
        return "⚡";
      case "mindset":
        return "🧠";
      case "habits":
        return "🔄";
      default:
        return "🎯";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "great":
        return "text-green-500";
      case "good":
        return "text-blue-500";
      case "okay":
        return "text-yellow-500";
      case "bad":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleGoalCheckin = (
    goalId: string,
    completed: boolean,
    notes: string,
    mood: string
  ) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const newCheckin = {
            date: new Date(),
            completed,
            notes,
            mood: mood as any,
          };
          return {
            ...goal,
            dailyCheckins: [...goal.dailyCheckins, newCheckin],
            progress: completed
              ? Math.min(goal.progress + 5, 100)
              : goal.progress,
          };
        }
        return goal;
      })
    );
  };

  const handleMilestoneToggle = (goalId: string, milestoneId: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            milestones: goal.milestones.map((milestone) =>
              milestone.id === milestoneId
                ? { ...milestone, completed: !milestone.completed }
                : milestone
            ),
          };
        }
        return goal;
      })
    );
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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Header */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold">Goal Tracking</h1>
                    <p className="text-muted-foreground">
                      Track your progress and get AI-powered insights
                    </p>
                  </div>
                  <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Goal
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Goal</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <label htmlFor="title">Goal Title</label>
                          <Input id="title" placeholder="e.g., Learn Docker" />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="description">Description</label>
                          <Textarea
                            id="description"
                            placeholder="Describe your goal..."
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <label htmlFor="category">Category</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="coding">Coding</SelectItem>
                                <SelectItem value="productivity">
                                  Productivity
                                </SelectItem>
                                <SelectItem value="mindset">Mindset</SelectItem>
                                <SelectItem value="habits">Habits</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <label htmlFor="priority">Priority</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="targetDate">Target Date</label>
                          <Input id="targetDate" type="date" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsAddGoalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => setIsAddGoalOpen(false)}>
                          Create Goal
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Active Goals</p>
                          <p className="text-2xl font-bold">
                            {goals.filter((g) => g.status === "active").length}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Completed</p>
                          <p className="text-2xl font-bold">
                            {
                              goals.filter((g) => g.status === "completed")
                                .length
                            }
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium">Avg Progress</p>
                          <p className="text-2xl font-bold">
                            {Math.round(
                              goals.reduce(
                                (acc, goal) => acc + goal.progress,
                                0
                              ) / goals.length
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">Streak</p>
                          <p className="text-2xl font-bold">7 days</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Goals List */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="all" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="all">All Goals</TabsTrigger>
                    <TabsTrigger value="coding">Coding</TabsTrigger>
                    <TabsTrigger value="productivity">Productivity</TabsTrigger>
                    <TabsTrigger value="mindset">Mindset</TabsTrigger>
                    <TabsTrigger value="habits">Habits</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="space-y-4">
                    <div className="grid gap-4">
                      {goals.map((goal) => (
                        <Card
                          key={goal.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                  {getCategoryIcon(goal.category)}
                                </span>
                                <div>
                                  <CardTitle className="text-lg">
                                    {goal.title}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {goal.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  className={getPriorityColor(goal.priority)}
                                >
                                  {goal.priority}
                                </Badge>
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
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                  <span>Progress</span>
                                  <span>{goal.progress}%</span>
                                </div>
                                <Progress
                                  value={goal.progress}
                                  className="h-2"
                                />
                              </div>

                              <div className="flex items-center justify-between text-sm">
                                <span>
                                  Target: {goal.targetDate.toLocaleDateString()}
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setSelectedGoal(goal)}
                                  >
                                    <Eye className="h-4 w-4 mr-1" />
                                    View Details
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <MessageCircle className="h-4 w-4 mr-1" />
                                    AI Check-in
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
