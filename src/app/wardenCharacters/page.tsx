"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Heart,
  SplinePointer,
  Zap,
  AlertTriangle,
  Info,
  Ghost,
  Users as Doppel,
  ArrowUp,
  Target,
  Clock
} from "lucide-react";

const wardenCharacters = [
  {
    name: "Sentinel",
    icon: Shield,
    hp: 6,
    description:
      "The cold, methodical guardian who monitors every corner of the abandoned site. Hard to surprise and even harder to escape from.",
    passiveName1: "Vigilant",
    passive1: "Outcasts that are within 1 space to the Sentinel need an extra move action to move",
    abilities: [
      {
        name: "Crushing Slam",
        description: "Attack all Outcasts in the current space, dealing 1 HP damage",
        evolutions: [
          "All outcasts in the space must choose to discard a resource if they hold any",
          "Deals 2 HP damage to all outcasts in the current space"
        ],
        cooldown: "2 turns"
      },
      {
        name: "Rampage",
        description:
          "Charge up to 3 spaces in the same direction, destroy objects (except bridge). Any Outcast hit on the way is forced to go back to the opposite direction 1 space if possible",
        evolutions: [
          "Deal 1 HP damage to any outcast hit",
          "Can change direction mid-charge"
        ],
        cooldown: "2 turns"
      }
    ],
    drawbackName: "Slow",
    drawback: "Due to heavy armor, can only move 1 space per turn",
    color: "blue"
  },
  {
    name: "Shadow",
    icon: Ghost,
    hp: 2,
    description:
      "A stealthy and cunning predator, strikes from unexpected angles, and excels at chasing Outcasts from the group.",
    deafultItemName: "Shadow Mark",
    defaultItem: "The Shadow carries 2 Shadow Marks at the beginning of the game, can be placed using its ability",
    passiveName1: "Intangible",
    passive1:
      "Ignore terrain/objects when moving, can also pass traps",
    passiveName2: "Ghost",
    passive2: "When attacked by outcasts (melee or ranged), the Shadow ignores the first instance of damage each round. If it is ranged attack, then it will pass through",
    passiveName3: "Fade Away",
    passive3: "Whenever the Shadow takes a damage, the shadow can choose to move up to 2 spaces away from its current space",
      abilities: [
      {
        name: "Teleport",
        description: "Can choose a space that is at least 2 spaces away from any Outcast and instantly teleport to that space",
        evolutions: [
          "Can teleport into a space that is at least 1 space away from any Outcast",
          "Can choose to force the Outcasts from an adjacent space to any direction not towards him by 1 space"
        ],
        cooldown: "2 turns"
      },
      {
        name: "Haunting Presence",
        description:
          "Place Shadow Mark on a space within 2 spaces. Outcasts entering lose 1 HP. 2 marks total, can be recollected.",
        evolutions: [
          "Gain 1 additional mark",
          "Immediately regain all marks"
        ],
        cooldown: "No cooldown"
      }
    ],
    drawbackName: "Fragile Form",
    drawback: "Attack action deals 0.5x damage (abilities not affected)",
    color: "purple"
  },
  {
    name: "Doppelganger",
    icon: Doppel,
    hp: 4,
    description:
      "A twisted predator that manipulates fear by existing in two places at once. Outcasts never know which form is the true threat until it's too late.",
    passiveName1: "Shared Vitality",
    passive1:
      "Both forms share the same HP pool. Damage to one affects both",
    abilities: [
      {
        name: "Divide",
        description:
          "Split into two bodies from the current space, and placed within 2 spaces of each other. Each can move/act separately, share action pool. Only 1 can attack per turn",
        evolutions: [
          "Gain extra basic action per turn",
          "Both bodies can attack in the same turn"
        ],
        cooldown: "No cooldown"
      },
      {
        name: "Merge",
        description: "Combine both bodies back into one form at either location",
        evolutions: [
          "Regain 1 HP after merging",
          "Can choose to perform a free attack immediately after merging, hitting all Outcasts in adjacent spaces for 1 HP damage each"
        ],
        cooldown: "No cooldown"
      }
    ],
    drawbackName: "None",
    drawback: "No weakness",
    color: "red"
  }
];

const iconColors: Record<string, string> = {
  blue: "text-blue-400 bg-blue-500/20",
  purple: "text-purple-400 bg-purple-500/20",
  red: "text-red-400 bg-red-500/20"
};

export default function WardenCharacters() {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedAbility, setSelectedAbility] = useState<Record<string, boolean>>({});

  const toggleAbility = (characterIndex: number, abilityIndex: number) => {
    const key = `${characterIndex}-${abilityIndex}`;
    setSelectedAbility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Warden's Characters
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Reference to all characters that can be chosen as a Warden
          </p>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Each character has special ability, strength, and weakness
          </p>
        </motion.div>

        {/* Character Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {wardenCharacters.map((character, characterIndex) => {
            const IconComponent = character.icon;
            return (
              <motion.div
                key={characterIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + characterIndex * 0.1, duration: 0.5 }}
              >
                <Card
                  className={`bg-slate-800/50 border-slate-600 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer ${
                    selectedCharacter === characterIndex
                      ? "ring-2 ring-red-500 scale-105"
                      : "hover:scale-105"
                  }`}
                  onClick={() =>
                    setSelectedCharacter(
                      selectedCharacter === characterIndex ? null : characterIndex
                    )
                  }
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${iconColors[character.color]}`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl text-white">{character.name}</CardTitle>

                    {/* Stats */}
                    <div className="flex justify-center gap-4 mt-4">
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        <Heart className="w-3 h-3 mr-1" />
                        {character.hp} HP
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        <ArrowUp className="w-3 h-3 mr-1" />
                        Evolves
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {character.description}
                    </p>

                    <AnimatePresence>
                    {selectedCharacter === characterIndex && (
                      <motion.div
                      key={`details-${characterIndex}`} // important so AnimatePresence can track it
                      className="space-y-4 mt-4 pt-4 border-t border-slate-600"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      >
                        
                        {character.deafultItemName && <motion.div
                              className="space-y-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <div className="flex items-center gap-2">
                                <SplinePointer className="w-4 h-4 text-purple-300" />
                                <h4 className="font-semibold text-purple-300">Default Item - {character.deafultItemName}</h4>
                              </div>
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                                {character.defaultItem}
                              </p>
                            </motion.div> 
                          }

                        {/* Passive Traits */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <h4 className="font-semibold text-yellow-400">Passive Traits - {character.passiveName1}</h4>
                          </div>
                          <p className="text-sm text-gray-200 leading-relaxed bg-slate-900/50 p-3 rounded-lg">
                              {character.passive1}
                          </p>
                        </div>

                        {character.passive2 && <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <h4 className="font-semibold text-yellow-400">Passive Traits - {character.passiveName2}</h4>
                          </div>
                          <p className="text-sm text-gray-200 leading-relaxed bg-slate-900/50 p-3 rounded-lg">
                              {character.passive2}
                          </p>
                        </div>
                        }
                        
                        {character.passive3 && <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <h4 className="font-semibold text-yellow-400">Passive Traits - {character.passiveName3}</h4>
                          </div>
                          <p className="text-sm text-gray-200 leading-relaxed bg-slate-900/50 p-3 rounded-lg">
                              {character.passive3}
                          </p>
                        </div>
                        }

                        {/* Abilities */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-orange-400" />
                            <h4 className="font-semibold text-orange-400">Abilities</h4>
                          </div>

                          {character.abilities.map((ability, abilityIndex) => {
                            const abilityKey = `${characterIndex}-${abilityIndex}`;
                            const isExpanded = selectedAbility[abilityKey];

                            return (
                              <div
                                key={abilityIndex}
                                className="bg-slate-900/50 rounded-lg p-3"
                              >
                                <div
                                  className="cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleAbility(characterIndex, abilityIndex);
                                  }}
                                >
                                  <div className="flex items-center justify-between">
                                    <h5 className="font-semibold text-blue-400">
                                      {ability.name}
                                    </h5>
                                    <div className="flex items-center gap-2">
                                      <Badge className="bg-slate-700 text-slate-300 text-xs">
                                        <Clock className="w-3 h-3 mr-1" />
                                        {ability.cooldown}
                                      </Badge>
                                      <span className="text-slate-500 text-xs">
                                        {isExpanded ? "−" : "+"}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-slate-300 mt-1">
                                    {ability.description}
                                  </p>
                                </div>

                                {isExpanded && (
                                  <motion.div
                                    className="mt-3 space-y-2"
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                  >
                                    <h6 className="text-xs font-semibold text-emerald-400">
                                      Evolution Levels:
                                    </h6>
                                    {ability.evolutions.map((evolution, evIndex) => (
                                      <div
                                        key={evIndex}
                                        className="flex items-start gap-2"
                                      >
                                        <Badge className="bg-emerald-500/20 text-emerald-400 text-xs flex-shrink-0">
                                          Lv{evIndex + 2}
                                        </Badge>
                                        <p className="text-xs text-slate-400">{evolution}</p>
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Drawbacks */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <h4 className="font-semibold text-red-400">Weakness - {character.drawbackName}</h4>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {character.drawback}
                          </p>
                        </div>
                      </motion.div>
                    )}
                    </AnimatePresence>

                    <div className="text-center pt-2">
                      <p className="text-xs text-slate-500">
                        {selectedCharacter === characterIndex
                          ? "Click to collapse"
                          : "Click to expand details"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Next Step */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
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
                Now that you’ve seen what Warden's characters there are, you can
                move on to the{" "}
                <a href="/setup">
                  <span className="text-yellow-400 font-semibold">
                    Game Setup
                  </span>
                </a>{" "}
                section
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
