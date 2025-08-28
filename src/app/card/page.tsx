"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Info,
  Users,
  Clock,
  Zap,
  Heart,
  Target,
  AlertTriangle,
  Crown,
  Skull
} from "lucide-react";

interface CardItem {
  name: string;
  description: string;
  cooldown?: string;
  durability?: string;
  type: string;
  color: string;
}

const wardenCards: CardItem[] = [
  {
    name: "Crushing Strike",
    description: "On the Warden's next attack (this turn), it deals +0.5 extra damage",
    cooldown: "4 turns",
    type: "combat",
    color: "red"
  },
  {
    name: "Dark Regeneration",
    description: "The Warden instantly heals +1 HP",
    cooldown: "4 turns",
    type: "healing",
    color: "green"
  },
  {
    name: "Hunter's Roar",
    description: "All Outcasts' objectives that are in progress will be disrupted",
    cooldown: "4 turns",
    type: "disruption",
    color: "purple"
  },
  {
    name: "Dark Barrier",
    description: "The Warden gains +1 Shield instantly",
    cooldown: "4 turns",
    type: "defense",
    color: "blue"
  },
  {
    name: "Relentless Pursuit",
    description: "The Warden immediately moves up to 3 spaces in a straight line to any direction. Cannot pass through objects or river",
    cooldown: "4 turns",
    type: "movement",
    color: "yellow"
  },
  {
    name: "Fallen Angel",
    description: "The Warden's HP will not fall below 1 until the end of its next turn.",
    cooldown: "Once per game",
    type: "special",
    color: "orange"
  }
];

const wardenObjectives: CardItem[] = [
  {
    name: "Damage Dealer",
    description: "Deal a total of 3 HP damage to any outcasts",
    type: "combat",
    color: "red"
  },
  {
    name: "Predator's Chase",
    description: "Successfully move into the same space as 3 different outcasts",
    type: "positioning",
    color: "blue"
  },
  {
    name: "Unstoppable Force",
    description: "Destroy 4 objects (walls, traps, or built structures) on the map",
    type: "destruction",
    color: "orange"
  },
  {
    name: "Bloodthirst",
    description: "Put a total of 2 outcasts into coma state in the game",
    type: "combat",
    color: "red"
  },
  {
    name: "Apex Predator",
    description: "Damage every outcast",
    type: "combat",
    color: "purple"
  },
  {
    name: "Battle Scars",
    description: "Take 2 or more total damage from Outcasts",
    type: "defense",
    color: "gray"
  }
];

const outcastItems: CardItem[] = [
  {
    name: "First Aid Kit",
    description: "Heals 1 HP instantly to yourself when used",
    durability: "1 use",
    type: "healing",
    color: "green"
  },
  {
    name: "Rope",
    description: "Pull another Outcast in an adjacent space into your space (helpful for revives or saving someone). Pull yourself to an object in an adjacent space",
    durability: "1 use",
    type: "utility",
    color: "brown"
  },
  {
    name: "Molotov Cocktail",
    description: "Throw into an adjacent space and deals 1 HP damage to the Warden if they are in that space. Also deals 1 HP damage to any outcast in that space",
    durability: "1 use",
    type: "combat",
    color: "red"
  },
  {
    name: "Adrenaline Shot",
    description: "Boosts an Outcast's stamina. That Outcast can take +1 extra action immediately. Side Effect: Afterward, they lose 0.5 HP from exhaustion",
    durability: "1 use",
    type: "enhancement",
    color: "yellow"
  },
  {
    name: "Sprint Boots",
    description: "The outcast can instantly move up to 2 spaces in any direction. Cannot cross rivers or walls",
    durability: "1 use",
    type: "movement",
    color: "blue"
  },
  {
    name: "Stone Sword",
    description: "When used in the same space as the Warden, the outcast may perform an attack that deals 1 HP damage. If the warden has 3 HP or higher, the attack instead deals 2 HP damage",
    durability: "2 hits",
    type: "combat",
    color: "gray"
  },
  {
    name: "Scrap Shield",
    description: "When the outcast holding the shield take damage from the Warden, they can choose to block the attack, reducing damage to 0. Can also block damage for another outcast in the same space",
    durability: "2 HP blocked",
    type: "defense",
    color: "silver"
  }
];

const typeColors: Record<string, string> = {
  combat: "bg-red-500/20 text-red-300 border-red-400/30",
  healing: "bg-green-500/20 text-green-300 border-green-400/30",
  disruption: "bg-purple-500/20 text-purple-300 border-purple-400/30",
  defense: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  movement: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
  special: "bg-orange-500/20 text-orange-300 border-orange-400/30",
  positioning: "bg-cyan-500/20 text-cyan-300 border-cyan-400/30",
  destruction: "bg-orange-500/20 text-orange-300 border-orange-400/30",
  survival: "bg-gray-500/20 text-gray-300 border-gray-400/30",
  utility: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30",
  enhancement: "bg-pink-500/20 text-pink-300 border-pink-400/30",
  brown: "bg-amber-700/20 text-amber-300 border-amber-600/30",
  silver: "bg-slate-500/20 text-slate-300 border-slate-400/30"
};

export default function Cards() {
  const [activeTab, setActiveTab] = useState("warden-cards");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const tabs = [
    { key: "warden-cards", label: "Power Cards", icon: Crown, data: wardenCards },
    { key: "warden-objectives", label: "Evolution Cards", icon: Target, data: wardenObjectives },
    // { key: "outcast-items", label: "Outcast Items", icon: Users, data: outcastItems }
  ];

  const currentData = tabs.find(tab => tab.key === activeTab)?.data || [];

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
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-300 to-pink-400 bg-clip-text text-transparent">
            Warden's Power & Evolution Cards
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Reference for all Warden's Power and Evolution Cards
          </p>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Complete Evolution Cards to upgrade abilities and use Power Card Ability to help you in the game
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex gap-2 p-2 bg-gray-800/50 rounded-2xl backdrop-blur-sm">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key);
                  setSelectedCard(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${activeTab === tab.key
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:block">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <AnimatePresence>
            {currentData.map((item, index) => {
              const isSelected = selectedCard === index;

              return (
                <motion.div
                  key={`${activeTab}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  layout
                >
                  <Card
                    className={`bg-gray-800/70 border-gray-600 hover:bg-gray-800/90 transition-all duration-300 cursor-pointer overflow-hidden ${isSelected ? 'ring-2 ring-purple-400 scale-105' : ''
                      }`}
                    onClick={() => setSelectedCard(isSelected ? null : index)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center items-center gap-2 mb-3">
                        {activeTab === "warden-cards" && <Crown className="w-5 h-5 text-red-300" />}
                        {activeTab === "warden-objectives" && <Target className="w-5 h-5 text-red-300" />}
                        {activeTab === "outcast-items" && <Users className="w-5 h-5 text-emerald-300" />}

                        <Badge className={typeColors[item.type] || 'bg-gray-500/20 text-gray-300'}>
                          {item.type}
                        </Badge>
                      </div>

                      <CardTitle className="text-xl text-white">{item.name}</CardTitle>

                      {/* Cooldown/Durability */}
                      {(item.cooldown || item.durability) && (
                        <div className="flex justify-center mt-3">
                          <Badge className="bg-gray-700/50 text-gray-200">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.cooldown || item.durability}
                          </Badge>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-200 leading-relaxed text-sm">
                        {item.description}
                      </p>

                      {/* Special Effects for Items */}
                      {activeTab === "outcast-items" && item.name === "Adrenaline Shot" && (
                        <div className="bg-yellow-500/10 border border-yellow-400/30 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-semibold text-yellow-300">Side Effect</span>
                          </div>
                          <p className="text-xs text-gray-200">Lose 0.5 HP after use</p>
                        </div>
                      )}

                      <div className="text-center pt-2">
                        <motion.p
                          className="text-xs text-gray-400"
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                        </motion.p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Usage Tips */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Card className="bg-blue-500/10 border-blue-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-blue-300">
                <Zap className="w-6 h-6" />
                Strategic Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Crown className="w-5 h-5 text-red-300" />
                    Power Cards
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-red-300 font-semibold">First Power Card:</span> Choose the first Power Card Ability wisely based on the Outcasts' team composition</li>
                    <li>• <span className="text-red-300 font-semibold">Combo potential:</span> Combine movement and combat abilities have good impact</li>
                    <li>• <span className="text-red-300 font-semibold">Additional Power Card:</span> Getting new Power Card Ability can be really helpful sometimes</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-300" />
                    Evolution Cards
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-blue-300 font-semibold">Multiple Paths:</span> Focus on achievable ones first to upgrade abilities</li>
                    <li>• <span className="text-blue-300 font-semibold">Plan Wisely:</span>The difficulty of completing certain cards varies depending on the Warden's character</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
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
                Now that you’ve learned what Power & Evolution Cards there are for the Warden, you can move on to the <a href="/outcastCharacters"><span className="text-yellow-400 font-semibold">Outcasts' Characters</span></a> section
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}