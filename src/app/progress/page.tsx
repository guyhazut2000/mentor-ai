"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Target,
  Brain,
  Calendar,
  Clock,
  Star,
  Award,
  Users,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Zap,
  Lightbulb,
  CheckCircle,
  XCircle,
  Minus,
} from "lucide-react";

interface ProgressData {
  totalHours: number;
  weeklyHours: number;
  monthlyHours: number;
  streakDays: number;
  completedGoals: number;
  activeGoals: number;
  skillsLearned: number;
  averageScore: number;
}

interface WeeklyData {
  week: string;
  hours: number;
  goals: number;
  quizzes: number;
  score: number;
}

interface SkillProgress {
  skill: string;
  category: string;
  progress: number;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  hoursSpent: number;
  lastPracticed: Date;
}

interface AIInsight {
  id: string;
  type: "improvement" | "achievement" | "suggestion" | "warning";
  title: string;
  description: string;
  action?: string;
  priority: "low" | "medium" | "high";
}

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressData>({
    totalHours: 156,
    weeklyHours: 12,
    monthlyHours: 48,
    streakDays: 7,
    completedGoals: 8,
    activeGoals: 5,
    skillsLearned: 15,
    averageScore: 87,
  });

  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([
    { week: "Week 1", hours: 8, goals: 2, quizzes: 3, score: 85 },
    { week: "Week 2", hours: 12, goals: 3, quizzes: 5, score: 88 },
    { week: "Week 3", hours: 10, goals: 1, quizzes: 4, score: 92 },
    { week: "Week 4", hours: 15, goals: 4, quizzes: 6, score: 90 },
    { week: "Week 5", hours: 11, goals: 2, quizzes: 3, score: 87 },
    { week: "Week 6", hours: 14, goals: 3, quizzes: 5, score: 89 },
    { week: "Week 7", hours: 12, goals: 2, quizzes: 4, score: 91 },
  ]);

  const [skills, setSkills] = useState<SkillProgress[]>([
    {
      skill: "JavaScript",
      category: "Programming",
      progress: 85,
      level: "intermediate",
      hoursSpent: 45,
      lastPracticed: new Date("2024-01-15"),
    },
    {
      skill: "React",
      category: "Frontend",
      progress: 72,
      level: "intermediate",
      hoursSpent: 32,
      lastPracticed: new Date("2024-01-17"),
    },
    {
      skill: "Docker",
      category: "DevOps",
      progress: 65,
      level: "beginner",
      hoursSpent: 18,
      lastPracticed: new Date("2024-01-16"),
    },
    {
      skill: "Time Management",
      category: "Productivity",
      progress: 78,
      level: "intermediate",
      hoursSpent: 25,
      lastPracticed: new Date("2024-01-18"),
    },
    {
      skill: "System Design",
      category: "Architecture",
      progress: 45,
      level: "beginner",
      hoursSpent: 12,
      lastPracticed: new Date("2024-01-14"),
    },
  ]);

  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      id: "1",
      type: "achievement",
      title: "Great Progress on JavaScript!",
      description:
        "You've improved your JavaScript skills by 15% this week. Keep up the excellent work!",
      priority: "medium",
    },
    {
      id: "2",
      type: "suggestion",
      title: "Time to Practice Docker",
      description:
        "You haven't practiced Docker in 2 days. Consider spending 30 minutes today to maintain momentum.",
      action: "Start Docker Practice",
      priority: "high",
    },
    {
      id: "3",
      type: "improvement",
      title: "React Quiz Performance",
      description:
        "Your React quiz scores have been improving consistently. You're ready for more advanced concepts.",
      priority: "low",
    },
    {
      id: "4",
      type: "warning",
      title: "Learning Streak at Risk",
      description:
        "You're close to breaking your 7-day learning streak. Try to complete at least one lesson today.",
      action: "Continue Learning",
      priority: "high",
    },
  ]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "achievement":
        return <Award className="h-5 w-5 text-green-500" />;
      case "suggestion":
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      case "improvement":
        return <TrendingUp className="h-5 w-5 text-purple-500" />;
      case "warning":
        return <Zap className="h-5 w-5 text-yellow-500" />;
      default:
        return <Brain className="h-5 w-5 text-gray-500" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case "achievement":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20";
      case "suggestion":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20";
      case "improvement":
        return "border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/20";
      case "warning":
        return "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/20";
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/20";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "expert":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
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
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Progress Analytics</h1>
                    <p className="text-muted-foreground">
                      Track your learning journey with AI-powered insights
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Total Hours</p>
                          <p className="text-2xl font-bold">
                            {progressData.totalHours}h
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
                          <p className="text-sm font-medium">Learning Streak</p>
                          <p className="text-2xl font-bold">
                            {progressData.streakDays} days
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
                          <p className="text-sm font-medium">Completed Goals</p>
                          <p className="text-2xl font-bold">
                            {progressData.completedGoals}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium">Avg Score</p>
                          <p className="text-2xl font-bold">
                            {progressData.averageScore}%
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="skills">Skills</TabsTrigger>
                    <TabsTrigger value="insights">AI Insights</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Weekly Progress Chart */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Weekly Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {weeklyData.map((week, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between"
                              >
                                <span className="text-sm font-medium">
                                  {week.week}
                                </span>
                                <div className="flex items-center gap-4">
                                  <span className="text-xs text-muted-foreground">
                                    {week.hours}h
                                  </span>
                                  <div className="w-24 bg-gray-200 rounded-full h-2">
                                    <div
                                      className="bg-blue-500 h-2 rounded-full"
                                      style={{
                                        width: `${(week.hours / 20) * 100}%`,
                                      }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Recent Activity */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Recent Activity
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  Completed JavaScript Quiz
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  2 hours ago • Score: 92%
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  Started React Tutorial
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  1 day ago • 45 minutes
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">
                                  Updated Docker Goal
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  2 days ago • Progress: 65%
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-4">
                    <div className="grid gap-4">
                      {skills.map((skill) => (
                        <Card key={skill.skill}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-lg">
                                  {skill.skill}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {skill.category}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getLevelColor(skill.level)}>
                                  {skill.level}
                                </Badge>
                                <Badge variant="secondary">
                                  {skill.progress}%
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                  <span>Progress</span>
                                  <span>{skill.progress}%</span>
                                </div>
                                <Progress
                                  value={skill.progress}
                                  className="h-2"
                                />
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span>Hours spent: {skill.hoursSpent}h</span>
                                <span>
                                  Last practiced:{" "}
                                  {skill.lastPracticed.toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="insights" className="space-y-4">
                    <div className="grid gap-4">
                      {aiInsights.map((insight) => (
                        <Card
                          key={insight.id}
                          className={`border ${getInsightColor(insight.type)}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              {getInsightIcon(insight.type)}
                              <div className="flex-1">
                                <h3 className="font-semibold mb-1">
                                  {insight.title}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {insight.description}
                                </p>
                                {insight.action && (
                                  <Button size="sm" variant="outline">
                                    {insight.action}
                                  </Button>
                                )}
                              </div>
                              <Badge
                                variant={
                                  insight.priority === "high"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {insight.priority}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Performance Trends */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <LineChart className="h-5 w-5" />
                            Performance Trends
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Quiz Scores</span>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-green-500">
                                  +12%
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Learning Hours</span>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-blue-500" />
                                <span className="text-sm text-blue-500">
                                  +8%
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Goal Completion</span>
                              <div className="flex items-center gap-1">
                                <TrendingUp className="h-4 w-4 text-purple-500" />
                                <span className="text-sm text-purple-500">
                                  +15%
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Learning Distribution */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5" />
                            Learning Distribution
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Coding</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-500 h-2 rounded-full"
                                    style={{ width: "60%" }}
                                  ></div>
                                </div>
                                <span className="text-sm">60%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Productivity</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: "25%" }}
                                  ></div>
                                </div>
                                <span className="text-sm">25%</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Mindset</span>
                              <div className="flex items-center gap-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-purple-500 h-2 rounded-full"
                                    style={{ width: "15%" }}
                                  ></div>
                                </div>
                                <span className="text-sm">15%</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
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
