"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Target,
  Brain,
  Play,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Video,
  FileText,
  Code,
  Lightbulb,
  Award,
  Users,
  Calendar,
} from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: "coding" | "productivity" | "mindset" | "habits";
  difficulty: "beginner" | "intermediate" | "advanced";
  progress: number;
  totalLessons: number;
  completedLessons: number;
  estimatedHours: number;
  skills: string[];
  prerequisites: string[];
  nextSteps: string[];
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  type: "video" | "reading" | "exercise" | "quiz" | "project";
  duration: number;
  completed: boolean;
  score?: number;
  resources: Array<{
    title: string;
    url: string;
    type: "video" | "article" | "documentation" | "exercise";
  }>;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
  completed: boolean;
  score?: number;
  maxScore: number;
}

export default function LearningPage() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: "1",
      title: "JavaScript Fundamentals",
      description: "Master the basics of JavaScript programming",
      category: "coding",
      difficulty: "beginner",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      estimatedHours: 20,
      skills: [
        "Variables",
        "Functions",
        "Objects",
        "Arrays",
        "DOM Manipulation",
      ],
      prerequisites: ["Basic HTML", "Basic CSS"],
      nextSteps: ["React Basics", "Node.js Fundamentals"],
    },
    {
      id: "2",
      title: "React Development",
      description: "Build modern web applications with React",
      category: "coding",
      difficulty: "intermediate",
      progress: 45,
      totalLessons: 15,
      completedLessons: 7,
      estimatedHours: 30,
      skills: [
        "Components",
        "Hooks",
        "State Management",
        "Routing",
        "API Integration",
      ],
      prerequisites: ["JavaScript Fundamentals", "ES6+ Features"],
      nextSteps: ["Advanced React Patterns", "Full-Stack Development"],
    },
    {
      id: "3",
      title: "Productivity Mastery",
      description: "Optimize your workflow and time management",
      category: "productivity",
      difficulty: "beginner",
      progress: 60,
      totalLessons: 8,
      completedLessons: 5,
      estimatedHours: 15,
      skills: [
        "Time Management",
        "Task Prioritization",
        "Workflow Optimization",
        "Focus Techniques",
      ],
      prerequisites: [],
      nextSteps: ["Advanced Productivity", "Team Leadership"],
    },
  ]);

  const [currentPath, setCurrentPath] = useState<LearningPath | null>(
    learningPaths[0]
  );
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: "1",
      title: "Introduction to JavaScript",
      description: "Learn the basics of JavaScript programming language",
      type: "video",
      duration: 45,
      completed: true,
      score: 95,
      resources: [
        {
          title: "JavaScript Basics Video",
          url: "https://example.com/video1",
          type: "video",
        },
        {
          title: "MDN JavaScript Guide",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          type: "documentation",
        },
        {
          title: "Practice Exercises",
          url: "https://example.com/exercises1",
          type: "exercise",
        },
      ],
    },
    {
      id: "2",
      title: "Variables and Data Types",
      description:
        "Understanding variables, constants, and different data types",
      type: "reading",
      duration: 30,
      completed: true,
      score: 88,
      resources: [
        {
          title: "Variables Tutorial",
          url: "https://example.com/tutorial2",
          type: "article",
        },
        {
          title: "Interactive Code Playground",
          url: "https://example.com/playground2",
          type: "exercise",
        },
      ],
    },
    {
      id: "3",
      title: "Functions and Scope",
      description:
        "Master function declarations, expressions, and scope concepts",
      type: "exercise",
      duration: 60,
      completed: false,
      resources: [
        {
          title: "Functions Deep Dive",
          url: "https://example.com/video3",
          type: "video",
        },
        {
          title: "Scope and Closures",
          url: "https://example.com/article3",
          type: "article",
        },
        {
          title: "Function Practice",
          url: "https://example.com/exercises3",
          type: "exercise",
        },
      ],
    },
  ]);

  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "1",
      title: "JavaScript Basics Quiz",
      description: "Test your knowledge of JavaScript fundamentals",
      questions: [
        {
          id: "1",
          question:
            "What is the correct way to declare a variable in JavaScript?",
          options: [
            "var x = 5;",
            "variable x = 5;",
            "v x = 5;",
            "declare x = 5;",
          ],
          correctAnswer: 0,
          explanation:
            "The correct way to declare a variable in JavaScript is using var, let, or const keywords.",
        },
        {
          id: "2",
          question:
            "Which method is used to add an element to the end of an array?",
          options: ["push()", "pop()", "shift()", "unshift()"],
          correctAnswer: 0,
          explanation:
            "The push() method adds one or more elements to the end of an array.",
        },
      ],
      completed: true,
      score: 85,
      maxScore: 100,
    },
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "reading":
        return <FileText className="h-4 w-4" />;
      case "exercise":
        return <Code className="h-4 w-4" />;
      case "quiz":
        return <Brain className="h-4 w-4" />;
      case "project":
        return <Target className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  const getLessonTypeColor = (type: string) => {
    switch (type) {
      case "video":
        return "text-blue-500";
      case "reading":
        return "text-green-500";
      case "exercise":
        return "text-purple-500";
      case "quiz":
        return "text-orange-500";
      case "project":
        return "text-red-500";
      default:
        return "text-gray-500";
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
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Learning Paths</h1>
                    <p className="text-muted-foreground">
                      Personalized learning journeys powered by AI
                    </p>
                  </div>
                </div>
              </div>

              {/* Learning Stats */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-medium">Active Paths</p>
                          <p className="text-2xl font-bold">
                            {
                              learningPaths.filter((p) => p.progress < 100)
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
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Completed</p>
                          <p className="text-2xl font-bold">
                            {
                              learningPaths.filter((p) => p.progress === 100)
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
                        <Clock className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="text-sm font-medium">Hours Learned</p>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">Skills Mastered</p>
                          <p className="text-2xl font-bold">12</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Learning Paths */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="paths" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="paths">Learning Paths</TabsTrigger>
                    <TabsTrigger value="lessons">Current Lessons</TabsTrigger>
                    <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
                    <TabsTrigger value="resources">Resources</TabsTrigger>
                  </TabsList>

                  <TabsContent value="paths" className="space-y-4">
                    <div className="grid gap-4">
                      {learningPaths.map((path) => (
                        <Card
                          key={path.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                  <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <CardTitle className="text-xl">
                                    {path.title}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {path.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  className={getDifficultyColor(
                                    path.difficulty
                                  )}
                                >
                                  {path.difficulty}
                                </Badge>
                                <Badge variant="secondary">
                                  {path.progress}%
                                </Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <div className="flex items-center justify-between text-sm mb-2">
                                  <span>Progress</span>
                                  <span>
                                    {path.completedLessons}/{path.totalLessons}{" "}
                                    lessons
                                  </span>
                                </div>
                                <Progress
                                  value={path.progress}
                                  className="h-2"
                                />
                              </div>

                              <div className="flex items-center justify-between text-sm">
                                <span>
                                  Estimated time: {path.estimatedHours}h
                                </span>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setCurrentPath(path)}
                                  >
                                    <Play className="h-4 w-4 mr-1" />
                                    Continue
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Lightbulb className="h-4 w-4 mr-1" />
                                    AI Tips
                                  </Button>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {path.skills.slice(0, 3).map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                                {path.skills.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{path.skills.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="lessons" className="space-y-4">
                    <div className="grid gap-4">
                      {lessons.map((lesson) => (
                        <Card
                          key={lesson.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`h-10 w-10 rounded-lg flex items-center justify-center ${getLessonTypeColor(
                                    lesson.type
                                  )}`}
                                >
                                  {getLessonTypeIcon(lesson.type)}
                                </div>
                                <div>
                                  <CardTitle className="text-lg">
                                    {lesson.title}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {lesson.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {lesson.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <Clock className="h-5 w-5 text-gray-400" />
                                )}
                                <span className="text-sm text-muted-foreground">
                                  {lesson.duration}min
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                {lesson.resources.map((resource, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {resource.type}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Play className="h-4 w-4 mr-1" />
                                  Start
                                </Button>
                                {lesson.score && (
                                  <Badge variant="secondary">
                                    {lesson.score}%
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="quizzes" className="space-y-4">
                    <div className="grid gap-4">
                      {quizzes.map((quiz) => (
                        <Card
                          key={quiz.id}
                          className="cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                                  <Brain className="h-5 w-5 text-orange-500" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">
                                    {quiz.title}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {quiz.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {quiz.completed ? (
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                ) : (
                                  <Clock className="h-5 w-5 text-gray-400" />
                                )}
                                <span className="text-sm text-muted-foreground">
                                  {quiz.questions.length} questions
                                </span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <Badge variant="outline" className="text-xs">
                                  {quiz.questions.length} Questions
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  Multiple Choice
                                </Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Play className="h-4 w-4 mr-1" />
                                  {quiz.completed ? "Retake" : "Start Quiz"}
                                </Button>
                                {quiz.score && (
                                  <Badge variant="secondary">
                                    {quiz.score}/{quiz.maxScore}
                                  </Badge>
                                )}
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
