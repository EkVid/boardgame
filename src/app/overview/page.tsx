import React from "react";
import Link from "next/link";
import {
  Users,
  Shield,
  Target,
  Clock,
  Eye,
  ArrowRight,
  Zap,
  Crown,
  PanelTopDashed,
  PersonStanding
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Overview() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900/20">
      <style>{`
        @keyframes crownPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 25px rgba(59, 130, 246, 0.8), 0 0 35px rgba(59, 130, 246, 0.4); }
        }

        @keyframes crownFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .crown-glow {
          animation: crownPulse 3s ease-in-out infinite;
        }

        .crown-float {
          animation: crownFloat 4s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30" />
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-16 lg:py-24 text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-900/50 crown-glow">
              <Crown className="w-10 h-10 text-white crown-float" />
            </div>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-300 via-blue-200 to-gray-100 bg-clip-text text-transparent">
            Play Ground
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            An asymmetrical cooperative board game where{" "}
            <span className="text-emerald-300 font-semibold">Outcasts</span> must either escape the Warden’s {" "}
            <span className="text-red-300 font-semibold">"playground" </span>
            or work together to banish the{" "}
            <span className="text-blue-300 font-semibold">Warden</span> before they are hunted down.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Badge className="bg-blue-900/30 text-blue-200 hover:bg-blue-900/50 px-4 py-2 border border-blue-800/50">
              <Users className="w-4 h-4 mr-2" />
              5 Players
            </Badge>
            <Badge className="bg-blue-900/30 text-blue-200 hover:bg-blue-900/50 px-4 py-2 border border-blue-800/50">
              <Clock className="w-4 h-4 mr-2" />
              45-60 Minutes
            </Badge>
            <Badge className="bg-blue-900/30 text-blue-200 hover:bg-blue-900/50 px-4 py-2 border border-blue-800/50">
              <Eye className="w-4 h-4 mr-2" />
              Ages 12+
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Game Overview Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Outcasts Card */}
          <Card className="bg-emerald-900/20 border-emerald-600/30 hover:bg-emerald-900/30 transition-all duration-300 group h-full backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-800/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-800/50 transition-all duration-300 border border-emerald-600/30">
                <Users className="w-8 h-8 text-emerald-300" />
              </div>
              <CardTitle className="text-2xl text-emerald-300">The Outcasts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                4 players working together to complete objectives, gather resources, and escape the playground or defeat the warden before the Warden captures them all
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Target className="w-4 h-4 text-emerald-400" />
                  <span>Complete objectives</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span>Special character abilities</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                  <span>Escape through the gates / Take down the Warden</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warden Card */}
          <Card className="bg-red-900/20 border-red-600/30 hover:bg-red-900/30 transition-all duration-300 group h-full backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-800/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-800/50 transition-all duration-300 border border-red-600/30 blood-glow">
                <Shield className="w-8 h-8 text-red-300" />
              </div>
              <CardTitle className="text-2xl text-blue-300">The Warden</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                A powerful monster with abilities, evolving powers, and the goal is to capture all the Outcasts before they can escape
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span>Capture the outcasts before they escape</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span>Evolving abilities</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <ArrowRight className="w-4 h-4 text-blue-400" />
                  <span>Additional Warden Powers</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Win Conditions */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-white">Paths to Victory</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gray-900/70 border-emerald-600/30 hover:bg-gray-900/90 transition-all duration-300 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-300">
                  <Users className="w-5 h-5" />
                  Outcasts Win By:
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">Having the majority escape</p>
                </div>
                <div className="text-gray-500 text-center">OR</div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">Working together to defeat the Warden</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/70 border-red-600/30 hover:bg-gray-900/90 transition-all duration-300 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-300">
                  <Shield className="w-5 h-5" />
                  Warden Wins By:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">Capturing the majority of players before they can escape</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Start Navigation */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-white">Start Your Journey</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { to: "/basicRules", title: "Learn the Rules", desc: "Master the game mechanics and strategy", icon: PanelTopDashed, color: "blue" },
              { to: "/outcastCharacters", title: "Choose Your Character", desc: "Select from strategic characters", icon: PersonStanding, color: "emerald" },
              { to: "/setup", title: "Game Setup", desc: "Set up your strategic board game", icon: Target, color: "purple" }
            ].map((item, index) => (
              <Link key={item.to} href={item.to} className="group block h-full">
                <Card className="bg-gray-900/50 border-gray-600/50 hover:bg-gray-900/70 transition-all duration-300 h-full hover:shadow-xl hover:shadow-red-900/20 backdrop-blur-sm">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className={`w-12 h-12 bg-${item.color}-800/30 rounded-xl flex items-center justify-center mx-auto group-hover:bg-${item.color}-800/50 transition-colors mt-4`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
