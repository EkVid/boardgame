"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Users,
  Clock,
  MapPin,
  Wrench,
  Hammer,
  Zap,
  Shield,
  Info,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

const objectives = [
  {
    name: "Build the Bridge",
    icon: Hammer,
    description: "Build the bridge to cross the river",
    requirements: ["4 woods", "2 persons"],
    duration: "2 turns",
    location: "anywhere at the bank of the river, but 2 persons must be at the opposite banks",
    notes: "If it's destroyed by the warden after it's built, it can be rebuilt in only 1 turn and 1 person using 4 woods. Only 1 bridge allowed on the map",
    color: "blue"
  },
  {
    name: "Activate Signal Beacon",
    icon: Zap,
    description: "Turn on a beacon from the top level of a tower",
    requirements: ["1 person"],
    duration: "1 turn",
    location: "top level of a tower",
    notes: "Cannot climb to the top of a tower if it's not repaired",
    color: "yellow"
  },
  {
    name: "Attack!",
    icon: Shield,
    description: "Take down at least 2 HPs from the warden",
    requirements: ["Combat abilities or items"],
    duration: "Variable",
    location: "wherever warden is encountered",
    notes: "Requires coordination and proper equipment to succeed.",
    color: "red"
  },
  {
    name: "Repair the Generator",
    icon: Wrench,
    description: "Fix the old generator at the basement to restore power",
    requirements: ["4 metals", "2 persons"],
    duration: "2 turns",
    location: "underground basement",
    notes: "Repairing critical infrastructure requires teamwork, and the Outcasts in the basement are easy to get ambushed by the Hunter",
    color: "purple"
  },
  {
    name: "Ran Away",
    icon: Target,
    description: "Escape from the warden",
    requirements: ["Strategic positioning"],
    duration: "1 turn",
    location: "anywhere on map",
    notes: "If an Outcast is within 1 space of the Warden, they must be at least 3 spaces away by the end of their next turn",
    color: "green"
  },
  {
    name: "The Big Gathering",
    icon: Users,
    description: "All living outcasts (≥2) gather together in one space (Outcasts in Coma do not count)",
    requirements: ["All living outcasts"],
    duration: "1 turn",
    location: "anywhere",
    notes: "Simple but requires Outcasts to coordinate movement",
    color: "orange"
  },
  {
    name: "Build A Wall",
    icon: Hammer,
    description: "Build a wall to block the Warden",
    requirements: ["4 rocks", "2 persons"],
    duration: "2 turns",
    location: "anywhere walls can be built/stacked",
    notes: "After building the first wall, subsequent walls only need 1 person and 4 rocks. Repairing a built wall only needs 1 person and 3 rocks",
    color: "gray"
  },
  {
    name: "Set A Trap",
    icon: AlertTriangle,
    description: "Set a trap on a space",
    requirements: ["2 metals", "1 wood", "1 person"],
    duration: "1 turn",
    location: "any empty, non-river space",
    notes: "Outcasts can move into a space with traps, but cannot repair a trap",
    color: "red"
  },
  {
    name: "Repair the Tower",
    icon: Wrench,
    description: "Repair a tower on the map",
    requirements: ["4 rocks", "4 woods", "2 persons"],
    duration: "2 turns",
    location: "one of the two towers",
    notes: "Once one tower is repaired, the second tower only needs 1 person, 1 turn, and same amount of materials to repair",
    color: "cyan"
  },
  {
    name: "Repair The Gate",
    icon: CheckCircle2,
    description: "Repair the gate before it can be activated",
    requirements: ["3 metals", "3 woods", "2 persons"],
    duration: "2 turns",
    location: "one of the two gates",
    notes: "Once one gate is repaired, the second gate only needs 1 person, 1 turn, and same amount of materials to repair",
    color: "emerald"
  }
];

const iconColors: Record<string, string> = {
  blue: "text-blue-300 bg-blue-500/20 border-blue-400/30",
  yellow: "text-yellow-300 bg-yellow-500/20 border-yellow-400/30",
  red: "text-red-300 bg-red-500/20 border-red-400/30",
  purple: "text-purple-300 bg-purple-500/20 border-purple-400/30",
  green: "text-green-300 bg-green-500/20 border-green-400/30",
  orange: "text-orange-300 bg-orange-500/20 border-orange-400/30",
  gray: "text-gray-300 bg-gray-500/20 border-gray-400/30",
  cyan: "text-cyan-300 bg-cyan-500/20 border-cyan-400/30",
  emerald: "text-emerald-300 bg-emerald-500/20 border-emerald-400/30"
};

export default function Objectives() {
  const [selectedObjective, setSelectedObjective] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");

  const filteredObjectives = objectives.filter(obj => {
    if (filter === "all") return true;
    if (filter === "quick") return obj.duration === "1 turn";
    if (filter === "team") return obj.requirements.some(req => req.includes("2 persons"));
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
            Outcasts' Objectives
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Complete all 10 objectives to activate the exit gates
          </p>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
          Each objective requires specific resources, time, and coordination
          </p>
        </motion.div>

         {/* Important Rules */}
         <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="bg-yellow-500/10 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-yellow-300">
                <AlertTriangle className="w-6 h-6" />
                Completion & Interruption Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Interruption Rules</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-red-300 font-semibold">Process stops if:</span> Outcast moves out of space or gets attacked</li>
                    <li>• <span className="text-red-300 font-semibold">Resources lost:</span> Must recollect all materials when restarting</li>
                    <li>• <span className="text-red-300 font-semibold">No partial progress:</span> Objectives must be completed from start</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Completion Rules</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-green-300 font-semibold">Immediate declaration:</span> Must announce completed objectives at the end of the turn</li>
                    <li>• <span className="text-green-300 font-semibold">Show to Warden:</span> Completed objective cards must be revealed</li>
                    <li>• <span className="text-green-300 font-semibold">Gates open:</span> Only after ALL 10 objectives are completed</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {[
            { key: "all", label: "All Objectives", color: "gray" },
            { key: "quick", label: "Quick (1 Turn)", color: "green" },
            { key: "team", label: "Team Required", color: "blue" }
          ].map((filterOption) => (
            <motion.button
              key={filterOption.key}
              onClick={() => setFilter(filterOption.key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${filter === filterOption.key
                ? `bg-${filterOption.color}-500/20 text-${filterOption.color}-300 border border-${filterOption.color}-400/30`
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterOption.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Objectives Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence>
            {filteredObjectives.map((objective, index) => {
              const IconComponent = objective.icon;
              const isSelected = selectedObjective === index;

              return (
                <motion.div
                  key={objective.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  layout
                >
                  <Card
                    className={`bg-gray-800/70 border-gray-600 hover:bg-gray-800/90 transition-all duration-300 cursor-pointer overflow-hidden ${isSelected ? 'ring-2 ring-blue-400 scale-105' : ''
                      }`}
                    onClick={() => setSelectedObjective(isSelected ? null : index)}
                  >
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${iconColors[objective.color]}`}
                        whileHover={{ rotate: 10, scale: 1.1 }}
                      >
                        <IconComponent className="w-8 h-8" />
                      </motion.div>
                      <CardTitle className="text-xl text-white">{objective.name}</CardTitle>

                      {/* Quick Info Badges */}
                      <div className="flex flex-wrap justify-center gap-2 mt-3">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                          <Clock className="w-3 h-3 mr-1" />
                          {objective.duration}
                        </Badge>
                        <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
                          <MapPin className="w-3 h-3 mr-1" />
                          {objective.location.split(' ')[0]}...
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-200 leading-relaxed">{objective.description}</p>

                      <div className="space-y-2">
                        <h4 className="font-semibold text-yellow-300 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Requirements
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {objective.requirements.map((req, reqIndex) => (
                            <Badge key={reqIndex} className="bg-gray-700/50 text-gray-200 text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            className="space-y-4 pt-4 border-t border-gray-600"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="space-y-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-purple-300" />
                                <h4 className="font-semibold text-purple-300">Location</h4>
                              </div>
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                                {objective.location}
                              </p>
                            </motion.div>

                            <motion.div
                              className="space-y-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-300" />
                                <h4 className="font-semibold text-orange-300">Notes</h4>
                              </div>
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                                {objective.notes}
                              </p>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="text-center pt-2">
                        <motion.p
                          className="text-xs text-gray-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          {isSelected ? 'Click to collapse' : 'Click for details'}
                        </motion.p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="bg-yellow-900/20 border-yellow-600/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-yellow-400">
                <Info className="w-6 h-6" />
                Next Step
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-gray-300">
                Now that you’ve learned what objectives need to be completed by the Outcasts in the game, you can move on to the <a href="/card"><span className="text-yellow-400 font-semibold">Power & Evolution Card</span></a> section
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}