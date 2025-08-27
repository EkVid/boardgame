"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Users,
  Shield,
  ArrowRight,
  Clock,
  Target,
  Zap,
  RefreshCw,
  Crown,
  CheckCircle2,
  Info
} from "lucide-react";

const gamePhases = [
  {
    title: "Warden's Turn",
    icon: Shield,
    color: "red",
    phases: [
      {
        name: "Phase 1 - Preparation",
        icon: Target,
        actions: [
          "Trigger all good/bad effects if possible",
          "Use warden cards ability if possible"
        ]
      },
      {
        name: "Phase 2 - Actions",
        icon: Zap,
        actions: [
          "Choose 2 of the 5 actions to perform (can repeat):",
          "• Move - go to any direction of up to 2 spaces (can be a mix of 2 directions)",
          "• Attack - Deal 1 HP damage to an outcast in the same space",
          "• Prepare - Draw an Evolution Card",
          "• Ability - Use one of the abilities",
          "• Break - Destroy a building or a trap"
        ]
      },
      {
        name: "Phase 3 - Refresh & Strategy",
        icon: RefreshCw,
        actions: [
          "Refresh cooldowns for abilities if possible",
          "Remove timed effects if time has passed"
        ]
      },
      {
        name: "Phase 4 - Evolution",
        icon: CheckCircle2,
        actions: [
          "Declare any completed objective cards",
          "Upgrade ability if possible (1 completed Evolution Card can upgrade 1 ability)"
        ]
      }
    ]
  },
  {
    title: "Outcasts' Turn",
    icon: Users,
    color: "emerald",
    phases: [
      {
        name: "Phase 1 - Preparation",
        icon: Target,
        actions: [
          "ALL outcasts execute in order:",
          "• Trigger all good/bad effects if possible",
          "• Discussion among outcasts for next actions"
        ]
      },
      {
        name: "Phase 2 - Actions",
        icon: Zap,
        actions: [
          "Each outcast chooses 2 of 5 actions (can repeat):",
          "• Harvest - Collect 1 resource based on current space",
          "• Move - move 1 space to any direction",
          "• Revive - Revive another outcast from coma state",
          "• Heal - Heal another outcast in the same space",
          "• Interact - One of the Interact actions (use item, use ability, complete objective, open gate, build, repair, find item)"
        ]
      },
      {
        name: "Phase 3 - Refresh & Strategy",
        icon: RefreshCw,
        actions: [
          "ALL outcasts execute in order:",
          "• Refresh cooldowns for abilities if possible",
          "• Remove timed effects if time has passed",
          "• Discard, give or exchange items with outcasts in the same space",
          "• Declare any finished objective cards"
        ]
      }
    ]
  }
];

export default function GameFlow() {
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [selectedSubPhase, setSelectedSubPhase] = useState(0);

  const currentPhase = gamePhases[selectedPhase];
  const currentSubPhase = currentPhase.phases[selectedSubPhase];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-300 to-cyan-400 bg-clip-text text-transparent">
            Game Flow
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Learn the turn based structure and phase system that drives Play Ground's gameplay
          </p>
        </motion.div>

        {/* Turn Order Overview */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Card className="bg-gray-800/70 border-gray-600 max-w-2xl w-full">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl text-white">
                <Play className="w-6 h-6 text-cyan-300" />
                Turn Order
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-red-500/20 rounded-lg border border-red-400/30">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-red-300" />
                  <span className="text-red-300 font-semibold text-sm sm:text-base">Warden</span>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
                <div className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-emerald-500/20 rounded-lg border border-emerald-400/30">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300" />
                  <span className="text-emerald-300 font-semibold text-sm sm:text-base">All Outcasts</span>
                </div>
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" />
                <div className="flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300" />
                  <span className="text-cyan-300 font-semibold text-sm sm:text-base">Next Round</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>


        {/* Phase Selection */}
        <motion.div
          className="flex justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {gamePhases.map((phase, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setSelectedPhase(index);
                setSelectedSubPhase(0);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${selectedPhase === index
                  ? `bg-${phase.color}-500/20 text-${phase.color}-300 border border-${phase.color}-400/30 scale-105`
                  : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 hover:scale-105'
                }`}
              whileHover={{ scale: selectedPhase === index ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              <phase.icon className="w-5 h-5" />
              {phase.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Sub-Phase Navigation */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="flex gap-2 p-2 bg-gray-800/50 rounded-2xl">
            {currentPhase.phases.map((subPhase, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedSubPhase(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${selectedSubPhase === index
                    ? `bg-${currentPhase.color}-500/20 text-${currentPhase.color}-300`
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <subPhase.icon className="w-4 h-4" />
                Phase {index + 1}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Phase Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedPhase}-${selectedSubPhase}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <Card className={`bg-gray-800/70 border-gray-600 ${currentPhase.color === 'red' ? 'border-red-400/30' : 'border-emerald-400/30'
              }`}>
              <CardHeader className="text-center">
                <motion.div
                  className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 ${currentPhase.color === 'red' ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <currentSubPhase.icon className="w-10 h-10" />
                </motion.div>

                <div className="flex items-center justify-center gap-3 mb-4">
                  <Badge className={`${currentPhase.color === 'red' ? 'bg-red-500/20 text-red-300 border-red-400/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                    } px-3 py-1`}>
                    {currentPhase.title}
                  </Badge>
                </div>

                <CardTitle className="text-3xl text-white mb-4">
                  {currentSubPhase.name}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  {currentSubPhase.actions.map((action, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 p-4 bg-gray-900/30 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                    >
                      {action.startsWith('•') ? (
                        <>
                          <div className="w-2 h-2 bg-cyan-300 rounded-full mt-2 flex-shrink-0" />
                          <p className="text-gray-200 leading-relaxed">{action.substring(2)}</p>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${currentPhase.color === 'red' ? 'text-red-300' : 'text-emerald-300'
                            }`} />
                          <p className="text-gray-200 leading-relaxed font-medium">{action}</p>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-600">
                <button
                  onClick={() => setSelectedSubPhase(Math.max(0, selectedSubPhase - 1))}
                  disabled={selectedSubPhase === 0}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-gray-700/50 text-gray-300 text-sm sm:text-base hover:bg-gray-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 rotate-180" />
                  <span>Previous Phase</span>
                </button>


                  <div className="text-sm text-gray-400">
                    Phase {selectedSubPhase + 1} of {currentPhase.phases.length}
                  </div>

                  <button
                    onClick={() => setSelectedSubPhase(Math.min(currentPhase.phases.length - 1, selectedSubPhase + 1))}
                    disabled={selectedSubPhase === currentPhase.phases.length - 1}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg bg-gray-700/50 text-gray-300 text-sm sm:text-base hover:bg-gray-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next Phase
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Key Rules */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="bg-blue-500/10 border-blue-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-300">
                <Crown className="w-6 h-6" />
                Quick Gameflow Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Phase Execution</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-red-300 font-semibold">Warden first:</span> Always completes entire turn before Outcasts</li>
                    <li>• <span className="text-emerald-300 font-semibold">Outcast synchronization:</span> All Outcasts complete each phase together in order</li>
                    <li>• <span className="text-blue-300 font-semibold">No interruption:</span> Complete each phase fully before moving to next</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Action Rules</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-yellow-300 font-semibold">Action selection:</span> Choose 2 actions per turn (can repeat same action)</li>
                    <li>• <span className="text-purple-300 font-semibold">Cooldown tracking:</span> Abilities refresh at designated phases</li>
                    <li>• <span className="text-orange-300 font-semibold">Declaration timing:</span> Objectives/Evolution Cards declared at the end of last phase</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Important Notes */}
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
              Now that you’ve learned the structure of the game, you can move on to the <a href="/objectives"><span className="text-yellow-400 font-semibold">Objective Card</span></a> section
            </p>
          </CardContent>
        </Card>
        </motion.div>
      </div>
    </div>
  );
}