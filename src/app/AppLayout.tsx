"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Book,
    Users,
    Shield,
    Target,
    Settings,
    Map,
    Scroll,
    Sword,
    Menu,
    X,
    Crown,
    UserCheck,
    Eye
} from "lucide-react";

const navigationItems = [
    {
        title: "Game Overview",
        url: "/overview",
        icon: Book,
    },
    {
        title: "Game Rules",
        url: "/basicRules",
        icon: Scroll,
    },
    {
        title: "Game Flow",
        url: "/gameFlow",
        icon: Map,
    },
    {
        title: "Objective Card",
        url: "/objectives",
        icon: Target,
    },
    {
        title: "Power & Evolution Card",
        url: "/card",
        icon: Sword,
    },
    {
        title: "Setup Guide",
        url: "/setup",
        icon: Settings,
    },
    {
        title: "Outcast Characters",
        url: "/outcastCharacters",
        icon: Users,
    },
    {
        title: "Warden Characters",
        url: "/wardenCharacters",
        icon: Shield,
    }
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isActive = (url: string) => pathname === url;

    return (
        <div className="min-h-screen bg-slate-900 text-gray-100">
            <style>{`
          :root {
            --text-primary: rgb(248 250 252);
            --text-secondary: rgb(203 213 225);
            --text-muted: rgb(148 163 184);
            --bg-primary: rgb(15 23 42);
            --bg-secondary: rgb(30 41 59);
            --accent-primary: rgb(59 130 246);
            --accent-secondary: rgb(139 92 246);
          }
          
          body {
            background: radial-gradient(ellipse at center, rgb(30 41 59) 0%, rgb(15 23 42) 70%);
          }
          
          @keyframes shimmer {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.9; }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
            50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4); }
          }
          
          .crown-glow {
            animation: pulse-glow 3s ease-in-out infinite;
          }
          
          .shimmer {
            animation: shimmer 2s ease-in-out infinite;
          }
        `}</style>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed left-0 top-0 h-full w-80 bg-slate-800/98 backdrop-blur-sm border-r border-blue-900/50 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } shadow-2xl shadow-blue-900/20`}>

                {/* Header */}
                <div className="p-6 border-b border-blue-900/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg crown-glow">
                                <Crown className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white shimmer">Play Ground</h1>
                                <p className="text-sm text-blue-300">Asymmetrical Cooperative Board Game</p>
                            </div>
                        </div>
                        <button
                            className="lg:hidden p-2 hover:bg-blue-900/30 rounded-lg transition-colors"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.title}
                            href={item.url}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-blue-900/20 hover:shadow-lg ${isActive(item.url)
                                ? 'bg-blue-800/30 text-blue-300 border border-blue-600/50 shadow-lg shadow-blue-900/20'
                                : 'text-gray-300 hover:text-blue-200'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive(item.url) ? 'text-blue-300' : ''
                                }`} />
                            <span className="font-medium">{item.title}</span>
                        </Link>
                    ))}
                </nav>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-blue-900/50">
                    <div className="bg-blue-900/20 rounded-xl p-4 border border-blue-800/30">
                        <div className="flex items-center gap-3 mb-2">
                            <UserCheck className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">5 Players</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Eye className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">45-60 Minutes</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-80">
                {/* Mobile Header */}
                <div className="lg:hidden bg-slate-800/98 backdrop-blur-sm border-b border-blue-900/50 p-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="p-2 hover:bg-blue-900/30 rounded-lg transition-colors"
                        >
                            <Menu className="w-6 h-6 text-white" />
                        </button>
                        <div className="flex items-center gap-2">
                            <Crown className="w-6 h-6 text-blue-400 crown-glow" />
                            <h1 className="text-lg font-bold text-white">Play Ground</h1>
                        </div>
                    </div>
                </div>

                {/* Page Content */}
                <main className="min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    );
}
