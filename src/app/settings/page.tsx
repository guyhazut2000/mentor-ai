"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Bell,
  CreditCard,
  Shield,
  Palette,
  Save,
  Trash2,
  Download,
} from "lucide-react";

export default function SettingsPage() {
  const [notifications] = useState({
    email: true,
    push: false,
    sms: false,
    dailyReminders: true,
    weeklyReports: true,
    achievementAlerts: true,
    goalReminders: true,
  });

  const [preferences] = useState({
    theme: "system",
    language: "en",
    timezone: "UTC",
    autoSave: true,
    soundEffects: true,
    animations: true,
  });

  return (
    <>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Header */}
              <div className="px-4 lg:px-6">
                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Settings
                      </h1>
                      <p className="text-gray-600 dark:text-gray-300">
                        Manage your account and preferences
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings Content */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="account" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="notifications">
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>

                  {/* Account Settings */}
                  <TabsContent value="account" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Profile Information */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Profile Information
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              placeholder="Tell us about yourself..."
                              rows={3}
                            />
                          </div>
                          <Button className="w-full">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Security Settings */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="current-password">
                              Current Password
                            </Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirm-password">
                              Confirm Password
                            </Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                          <Button variant="outline" className="w-full">
                            Change Password
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Data Management */}
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Data Management</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Export Data</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Download all your data in JSON format
                              </p>
                            </div>
                            <Button variant="outline">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                          </div>
                          <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <h4 className="font-medium">Delete Account</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Permanently delete your account and all data
                              </p>
                            </div>
                            <Button variant="destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Account
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Preferences Settings */}
                  <TabsContent value="preferences" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Appearance */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Palette className="h-5 w-5" />
                            Appearance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="theme">Theme</Label>
                            <Select value={preferences.theme}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select value={preferences.language}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="timezone">Timezone</Label>
                            <Select value={preferences.timezone}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="UTC">UTC</SelectItem>
                                <SelectItem value="EST">
                                  Eastern Time
                                </SelectItem>
                                <SelectItem value="PST">
                                  Pacific Time
                                </SelectItem>
                                <SelectItem value="GMT">GMT</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Behavior */}
                      <Card>
                        <CardHeader>
                          <CardTitle>Behavior</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Auto-save</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Automatically save your progress
                              </p>
                            </div>
                            <Switch checked={preferences.autoSave} />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Sound Effects</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Play sounds for interactions
                              </p>
                            </div>
                            <Switch checked={preferences.soundEffects} />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Animations</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Enable smooth animations
                              </p>
                            </div>
                            <Switch checked={preferences.animations} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Notifications Settings */}
                  <TabsContent value="notifications" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Notification Channels */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notification Channels
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span>Email Notifications</span>
                            <Switch checked={notifications.email} />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <span>Push Notifications</span>
                            <Switch checked={notifications.push} />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <span>SMS Notifications</span>
                            <Switch checked={notifications.sms} />
                          </div>
                        </CardContent>
                      </Card>

                      {/* Notification Types */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Notification Types
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Daily Reminders</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Remind me to learn daily
                              </p>
                            </div>
                            <Switch checked={notifications.dailyReminders} />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Weekly Reports</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Send weekly progress reports
                              </p>
                            </div>
                            <Switch checked={notifications.weeklyReports} />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Achievement Alerts</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Notify when you unlock achievements
                              </p>
                            </div>
                            <Switch checked={notifications.achievementAlerts} />
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label>Goal Reminders</Label>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Remind about goal deadlines
                              </p>
                            </div>
                            <Switch checked={notifications.goalReminders} />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Billing Settings */}
                  <TabsContent value="billing" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Current Plan */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Current Plan
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">Pro Plan</h4>
                              <Badge variant="secondary">Active</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              $19.99/month
                            </p>
                            <p className="text-xs text-gray-500">
                              Next billing: March 15, 2024
                            </p>
                          </div>
                          <Button variant="outline" className="w-full">
                            Change Plan
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Payment Method */}
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Payment Method
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-12 bg-gray-200 rounded"></div>
                              <div>
                                <p className="font-medium">
                                  •••• •••• •••• 4242
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Expires 12/25
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button variant="outline" className="w-full">
                            Update Payment Method
                          </Button>
                        </CardContent>
                      </Card>

                      {/* Billing History */}
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>Billing History</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">
                                  Pro Plan - February 2024
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Feb 15, 2024
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">$19.99</p>
                                <Badge variant="secondary">Paid</Badge>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">
                                  Pro Plan - January 2024
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Jan 15, 2024
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">$19.99</p>
                                <Badge variant="secondary">Paid</Badge>
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
    </>
  );
}
