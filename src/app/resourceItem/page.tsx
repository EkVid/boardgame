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
  Hammer,
  AlertTriangle,
  Box,
  Pickaxe
} from "lucide-react";

interface CardItem {
  name: string;
  description: string;
  durability?: string;
  type: string;
  color: string;
}

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
    description: "Pull another Outcast in an adjacent space into your space. Or pull yourself to an object in an adjacent space",
    durability: "1 use",
    type: "utility",
    color: "brown"
  },
  {
    name: "Sprint Boots",
    description: "The outcast can instantly move up to 2 spaces in any direction. Cannot cross rivers or walls",
    durability: "1 use",
    type: "movement",
    color: "blue"
  },
  {
    name: "Molotov Cocktail",
    description: "Throw into an adjacent space and deals 1 HP damage to the Warden if they are in that space",
    durability: "1 use",
    type: "combat",
    color: "red"
  },
  {
    name: "Adrenaline Shot",
    description: "Boosts an Outcast's stamina. That Outcast can take +1 extra action immediately",
    durability: "1 use",
    type: "enhancement",
    color: "yellow"
  },
  {
    name: "Scrap Shield",
    description: "When the outcast holding the shield take damage from the Warden, they can choose to block the attack, reducing damage to 0. Can also block damage for another outcast in the same space",
    durability: "2 HP blocked",
    type: "defense",
    color: "silver"
  },
  {
    name: "Stone Sword",
    description: "When used in the same space as the Warden, the outcast may perform an attack that deals 1 HP damage. If the warden has 3 HP or higher, the attack instead deals 2 HP damage",
    durability: "2 hits",
    type: "combat",
    color: "gray"
  }
];

const defaultItems: CardItem[] = [
    {
      name: "Hunting Rifle",
      description:
        "Default item for Outcast character - Hunter. Can target the Warden from 2 spaces away in a straight line, but cannot fire through objects. If an obstacle is in the way, the bullet destroys that object instead. On a clear hit, deals 1 HP damage to the Warden.",
      durability: "2 bullets",
      type: "Hunter",
      color: "gray",
    },
    {
      name: "Bear Trap",
      description:
        "Default item for Outcast character - Hunter. Place this trap in your current space. If the Warden enters, it is triggered and deals 1 HP damage while stopping their movement for the rest of that turn.",
      durability: "2 traps",
      type: "Hunter",
      color: "red",
    },
    {
      name: "Boxing Glove",
      description:
        "Default item for Outcast character - Boxer. When in the same space as the Warden, the Boxer may perform an attack to deal 1 HP damage.",
      durability: "",
      type: "Boxer",
      color: "blue",
    },
    {
      name: "Controller",
      description:
        "Default item for Outcast character - Mechanic. Construct / control a robot that's created by the mechanic.",
      durability: "",
      type: "Mechanic",
      color: "yellow",
    },
];  

const resources: CardItem[] = [
  {
    name: "Wood",
    description: "Can be collected from a space with wood label",
    durability: "1 space in inventory",
    type: "material",
    color: "brown"
  },
  {
    name: "Metal",
    description: "Can be collected from a space with metal label",
    durability: "1 space in inventory",
    type: "material",
    color: "gray"
  },
  {
    name: "Rock",
    description: "Can be collected from a space with rock label",
    durability: "1 space in inventory",
    type: "material",
    color: "purple"
  }
];

const typeColors: Record<string, string> = {
  combat: "bg-red-500/20 text-red-300 border-red-400/30",
  healing: "bg-green-500/20 text-green-300 border-green-400/30",
  defense: "bg-blue-500/20 text-blue-300 border-blue-400/30",
  movement: "bg-yellow-500/20 text-yellow-300 border-yellow-400/30",
  utility: "bg-indigo-500/20 text-indigo-300 border-indigo-400/30",
  enhancement: "bg-pink-500/20 text-pink-300 border-pink-400/30",
  material: "bg-amber-700/20 text-amber-300 border-amber-600/30",
  silver: "bg-slate-500/20 text-slate-300 border-slate-400/30",
};

export default function ResourcesAndItems() {
  const [activeTab, setActiveTab] = useState("outcast-items");
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const tabs = [
    { key: "outcast-items", label: "Outcast Items", icon: Users, data: outcastItems },
    { key: "default-items", label: "Default Items", icons: Pickaxe, data: defaultItems},
    { key: "resources", label: "Resources", icon: Box, data: resources }
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
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-300 to-yellow-400 bg-clip-text text-transparent">
            Outcast Items & Resources
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Reference for all usable Items and collectible resources in the game
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
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:block">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {activeTab === "default-items" && (
        <motion.p
            className="text-center text-gray-300 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            Some Outcasts start with their own default items, these items cannot be found from the marker in the game.
            <br />
            These items cannot be used by other Outcasts. The details will be explained in the Outcasts' Characters section.
        </motion.p>
        )}

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
                    className={`bg-gray-800/70 border-gray-600 hover:bg-gray-800/90 transition-all duration-300 cursor-pointer overflow-hidden ${isSelected ? 'ring-2 ring-emerald-400 scale-105' : ''
                      }`}
                    onClick={() => setSelectedCard(isSelected ? null : index)}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className="flex justify-center items-center gap-2 mb-3">
                        {activeTab === "outcast-items" && <Users className="w-5 h-5 text-emerald-300" />}
                        {activeTab === "resources" && <Box className="w-5 h-5 text-yellow-300" />}

                        <Badge className={typeColors[item.type] || 'bg-gray-500/20 text-gray-300'}>
                          {item.type}
                        </Badge>
                      </div>

                      <CardTitle className="text-xl text-white">{item.name}</CardTitle>

                      {/* Durability */}
                      {item.durability && (
                        <div className="flex justify-center mt-3">
                          <Badge className="bg-gray-700/50 text-gray-200">
                            <Clock className="w-3 h-3 mr-1" />
                            {item.durability}
                          </Badge>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-200 leading-relaxed text-sm">
                        {item.description}
                      </p>

                      {/* Side Effect Display */}
                      {activeTab === "outcast-items" && item.name === "Adrenaline Shot" && (
                        <div className="bg-yellow-500/10 border border-yellow-400/30 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-semibold text-yellow-300">Side Effect</span>
                          </div>
                          <p className="text-xs text-gray-200">Lose 0.5 HP after use</p>
                        </div>
                      )}

                    {/* Side Effect Display */}
                    {activeTab === "outcast-items" && item.name === "Molotov Cocktail" && (
                        <div className="bg-yellow-500/10 border border-yellow-400/30 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-300" />
                            <span className="text-sm font-semibold text-yellow-300">Side Effect</span>
                          </div>
                          <p className="text-xs text-gray-200">Also deals 1HP damage to the Outcasts in that space</p>
                        </div>
                      )}
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
                Now that you’ve learned what items and resources are there for the Outcasts to collect, you can move on to the <a href="/card"><span className="text-yellow-400 font-semibold">Power & Evolution Cards</span></a> section
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
