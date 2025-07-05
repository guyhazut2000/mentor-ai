"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Trophy,
  Target,
  BookOpen,
  MessageCircle,
  Calendar,
  Zap,
  Flame,
  Heart,
  Code,
  Clock,
  CheckCircle,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "learning" | "social" | "streak" | "milestone" | "special";
  icon: React.ComponentType<{ className?: string }>;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: Date;
  rarity: "common" | "rare" | "epic" | "legendary";
  points: number;
  requirements: string[];
}

export default function AchievementsPage() {
  const [achievements] = useState<Achievement[]>([
    {
      id: "1",
      title: "First Steps",
      description: "Complete your first learning session",
      category: "milestone",
      icon: Target,
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      unlockedAt: new Date("2024-01-10"),
      rarity: "common",
      points: 10,
      requirements: ["Complete 1 learning session"],
    },
    {
      id: "2",
      title: "Chat Master",
      description: "Have 50 conversations with your AI mentor",
      category: "social",
      icon: MessageCircle,
      progress: 24,
      maxProgress: 50,
      unlocked: false,
      rarity: "rare",
      points: 50,
      requirements: ["Complete 50 chat sessions"],
    },
    {
      id: "3",
      title: "Knowledge Seeker",
      description: "Complete 10 different learning topics",
      category: "learning",
      icon: BookOpen,
      progress: 7,
      maxProgress: 10,
      unlocked: false,
      rarity: "rare",
      points: 75,
      requirements: ["Complete 10 different topics"],
    },
    {
      id: "4",
      title: "Consistency King",
      description: "Maintain a 7-day learning streak",
      category: "streak",
      icon: Flame,
      progress: 5,
      maxProgress: 7,
      unlocked: false,
      rarity: "epic",
      points: 100,
      requirements: ["Learn for 7 consecutive days"],
    },
    {
      id: "5",
      title: "Goal Crusher",
      description: "Complete 5 goals successfully",
      category: "milestone",
      icon: Trophy,
      progress: 2,
      maxProgress: 5,
      unlocked: false,
      rarity: "epic",
      points: 150,
      requirements: ["Complete 5 goals"],
    },
    {
      id: "6",
      title: "Early Bird",
      description: "Complete 5 learning sessions before 9 AM",
      category: "streak",
      icon: Clock,
      progress: 3,
      maxProgress: 5,
      unlocked: false,
      rarity: "rare",
      points: 60,
      requirements: ["5 early morning sessions"],
    },
    {
      id: "7",
      title: "Weekend Warrior",
      description: "Learn on 4 consecutive weekends",
      category: "streak",
      icon: Calendar,
      progress: 2,
      maxProgress: 4,
      unlocked: false,
      rarity: "epic",
      points: 120,
      requirements: ["4 consecutive weekends"],
    },
    {
      id: "8",
      title: "Problem Solver",
      description: "Solve 25 coding challenges",
      category: "learning",
      icon: Code,
      progress: 18,
      maxProgress: 25,
      unlocked: false,
      rarity: "rare",
      points: 80,
      requirements: ["Solve 25 challenges"],
    },
    {
      id: "9",
      title: "Mentor's Favorite",
      description: "Receive 10 positive feedback ratings",
      category: "social",
      icon: Heart,
      progress: 6,
      maxProgress: 10,
      unlocked: false,
      rarity: "epic",
      points: 90,
      requirements: ["10 positive ratings"],
    },
    {
      id: "10",
      title: "Speed Learner",
      description: "Complete 3 topics in a single day",
      category: "milestone",
      icon: Zap,
      progress: 0,
      maxProgress: 3,
      unlocked: false,
      rarity: "legendary",
      points: 200,
      requirements: ["3 topics in 1 day"],
    },
  ]);

  const unlockedAchievements = achievements.filter((a) => a.unlocked);
  const totalPoints = unlockedAchievements.reduce(
    (sum, a) => sum + a.points,
    0
  );
  const totalAchievements = achievements.length;
  const unlockedCount = unlockedAchievements.length;

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "rare":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "epic":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "legendary":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Header */}
              <div className="px-4 lg:px-6">
                <div className="rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/50 dark:to-orange-950/50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Achievements
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300">
                        Track your progress and unlock badges
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {unlockedCount}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Unlocked
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {totalAchievements}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Total
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {totalPoints}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Points
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {Math.round((unlockedCount / totalAchievements) * 100)}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Complete
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievements Grid */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="learning">Learning</TabsTrigger>
                    <TabsTrigger value="social">Social</TabsTrigger>
                    <TabsTrigger value="streak">Streaks</TabsTrigger>
                    <TabsTrigger value="milestone">Milestones</TabsTrigger>
                    <TabsTrigger value="special">Special</TabsTrigger>
                  </TabsList>

                  <TabsContent value="all" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement) => (
                        <Card
                          key={achievement.id}
                          className={`relative overflow-hidden ${
                            achievement.unlocked
                              ? "border-2 border-green-200 dark:border-green-800"
                              : "opacity-75"
                          }`}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                    achievement.unlocked
                                      ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                                      : "bg-gray-200 dark:bg-gray-700"
                                  }`}
                                >
                                  <achievement.icon
                                    className={`h-5 w-5 ${
                                      achievement.unlocked
                                        ? "text-white"
                                        : "text-gray-500"
                                    }`}
                                  />
                                </div>
                                <div>
                                  <CardTitle className="text-sm font-semibold">
                                    {achievement.title}
                                  </CardTitle>
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs ${getRarityColor(
                                      achievement.rarity
                                    )}`}
                                  >
                                    {achievement.rarity}
                                  </Badge>
                                </div>
                              </div>
                              {achievement.unlocked && (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {achievement.description}
                            </p>

                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span>Progress</span>
                                <span>
                                  {achievement.progress}/
                                  {achievement.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={
                                  (achievement.progress /
                                    achievement.maxProgress) *
                                  100
                                }
                                className="h-2"
                              />
                            </div>

                            <div className="mt-3 space-y-1">
                              {achievement.requirements.map((req, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 text-xs text-gray-500"
                                >
                                  <div
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      achievement.unlocked
                                        ? "bg-green-500"
                                        : "bg-gray-300"
                                    }`}
                                  />
                                  {req}
                                </div>
                              ))}
                            </div>

                            <div className="mt-3 flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {achievement.points} points
                              </span>
                              {achievement.unlocked &&
                                achievement.unlockedAt && (
                                  <span className="text-xs text-gray-500">
                                    Unlocked{" "}
                                    {achievement.unlockedAt.toLocaleDateString()}
                                  </span>
                                )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  {["learning", "social", "streak", "milestone", "special"].map(
                    (category) => (
                      <TabsContent
                        key={category}
                        value={category}
                        className="mt-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {achievements
                            .filter((a) => a.category === category)
                            .map((achievement) => (
                              <Card
                                key={achievement.id}
                                className={`relative overflow-hidden ${
                                  achievement.unlocked
                                    ? "border-2 border-green-200 dark:border-green-800"
                                    : "opacity-75"
                                }`}
                              >
                                <CardHeader className="pb-3">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div
                                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                                          achievement.unlocked
                                            ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                                            : "bg-gray-200 dark:bg-gray-700"
                                        }`}
                                      >
                                        <achievement.icon
                                          className={`h-5 w-5 ${
                                            achievement.unlocked
                                              ? "text-white"
                                              : "text-gray-500"
                                          }`}
                                        />
                                      </div>
                                      <div>
                                        <CardTitle className="text-sm font-semibold">
                                          {achievement.title}
                                        </CardTitle>
                                        <Badge
                                          variant="secondary"
                                          className={`text-xs ${getRarityColor(
                                            achievement.rarity
                                          )}`}
                                        >
                                          {achievement.rarity}
                                        </Badge>
                                      </div>
                                    </div>
                                    {achievement.unlocked && (
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                    )}
                                  </div>
                                </CardHeader>
                                <CardContent className="pt-0">
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                    {achievement.description}
                                  </p>

                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs">
                                      <span>Progress</span>
                                      <span>
                                        {achievement.progress}/
                                        {achievement.maxProgress}
                                      </span>
                                    </div>
                                    <Progress
                                      value={
                                        (achievement.progress /
                                          achievement.maxProgress) *
                                        100
                                      }
                                      className="h-2"
                                    />
                                  </div>

                                  <div className="mt-3 space-y-1">
                                    {achievement.requirements.map(
                                      (req, index) => (
                                        <div
                                          key={index}
                                          className="flex items-center gap-2 text-xs text-gray-500"
                                        >
                                          <div
                                            className={`h-1.5 w-1.5 rounded-full ${
                                              achievement.unlocked
                                                ? "bg-green-500"
                                                : "bg-gray-300"
                                            }`}
                                          />
                                          {req}
                                        </div>
                                      )
                                    )}
                                  </div>

                                  <div className="mt-3 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">
                                      {achievement.points} points
                                    </span>
                                    {achievement.unlocked &&
                                      achievement.unlockedAt && (
                                        <span className="text-xs text-gray-500">
                                          Unlocked{" "}
                                          {achievement.unlockedAt.toLocaleDateString()}
                                        </span>
                                      )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </TabsContent>
                    )
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
