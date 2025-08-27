
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
    description: "A tormented soul who built the prison's cursed infrastructure. Master of dark construction, but haunted by fears of heights and shadows.",
    passive: "Cursed Mastery: If the Architect survives (not down or dead), all construction costs are reduced by 1, including traps, excluding repairs.",
    ability: "Shadow Fortify: Can instantly manifest a wall in current space through dark magic every 3 turns (does not satisfy objectives).",
    drawback: "Stubborn Pride: Won't accept help from others - cannot participate in multi-person objectives. Phobias: Cannot ascend towers or descend underground.",
    color: "orange",
  },
  {
    name: "The Trickster",
    icon: Shuffle,
    hp: 2,
    resources: 2,
    items: 2,
    description: "A cunning deceiver who manipulates reality itself. Other souls can never be certain if they're being helped or manipulated for darker purposes.",
    passive: "Reality Distortion: When attacked by the Warden, flip a coin: success = normal hit; failure = attack phases through illusion.",
    ability: "Phantom Switch: Instantly swap places with another soul within 2 spaces, phasing through all obstacles. Can swap with unconscious allies. Refreshes if ending near Warden. Cooldown: 3 turns.",
    drawback: "Chaos Bringer: Delights in cosmic jokes - all objectives take +1 extra turn when this soul participates.",
    color: "purple",
  },
  {
    name: "The Medic",
    icon: Activity,
    hp: 2,
    resources: 3,
    items: 1,
    description: "A former healer whose Hippocratic oath binds them even in this cursed realm. Carries forbidden medical knowledge but refuses violence.",
    passive: "Healing Aura: All souls can heal each other from 1 space away. Soul Mender: Souls revived by the Medic return with 1.5 HP instead of 1.",
    ability: "Life Force Transfer: Instantly restore 1 HP to self or another soul in same space through blood magic. Cooldown: 2 turns.",
    drawback: "Sacred Vows: Cannot carry offensive items or set lethal traps. Fragile Soul: All damage from Warden has x1.25 effect.",
    color: "green",
  },
  {
    name: "The Shadow Thief",
    icon: ShoppingBag,
    hp: 1,
    resources: 3,
    items: 1,
    description: "A phantom burglar who exists partially in shadow. Swift to vanish but cursed with uncontrollable kleptomania that breeds mistrust.",
    passive: "Shadow Fingers: When collecting resources, may steal +1 additional resource of the same type from the void.",
    ability: "Smoke Veil: Dissolve into shadows and rematerialize up to 2 spaces away. Cannot pass through solid barriers or blood rivers. Cooldown: 1 turn.",
    drawback: "Cursed Reputation: Reviving/healing with this soul takes extra time. Compulsive Theft: Must steal resource/item when sharing space with others. Cannot give/exchange items willingly.",
    color: "gray",
  },
  {
    name: "The Fallen Hunter",
    icon: Target,
    hp: 4,
    resources: 1,
    items: 3,
    description: "A vengeful marksman seeking redemption through combat. Possesses supernatural aim and endurance but moves with the weight of their sins.",
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
            Souls of the Cursed Realm
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Each tormented soul bears unique curses and formidable powers. Only through dark cooperation can they hope to defy the Realm's grasp.
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
                        {character.resources}R/{character.items}I
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
                              <h4 className="font-semibold text-emerald-300">Passive Curses</h4>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              {character.passive}
                            </p>
                          </motion.div>

                          <motion.div
                            className="space-y-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-blue-300" />
                              <h4 className="font-semibold text-blue-300">Active Powers</h4>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              {character.ability}
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
                              <h4 className="font-semibold text-red-300">Inherent Torments</h4>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              {character.drawback}
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
      </div>
    </div>
  );
}
