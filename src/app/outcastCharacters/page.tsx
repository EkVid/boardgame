
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Heart,
  Package,
  Zap,
  AlertTriangle,
  Hammer,
  Info,
  Shuffle,
  Activity,
  ShoppingBag,
  Target,
  Shield,
  Swords,
  Wrench
} from "lucide-react";

const characters = [
  {
    name: "The Architect",
    icon: Hammer,
    hp: 2,
    resources: 4,
    items: 0,
    description: "A highly skilled architect that knows how to build effectively, but he is stubborn and scared of height and darkness",
    passiveName1: 'MasterCraft:',
    passive1: "If the architect is in the game (not in coma or eliminated), then all the building costs are reduced by 1 including traps, excluding repairs",
    abilityName1: "Fortify",
    ability1: "Can instantly build a wall in current space every 3 turns (does not satisfy objectives).",
    coolDown1: 3,
    drawbackName1: "Stubborn Pride",
    drawback1: "Won't accept help from others - cannot participate in objectives that require more than 1 person",
    drawbackName2: "Phobias",
    drawback2: "Cannot climb to the top of towers or go underground",
    color: "orange",
  },
  {
    name: "The Trickster",
    icon: Shuffle,
    hp: 2,
    resources: 2,
    items: 2,
    description: "A manipulator who thrives on deception and misdirection. Outcasts can never be fully sure whether he’s helping or just playing his own game",
    passiveName1: "Misdirection",
    passive1: "Whenever the Trickster is attacked by the hunter, the hunter must flip a coin: on success, the attack hits as normal; on failure, the Trickster dodges ",
    abilityName1: "Switcheroo",
    ability1: "Instantly swap places with another Outcast within 2 spaces, phasing through all obstacles. Can swap with Outcast in coma. Refreshes immediately if the new position after swapping is within 1 space to the Warden",
    coolDown1: 3,
    drawbackName1: "Mischief Maker",
    drawback1: "The Trickster enjoys playing tricks and is terrible at focusing. Whenever the Trickster participates in completing an objective, it takes +1 extra turn to finish",
    color: "purple",
  },
  {
    name: "The Medic",
    icon: Activity,
    hp: 2,
    resources: 3,
    items: 1,
    description: "A trained professiontal who carries scraps of medical knowledge and supplies, but bad at fighting",
    passiveName1: "Healer",
    passive1: "All Outcasts can heal each other from 1 space away instead of in the same space",
    passiveName2: "Doctor",
    passive2: "Outcasts revived by the Medic return with 1.5 HP instead of 1",
    abilityName1: "Emergency Patch",
    ability1: "Instantly restore 1 HP to self or another Outcast in the same space",
    coolDown1: 2,
    drawbackName1: "Pacifist",
    drawback1: "Cannot carry offensive items or set traps",
    drawbackName2: "Fragile Soul",
    drawback2: "All damage from Warden has x1.25 effect",
    color: "green",
  },
  {
    name: "Thief",
    icon: ShoppingBag,
    hp: 1,
    resources: 3,
    items: 1,
    description: "A nimble outlaw who relies on speed and cunning to survive. Quick to slip away, but selfish habits make them hard to trust",
    passiveName1: "Pickpocket",
    passive1: "When collecting resources, may collect +1 additional resource of the same type",
    abilityName1: "Smoke Bomb",
    ability1: "Immediately move up to 2 spaces in any direction. Cannot cross objects or rive",
    coolDown1: 1,
    drawbackName1: "Suspicious Reputation",
    drawback1: "Reviving/healing with thief takes an extra turn",
    drawbackName2: "Greedy Hands",
    drawback2: "Whenever the Thief moves into a space with other Outcasts, he must steal a resource / item from all Oucasts in that space. And he cannot give/exchange items/resource",
    color: "gray",
  },
  {
    name: "Hunter",
    icon: Target,
    hp: 4,
    resources: 1,
    items: 3,
    description: "An expert tracker who relies on hunting preys to survive. Have sharp shooting skills and good strength, but moves slowly",
    passiveName1: "",
    passive: "Iron Will: Immune to first hit from Warden and all knockback effects. Arsenal: Starts with 2 cursed traps and soul rifle (cannot be discarded).",
    ability: "Soul Shot: Fire spectral bullets at Warden from 2 spaces in straight line (2 shots total). Trap Master: Set cursed trap on current/adjacent space once per turn - stuns Warden when triggered.",
    drawback: "Burden of Sin: Needs extra move action to advance 1 space due to spiritual weight.",
    color: "red",
  },
  {
    name: "The Damned Boxer",
    icon: Swords,
    hp: 3,
    resources: 3,
    items: 1,
    description: "A champion fighter whose spirit burns with unquenchable rage. Combat expertise makes them formidable, but protective instincts can be their downfall.",
    passive: "Phoenix Spirit: When reduced to 0 HP, immediately regain +1 HP (once per game). Death's Dance: When at 1 HP or below, all damage to Warden is doubled.",
    ability: "Soul Strike: Attack Warden in same space with spectral fists (Cooldown: 3 turns). Wraith Rush: Dash up to 2 spaces, knock back Warden 1 space, stun if hitting obstacle (Cooldown: 4 turns).",
    drawback: "Guardian's Curse: Must move toward fallen allies until revived. Spiritual Exhaustion: Skip next turn after dealing 1+ damage to Warden in single turn.",
    color: "blue",
  },
  {
    name: "The Mad Mechanic",
    icon: Wrench,
    hp: 2,
    resources: 2,
    items: 1,
    description: "A brilliant inventor whose mind snapped in the prison realm. Can animate mechanical horrors to assist, but their creations demand constant attention.",
    passive: "Efficient Restoration: All repair actions require 1 less material. Necromechanics: Can construct/control spectral robots (2 max per game, 8 total actions).",
    ability: "Animate Construct: Create ghost robot on adjacent space. Construct has 1 HP, holds 1 resource/item, no special abilities. Can control even when unconscious. Limit: 2 robots, 8 total actions.",
    drawback: "Obsessive Focus: Cannot move same turn Robot Control is used. Fractured Mind: All damage from Warden counts as 2x damage due to mental instability.",
    color: "cyan",
  }
];

const iconColors: Record<string, string> = {
  orange: "text-orange-300 bg-orange-500/20",
  purple: "text-purple-300 bg-purple-500/20",
  green: "text-green-300 bg-green-500/20",
  gray: "text-gray-300 bg-gray-500/20",
  red: "text-red-300 bg-red-500/20",
  blue: "text-blue-300 bg-blue-500/20",
  cyan: "text-cyan-300 bg-cyan-500/20"
};

const borderColors: Record<string, string> = {
  orange: "border-orange-400/30",
  purple: "border-purple-400/30",
  green: "border-green-400/30",
  gray: "border-gray-400/30",
  red: "border-red-400/30",
  blue: "border-blue-400/30",
  cyan: "border-cyan-400/30"
};

export default function OutcastCharacters() {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);

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
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
            Outcasts' Characters
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Reference to all characters that can be chosen as an outcast
          </p>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Each character has special ability, strength, and weakness
          </p>
        </motion.div>

        {/* Character Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {characters.map((character, index) => {
            const IconComponent = character.icon;
            const isSelected = selectedCharacter === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                layout
              >
                <Card
                  className={`bg-gray-800/70 ${borderColors[character.color]} hover:bg-gray-800/90 transition-all duration-300 cursor-pointer overflow-hidden ${isSelected ? `ring-2 ring-${character.color}-400 scale-105` : ''
                    }`}
                  onClick={() => setSelectedCharacter(isSelected ? null : index)}
                >
                  <CardHeader className="text-center">
                    <motion.div
                      className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 ${iconColors[character.color]}`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <IconComponent className="w-10 h-10" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">{character.name}</h3>
                    <div className="flex justify-center gap-2">
                      <Badge className="bg-red-500/20 text-red-300 border-red-400/30">
                        <Heart className="w-3 h-3 mr-1" />
                        {character.hp} HP
                      </Badge>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
                        <Package className="w-3 h-3 mr-1" />
                        {character.resources} Resource / {character.items} Items
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-4 pt-4">
                    <p className="text-gray-200 leading-relaxed text-center">{character.description}</p>

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
                              <Zap className="w-4 h-4 text-emerald-300" />
                              <h4 className="font-semibold text-emerald-300">Passive Trait - {character.passiveName1}</h4>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              {character.passive1}
                            </p>
                          </motion.div>

                          {character.passive2 && 
                           <motion.div
                           className="space-y-2"
                           initial={{ x: -20, opacity: 0 }}
                           animate={{ x: 0, opacity: 1 }}
                           transition={{ delay: 0.1 }}
                          >
                            <div className="flex items-center gap-2">
                              <Zap className="w-4 h-4 text-emerald-300" />
                              <h4 className="font-semibold text-emerald-300">Passive Trait - {character.passiveName2}</h4>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              {character.passive2}
                            </p>
                          </motion.div>
                          }

                          <motion.div
                            className="space-y-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-blue-300" />
                              <h4 className="font-semibold text-blue-300">Ability - {character.abilityName1}</h4>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              {character.ability1}
                            </p>
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              CoolDown: {character.coolDown1} turns
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            <div className="flex items-center gap-2">
                              <AlertTriangle className="w-4 h-4 text-red-300" />
                              <h4 className="font-semibold text-red-300">Weakness - {character.drawbackName1}</h4>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              {character.drawback1}
                            </p>
                          </motion.div>

                          { character.drawbackName2 && 
                            <motion.div
                            className="space-y-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            >
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-300" />
                                <h4 className="font-semibold text-red-300">Weakness - {character.drawbackName2}</h4>
                              </div>
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                                {character.drawback2}
                              </p>
                            </motion.div>
                          }
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="text-center pt-2">
                      <motion.p
                        className="text-xs text-gray-400"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        {isSelected ? 'Click to collapse' : 'Click to reveal torments'}
                      </motion.p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Strategy Tips */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Card className="bg-emerald-500/10 border-emerald-400/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl text-emerald-300">
                <Users className="w-6 h-6" />
                Realm Survival Strategies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Forbidden Synergies</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-emerald-300 font-semibold">The Architect's dark craft:</span> Reduced construction costs aid the survival of all souls.</li>
                    <li>• <span className="text-emerald-300 font-semibold">The Medic's forbidden healing:</span> Soul Mending from a distance keeps allies from succumbing.</li>
                    <li>• <span className="text-emerald-300 font-semibold">The Hunter's vengeful aim:</span> Spectral shots and cursed traps provide protection and ward off horrors.</li>
                    <li>• <span className="text-emerald-300 font-semibold">The Mechanic's vile constructs:</span> Spectral robots offer additional, albeit fragile, assistance.</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-white">Confronting the Curse</h3>
                  <ul className="space-y-2 text-sm text-gray-200">
                    <li>• <span className="text-red-300 font-semibold">Embrace the limitations:</span> Navigate the inherent curses of each soul.</li>
                    <li>• <span className="text-red-300 font-semibold">Guard the fragile:</span> Shield those with weak spirits from the Warden's wrath.</li>
                    <li>• <span className="text-red-300 font-semibold">Lend your strength:</span> Compensate for the spectral weaknesses of your companions.</li>
                    <li>• <span className="text-red-300 font-semibold">Ponder the delays:</span> Coordinate actions around the temporal anomalies.</li>
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
                Now that you’ve learned what objectives need to be completed by the Outcasts in the game, you can move on to the <a href="/resourceItem"><span className="text-yellow-400 font-semibold">Resources & Items</span></a> section
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
