"use client";

import { useUser } from "@clerk/nextjs";

import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardPage() {
  const { user } = useUser();

  // Get user's first name or fallback to "there"
  const firstName = user?.firstName || "there";

  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Welcome Section */}
              <div className="px-4 lg:px-6">
                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 p-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back, {firstName}! 👋
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Ready to continue your learning journey? Your AI mentor is
                    here to help.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold">
                          24
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Chats Completed</p>
                        <p className="text-xs text-muted-foreground">
                          This month
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
                          8
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Topics Mastered</p>
                        <p className="text-xs text-muted-foreground">
                          New this week
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <span className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
                          150
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Credits Left</p>
                        <p className="text-xs text-muted-foreground">
                          Available for chats
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="px-4 lg:px-6">
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    Recent Learning Activity
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Completed JavaScript Fundamentals
                        </p>
                        <p className="text-xs text-muted-foreground">
                          2 hours ago • 45 minutes session
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Started React Hooks Deep Dive
                        </p>
                        <p className="text-xs text-muted-foreground">
                          1 day ago • In progress
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Practiced System Design
                        </p>
                        <p className="text-xs text-muted-foreground">
                          3 days ago • 1 hour session
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="px-4 lg:px-6">
                <div className="rounded-lg border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400">
                          💬
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Start New Chat</p>
                        <p className="text-sm text-muted-foreground">
                          Ask your mentor anything
                        </p>
                      </div>
                    </button>

                    <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <span className="text-green-600 dark:text-green-400">
                          🎯
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Learning Path</p>
                        <p className="text-sm text-muted-foreground">
                          Track your progress
                        </p>
                      </div>
                    </button>

                    <button className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                      <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <span className="text-purple-600 dark:text-purple-400">
                          🏆
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium">Achievements</p>
                        <p className="text-sm text-muted-foreground">
                          View your badges
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
