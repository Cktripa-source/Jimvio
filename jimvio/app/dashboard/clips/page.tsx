import React from "react";
import { Video, Plus, Eye, Share2, Download, TrendingUp, Play, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";

const mockClips = [
  {
    id: "1", title: "iPhone 15 Unboxing & Review", duration: "1:24", thumbnail: "📱",
    views: 284000, shares: 12400, downloads: 3200, clicks: 18700, conversions: 142,
    status: "active", campaign: "iPhone Launch", createdAt: "Jan 15, 2025",
  },
  {
    id: "2", title: "How I Built My SaaS in 30 Days", duration: "2:18", thumbnail: "💻",
    views: 156000, shares: 8900, downloads: 2100, clicks: 12400, conversions: 892,
    status: "active", campaign: "Next.js Course", createdAt: "Jan 8, 2025",
  },
  {
    id: "3", title: "AI Tools That Changed My Business", duration: "3:05", thumbnail: "🤖",
    views: 98000, shares: 5600, downloads: 1800, clicks: 9300, conversions: 567,
    status: "active", campaign: "AI Bundle", createdAt: "Dec 20, 2024",
  },
  {
    id: "4", title: "Figma to Code in 60 Seconds", duration: "0:59", thumbnail: "🎨",
    views: 54000, shares: 3200, downloads: 890, clicks: 4800, conversions: 234,
    status: "active", campaign: "UI Kit Promo", createdAt: "Dec 10, 2024",
  },
];

export default function ViralClipsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Viral Clips</h1>
          <p className="text-white/50 text-sm mt-1">Upload marketing videos for influencers to share</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" /> Upload Clip
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Views" value="592K" change={38.4} icon={<Eye className="h-4 w-4" />} iconColor="from-cyan-600 to-blue-600" />
        <StatCard title="Total Shares" value="30.1K" change={45.2} icon={<Share2 className="h-4 w-4" />} iconColor="from-pink-600 to-rose-600" />
        <StatCard title="Downloads" value="8,090" change={28.7} icon={<Download className="h-4 w-4" />} iconColor="from-emerald-600 to-teal-600" />
        <StatCard title="Conversions" value="1,835" change={52.1} icon={<TrendingUp className="h-4 w-4" />} iconColor="from-amber-600 to-orange-600" />
      </div>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {mockClips.map((clip) => (
          <Card key={clip.id} hover className="overflow-hidden group">
            {/* Thumbnail */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-6xl cursor-pointer">
              <span className="group-hover:scale-110 transition-transform duration-300">{clip.thumbnail}</span>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="h-5 w-5 text-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-lg">
                {clip.duration}
              </div>
              <Badge variant="default" className="absolute top-2 left-2 text-xs">{clip.campaign}</Badge>
            </div>

            <CardContent className="p-4">
              <p className="text-white font-semibold text-sm mb-3 line-clamp-2">{clip.title}</p>

              <div className="grid grid-cols-2 gap-2 mb-3">
                {[
                  { label: "Views", value: `${(clip.views / 1000).toFixed(0)}K`, icon: "👁" },
                  { label: "Shares", value: `${(clip.shares / 1000).toFixed(1)}K`, icon: "📤" },
                  { label: "Downloads", value: clip.downloads.toLocaleString(), icon: "⬇️" },
                  { label: "Conversions", value: clip.conversions.toLocaleString(), icon: "✅" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-xs mb-0.5">{stat.icon}</div>
                    <div className="text-xs font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/30">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="glass" className="flex-1">
                  <BarChart3 className="h-3.5 w-3.5" /> Stats
                </Button>
                <Button size="sm" variant="glass" className="flex-1">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload CTA */}
      <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 text-center hover:border-brand-500/40 hover:bg-brand-500/5 transition-all cursor-pointer group">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
          <Video className="h-7 w-7 text-white" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">Upload Marketing Video</h3>
        <p className="text-white/50 text-sm mb-4 max-w-md mx-auto">
          Upload a short marketing clip. Influencers can download and share it across TikTok, Instagram, and YouTube. Track every view and conversion.
        </p>
        <Button>
          <Plus className="h-4 w-4" /> Upload Your First Clip
        </Button>
        <p className="text-white/30 text-xs mt-3">Supports MP4, MOV, AVI • Max 500MB</p>
      </div>
    </div>
  );
}
