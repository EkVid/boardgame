"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Users,
  Map,
  Crown,
  CheckCircle2,
  ArrowRight,
  AlertCircle
} from "lucide-react";

const setupSteps = [
  {
    step: 1,
    title: "Place 3D Objects",
    icon: Map,
    description: "Set up the map with all terrain features and components",
    details: [
      "Place wall components on designated spaces",
      "Position 2 tower pieces on the map",
      "Place tunnel piece in designated location",
      "Add bridge component area markers",
      "Place resource markers throughout map",
      "Position 2 gate markers at exit points"
    ],
    color: "blue"
  },
  {
    step: 2,
    title: "Character Selection",
    icon: Users,
    description: "Each player chooses their character and receives their player card",
    details: [
      "Outcasts pick from available characters",
      "Each gets unique player card with abilities",
      "Warden selects from 3 available Warden types",
      "All players familiarize with their abilities",
      "Set up character-specific starting items",
      "Note any special starting conditions"
    ],
    color: "green"
  },
  {
    step: 3,
    title: "Spawning Positions",
    icon: Crown,
    description: "Players choose their starting positions following placement rules",
    details: [
      "Outcasts choose spawn locations first",
      "Must be at least 3 spaces from each other",
      "Split evenly across both sides of river (minimum floor(N/2))",
      "Cannot spawn on marker locations",
      "Warden spawns last, at least 3 spaces from any Outcast",
      "Use suggested spawn points for balanced gameplay"
    ],
    color: "purple"
  },
  {
    step: 4,
    title: "Card Setup",
    icon: CheckCircle2,
    description: "Distribute objective cards and set up Warden abilities",
    details: [
      "Outcasts receive 10 objective cards",
      "Warden draws 2 Warden cards, chooses 1 ability",
      "Warden draws 2 objective cards for personal goals",
      "Keep unused cards accessible for later draws",
      "Set up evolution tracking for Warden",
      "Prepare item discovery deck"
    ],
    color: "yellow"
  }
];

export default function Setup() {
  const [activeStep, setActiveStep] = useState(0);

  const getStepColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-400/30' };
      case 'green': return { bg: 'bg-green-500/20', text: 'text-green-300', border: 'border-green-400/30' };
      case 'purple': return { bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-400/30' };
      case 'yellow': return { bg: 'bg-yellow-500/20', text: 'text-yellow-300', border: 'border-yellow-400/30' };
      default: return { bg: 'bg-gray-500/20', text: 'text-gray-300', border: 'border-gray-400/30' };
    }
  };

  const currentStep = setupSteps[activeStep];
  const colorClasses = getStepColorClasses(currentStep.color);

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
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Setup Guide
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Follow these steps to set up your game of Shadowbreak. Proper setup ensures balanced and engaging gameplay.
          </p>
        </motion.div>

        {/* Step Navigation */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex gap-4 p-2 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
            {setupSteps.map((step, index) => {
              const stepColorClasses = getStepColorClasses(step.color);
              return (
                <motion.button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${activeStep === index
                    ? `${stepColorClasses.bg} ${stepColorClasses.text} border ${stepColorClasses.border}`
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="hidden sm:block">Step {step.step}</span>
                  <span className="sm:hidden">{step.step}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Step Content */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-gray-800/70 border-gray-600">
            <CardHeader className="text-center">
              <motion.div
                className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 ${colorClasses.bg} ${colorClasses.text}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <currentStep.icon className="w-10 h-10" />
              </motion.div>

              <div className="flex items-center justify-center gap-3 mb-4">
                <Badge className={`${colorClasses.bg} ${colorClasses.text} ${colorClasses.border} px-3 py-1`}>
                  Step {currentStep.step}
                </Badge>
              </div>

              <CardTitle className="text-3xl text-white mb-4">
                {currentStep.title}
              </CardTitle>
              <p className="text-lg text-gray-200">
                {currentStep.description}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid gap-4">
                {currentStep.details.map((detail, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-900/30 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                  >
                    <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colorClasses.text}`} />
                    <p className="text-gray-200 leading-relaxed">{detail}</p>
                  </motion.div>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-600">
                <button
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Previous
                </button>

                <div className="text-sm text-gray-400">
                  {activeStep + 1} of {setupSteps.length}
                </div>

                <button
                  onClick={() => setActiveStep(Math.min(setupSteps.length - 1, activeStep + 1))}
                  disabled={activeStep === setupSteps.length - 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="bg-orange-500/10 border-orange-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-orange-300">
                <AlertCircle className="w-6 h-6" />
                Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Player Count</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-green-300 font-semibold">2-3 players:</span> 1 Warden, 1-2 Outcasts</li>
                    <li>• <span className="text-green-300 font-semibold">4-6 players:</span> 1 Warden, 3-5 Outcasts</li>
                    <li>• <span className="text-green-300 font-semibold">7-8 players:</span> 1 Warden, 6-7 Outcasts</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Spawn Rules</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-blue-300 font-semibold">Minimum distance:</span> 3 spaces between all players</li>
                    <li>• <span className="text-blue-300 font-semibold">River split:</span> At least floor(N/2) on each side</li>
                    <li>• <span className="text-blue-300 font-semibold">No markers:</span> Cannot spawn on item markers</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Turn Order</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-purple-300 font-semibold">Warden first:</span> Always goes first each round</li>
                    <li>• <span className="text-purple-300 font-semibold">Outcasts phases:</span> All complete phase 1, then phase 2, etc.</li>
                    <li>• <span className="text-purple-300 font-semibold">Simultaneous:</span> Within phases, outcasts act together</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}