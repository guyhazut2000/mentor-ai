"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import {
  IconBrain,
  IconMessageCircle,
  IconBook,
  IconTarget,
  IconTrophy,
  IconChartBar,
  IconSettings,
  IconFileText,
  IconVideo,
  IconHome,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInput,
} from "@/components/ui/sidebar";

import { Badge } from "@/components/ui/badge";

// Mock data for mentor AI app (excluding user data)
const mentorData = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconHome,
      variant: "ghost" as const,
    },
    {
      title: "AI Chat",
      url: "/chat",
      icon: IconMessageCircle,
      variant: "default" as const,
      isActive: true,
    },
    {
      title: "Goals",
      url: "/goals",
      icon: IconTarget,
      variant: "ghost" as const,
      badge: "3",
    },
    {
      title: "Learning",
      url: "/learning",
      icon: IconBook,
      variant: "ghost" as const,
    },
    {
      title: "Progress",
      url: "/progress",
      icon: IconChartBar,
      variant: "ghost" as const,
    },
    {
      title: "Achievements",
      url: "/achievements",
      icon: IconTrophy,
      variant: "ghost" as const,
    },
  ],
  recentChats: [
    {
      title: "JavaScript Fundamentals",
      url: "/chat",
      icon: IconMessageCircle,
      date: "2 hours ago",
      mentor: "Code Mentor",
      status: "completed",
    },
    {
      title: "React Hooks Deep Dive",
      url: "/chat",
      icon: IconMessageCircle,
      date: "1 day ago",
      mentor: "React Expert",
      status: "active",
    },
    {
      title: "System Design Interview",
      url: "/chat",
      icon: IconMessageCircle,
      date: "3 days ago",
      mentor: "Senior Engineer",
      status: "completed",
    },
    {
      title: "Data Structures & Algorithms",
      url: "/chat",
      icon: IconMessageCircle,
      date: "1 week ago",
      mentor: "Algo Master",
      status: "completed",
    },
  ],
  learningResources: [
    {
      name: "Study Materials",
      url: "/learning",
      icon: IconBook,
    },
    {
      name: "Video Tutorials",
      url: "/learning",
      icon: IconVideo,
    },
    {
      name: "Code Examples",
      url: "/learning",
      icon: IconFileText,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
      items: [
        { title: "Account", url: "/settings/account" },
        { title: "Preferences", url: "/settings/preferences" },
        { title: "Notifications", url: "/settings/notifications" },
        { title: "Billing", url: "/settings/billing" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoaded } = useUser();

  // Default user data if Clerk is not loaded or user is not available
  const userData = {
    name: user?.firstName || user?.fullName || "User",
    email: user?.primaryEmailAddress?.emailAddress || "user@example.com",
    avatar: user?.imageUrl || "",
    role: "Student",
    level: "Intermediate",
    credits: 150,
  };

  if (!isLoaded) {
    return (
      <Sidebar collapsible="offcanvas" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5 h-fit"
              >
                <a href="/dashboard">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                      <IconBrain className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-base font-semibold">MentorAI</span>
                      <span className="text-xs text-muted-foreground">
                        Your AI Learning Partner
                      </span>
                    </div>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 h-fit"
            >
              <a href="/dashboard">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <IconBrain className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-base font-semibold">MentorAI</span>
                    <span className="text-xs text-muted-foreground">
                      Your AI Learning Partner
                    </span>
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="gap-1">
        {/* Search */}
        <SidebarGroup className="p-1">
          <SidebarGroupContent>
            <SidebarInput
              placeholder="Search chats, goals, lessons..."
              className="w-full h-8 text-sm"
            />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Main Navigation */}
        <SidebarGroup className="p-1">
          <SidebarGroupLabel className="h-6 text-xs">Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <NavMain items={mentorData.navMain} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Recent Chats */}
        <SidebarGroup className="p-1">
          <SidebarGroupLabel className="h-6 text-xs">
            Recent Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {mentorData.recentChats.slice(0, 3).map((chat, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild size="sm">
                    <a
                      href={chat.url}
                      className="flex items-center justify-between w-full min-w-0"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <chat.icon className="h-3.5 w-3.5 flex-shrink-0" />
                        <div className="flex flex-col items-start min-w-0 flex-1">
                          <span className="text-xs font-medium truncate w-full">
                            {chat.title}
                          </span>
                          <span className="text-xs text-muted-foreground truncate w-full">
                            {chat.mentor}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                        {chat.status === "active" && (
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                        )}
                        <span className="text-xs text-muted-foreground flex-shrink-0 hidden sm:block">
                          {chat.date}
                        </span>
                      </div>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Learning Resources */}
        <SidebarGroup className="p-1">
          <SidebarGroupLabel className="h-6 text-xs">
            Learning Resources
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <NavDocuments items={mentorData.learningResources} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* User Stats */}
        <SidebarGroup className="p-1">
          <SidebarGroupLabel className="h-6 text-xs">
            Your Progress
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-1 p-1">
              <div className="flex items-center justify-between text-xs">
                <span>Credits</span>
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  {userData.credits}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Level</span>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  {userData.level}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Chats</span>
                <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                  24
                </Badge>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Secondary Navigation */}
        <NavSecondary items={mentorData.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
