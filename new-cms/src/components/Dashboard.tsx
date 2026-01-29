"use client";

import { Database, FileText, Tag, Monitor, ArrowRight, Calendar, AlertCircle, Ticket, TrendingUp, Mail, Share2, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import * as Select from "@radix-ui/react-select";

// Renewal Countdown Component
function RenewalCountdown() {
  // Mock renewal date - 90 days from now
  const renewalDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 90);
    return date;
  }, []);
  
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    totalMs: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const renewal = renewalDate.getTime();
      const difference = renewal - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeRemaining({
          days,
          hours,
          minutes,
          totalMs: difference,
        });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, totalMs: 0 });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [renewalDate]);

  // Calculate progress (assuming 1 year subscription = 365 days)
  const totalDays = 365;
  const daysRemaining = timeRemaining.days;
  const progress = Math.max(0, Math.min(100, (daysRemaining / totalDays) * 100));
  
  // Determine color based on remaining days
  const getProgressColor = () => {
    if (daysRemaining <= 7) return "bg-red-600";
    if (daysRemaining <= 30) return "bg-orange-500";
    return "bg-green-600";
  };

  const getCardBorderColor = () => {
    if (daysRemaining <= 7) return "border-red-200";
    if (daysRemaining <= 30) return "border-orange-200";
    return "border-green-200";
  };

  const formatRenewalDate = () => {
    return renewalDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 border-2 h-full flex flex-col ${getCardBorderColor()}`}>
        
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Calendar className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">Website Renewal</h3>
            <p className="text-xs text-gray-500 mt-1">Next renewal: {formatRenewalDate()}</p>
          </div>
        </div>
        {daysRemaining <= 30 && (
          <div className="flex items-center gap-1 text-orange-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Renewal Soon</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-gray-900">{daysRemaining}</span>
          <span className="text-sm text-gray-600">days remaining</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>{timeRemaining.hours}h</span>
          <span>{timeRemaining.minutes}m</span>
        </div>
      </div>

      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
        <span>{Math.round(progress)}% remaining</span>
        <span>{formatRenewalDate()}</span>
      </div>
    </div>
  );
}

// Time Period Select Component
function TimePeriodSelect({
  value,
  onValueChange,
}: {
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger className="inline-flex h-8 items-center justify-between rounded-md border border-gray-300 px-3 py-1 text-xs bg-white focus:border-blue-500 focus:ring-blue-500 focus:outline-none focus:ring-1">
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="w-3 h-3 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <Select.Viewport className="p-1">
            {["Today", "1 Week", "1 Month", "3 Months", "6 Months", "1 Year"].map((option) => (
              <Select.Item
                key={option}
                value={option}
                className="relative flex items-center px-3 py-2 text-xs rounded-sm cursor-pointer focus:bg-blue-50 focus:outline-none data-[highlighted]:bg-blue-50"
              >
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <Check className="w-3 h-3 text-blue-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

// Generate mock data based on time period
function generateMockData(period: string, type: "traffic" | "email" | "social") {
  const data: { date: string; value: number }[] = [];
  const now = new Date();
  let days = 1;
  
  switch (period) {
    case "Today":
      days = 1;
      for (let i = 23; i >= 0; i--) {
        const date = new Date(now);
        date.setHours(date.getHours() - i);
        data.push({
          date: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
          value: Math.floor(Math.random() * 500) + 100,
        });
      }
      break;
    case "1 Week":
      days = 7;
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          value: Math.floor(Math.random() * 3000) + 500,
        });
      }
      break;
    case "1 Month":
      days = 30;
      for (let i = days - 1; i >= 0; i -= 2) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          value: Math.floor(Math.random() * 5000) + 1000,
        });
      }
      break;
    case "3 Months":
      days = 90;
      for (let i = days - 1; i >= 0; i -= 7) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          value: Math.floor(Math.random() * 8000) + 2000,
        });
      }
      break;
    case "6 Months":
      days = 180;
      for (let i = days - 1; i >= 0; i -= 14) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          value: Math.floor(Math.random() * 10000) + 3000,
        });
      }
      break;
    case "1 Year":
      days = 365;
      for (let i = days - 1; i >= 0; i -= 30) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
          date: date.toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
          value: Math.floor(Math.random() * 15000) + 5000,
        });
      }
      break;
  }

  // Adjust values based on type
  if (type === "email") {
    return data.map((d) => ({ ...d, value: Math.floor(d.value * 0.1) }));
  } else if (type === "social") {
    return data.map((d) => ({ ...d, value: Math.floor(d.value * 0.3) }));
  }
  return data;
}

// Data Overview Component
function DataOverview() {
  const [timePeriod, setTimePeriod] = useState("1 Week");

  const trafficData = generateMockData(timePeriod, "traffic");
  const emailData = generateMockData(timePeriod, "email");
  const socialData = generateMockData(timePeriod, "social");

  const totalTraffic = trafficData.reduce((sum, d) => sum + d.value, 0);
  const totalEmail = emailData.reduce((sum, d) => sum + d.value, 0);
  const totalSocial = socialData.reduce((sum, d) => sum + d.value, 0);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toString();
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Data Overview</h2>
          <p className="text-gray-600">Track your website performance and engagement metrics.</p>
        </div>
        <TimePeriodSelect value={timePeriod} onValueChange={setTimePeriod} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Website Traffic Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Website Traffic</h3>
                <p className="text-xs text-gray-500 mt-1">Total visitors</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-3xl font-bold text-gray-900">{formatNumber(totalTraffic)}</p>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-gray-500">
                {timePeriod === "Today" ? "visits today" : `visits in ${timePeriod.toLowerCase()}`}
              </p>
              <span className="text-xs font-medium text-green-600">+15%</span>
              <span className="text-xs text-gray-400">vs last week</span>
            </div>
          </div>
          <div className="h-32 mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorTraffic)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>Avg. session: 2m 34s</span>
            <span>•</span>
            <span>Bounce rate: 42%</span>
          </div>
        </div>

        {/* Email Registrations Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Email Registrations</h3>
                <p className="text-xs text-gray-500 mt-1">New subscribers</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-gray-900">{formatNumber(totalEmail)}</p>
              <span className="text-sm font-semibold text-green-600">12.9%</span>
            </div>
            <div className="mt-1 space-y-1">
              <p className="text-xs text-gray-500">
                {timePeriod === "Today" ? "new signups today" : `new signups in ${timePeriod.toLowerCase()}`}
              </p>
              <p className="text-xs text-gray-400">Conversion rate</p>
            </div>
          </div>
          <div className="h-32 mb-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emailData}>
                <defs>
                  <linearGradient id="colorEmail" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorEmail)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Landing Page</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "60%" }}></div>
                </div>
                <span className="text-gray-400 w-8 text-right">60%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Navigation Bar</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400" style={{ width: "40%" }}></div>
                </div>
                <span className="text-gray-400 w-8 text-right">40%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Data Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Share2 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Social Media</h3>
                <p className="text-xs text-gray-500 mt-1">Platform engagement</p>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {/* Instagram */}
            <div className="p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    IG
                  </div>
                  <span className="text-sm font-medium text-gray-700">Instagram</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{formatNumber(Math.floor(totalSocial * 0.4))}</span>
                  <span className="text-xs text-green-600 ml-2 font-medium">+120</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 ml-11">
                <span>Likes: {formatNumber(Math.floor(totalSocial * 0.4 * 0.6))}</span>
                <span>•</span>
                <span>Saves: {formatNumber(Math.floor(totalSocial * 0.4 * 0.3))}</span>
              </div>
            </div>
            
            {/* Facebook */}
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    FB
                  </div>
                  <span className="text-sm font-medium text-gray-700">Facebook</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{formatNumber(Math.floor(totalSocial * 0.35))}</span>
                  <span className="text-xs text-green-600 ml-2 font-medium">+95</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 ml-11">
                <span>Likes: {formatNumber(Math.floor(totalSocial * 0.35 * 0.65))}</span>
                <span>•</span>
                <span>Saves: {formatNumber(Math.floor(totalSocial * 0.35 * 0.25))}</span>
              </div>
            </div>
            
            {/* 小红书 */}
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-xs">
                    Red
                  </div>
                  <span className="text-sm font-medium text-gray-700">小红书</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-gray-900">{formatNumber(Math.floor(totalSocial * 0.25))}</span>
                  <span className="text-xs text-green-600 ml-2 font-medium">+68</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 ml-11">
                <span>Likes: {formatNumber(Math.floor(totalSocial * 0.25 * 0.7))}</span>
                <span>•</span>
                <span>Collects: {formatNumber(Math.floor(totalSocial * 0.25 * 0.4))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Ticket Status Component
function TicketStatus() {
  // Mock ticket data
  const ticketStats = {
    total: 12,
    open: 5,
    inProgress: 3,
    waiting: 2,
    completed: 7,
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Ticket className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-600">Ticket Status</h3>
            <p className="text-xs text-gray-500 mt-1">Support requests overview</p>
          </div>
        </div>
        <Link
          href="/submit-ticket"
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-gray-900">{ticketStats.total}</span>
          <span className="text-sm text-gray-600">total tickets</span>
        </div>
      </div>

      <div className="space-y-3 flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-sm text-gray-700">Open</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{ticketStats.open}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-700">In Progress</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{ticketStats.inProgress}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-sm text-gray-700">Waiting on Client</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{ticketStats.waiting}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700">Completed</span>
          </div>
          <span className="text-sm font-semibold text-gray-900">{ticketStats.completed}</span>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  return (
    <div className="flex-1 p-8 bg-gray-50 min-h-screen">
      {/* Account Overview Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Overview</h2>
            <p className="text-gray-600">Support & Billing</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RenewalCountdown />
          <TicketStatus />
        </div>
      </section>

      {/* Data Overview Section */}
      <DataOverview />

      {/* Dashboard Overview Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Overview</h2>
        <p className="text-gray-600 mb-6">Welcome back. Here is what&apos;s happening on your site.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Storage Usage Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Storage Usage</h3>
                  <p className="text-xs text-gray-500 mt-1">Limit: 100 MB</p>
                </div>
              </div>
              <Link
                href="/media"
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                View Library
              </Link>
            </div>
            <div className="mb-2">
              <p className="text-2xl font-bold text-gray-900">17.1 MB</p>
              <p className="text-xs text-gray-500">Used</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: "17%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">17%</p>
          </div>

          {/* Active Services Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Active Services</h3>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">32</p>
            </div>
          </div>

          {/* Active Promotions Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Active Promotions</h3>
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hero Banners Card */}
          <Link
            href="/hero-banners"
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Monitor className="w-6 h-6 text-blue-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hero Banners</h3>
            <p className="text-sm text-gray-600">Update the main homepage sliders.</p>
          </Link>

          {/* Service Menu Card */}
          <Link
            href="/services"
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Menu</h3>
            <p className="text-sm text-gray-600">Edit prices, descriptions, and images.</p>
          </Link>

          {/* Promotions Card */}
          <Link
            href="/promotions"
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Promotions</h3>
            <p className="text-sm text-gray-600">Manage homepage deals and offers.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}

