"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Heart,
  Zap,
  AlertTriangle,
  Eye,
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
    description: "The cold, methodical guardian who monitors every corner of the abandoned site. Hard to surprise and even harder to escape from.",
    passive: "Vigilant: Outcasts from 1 space away need 2 move actions to move",
    abilities: [
      {
        name: "Crushing Slam",
        description: "Attack all Outcasts in same space, dealing 1 HP damage",
        evolutions: [
          "All outcasts must discard a resource if they hold any",
          "Deals 2 HP damage to all outcasts in the space"
        ],
        cooldown: "2 turns"
      },
      {
        name: "Rampage",
        description: "Charge up to 3 spaces, destroy objects (except bridge). Hit outcasts get pushed back 1 space",
        evolutions: [
          "Deal 1 HP damage to any outcast hit",
          "Can turn direction mid-charge"
        ],
        cooldown: "2 turns"
      }
    ],
    drawback: "Slow: Due to heavy armor, can only move 1 space per turn",
    color: "blue"
  },
  {
    name: "Shadow",
    icon: Ghost,
    hp: 2,
    description: "A stealthy and cunning predator, strikes from unexpected angles, and excels at chasing Outcasts from the group.",
    passive: "Intangible: Ignore terrain/objects when moving, pass traps. Ghost: Ignore first damage each round, ranged attacks pass through. Fade Away: Move up to 2 spaces when taking damage",
    abilities: [
      {
        name: "Teleport",
        description: "Teleport to space at least 2 spaces from any outcast",
        evolutions: [
          "Can teleport 1 space away from outcasts",
          "Force adjacent outcast to move 1 space away"
        ],
        cooldown: "2 turns"
      },
      {
        name: "Haunting Presence",
        description: "Place Shadow Mark on space within 2 spaces. Outcasts entering lose 1 HP. 2 marks total",
        evolutions: [
          "Gain 1 additional mark",
          "Effect applies to spaces 1 away from mark"
        ],
        cooldown: "No cooldown"
      }
    ],
    drawback: "Fragile Form: Attack action deals 0.5x damage (abilities not affected)",
    color: "purple"
  },
  {
    name: "The Doppelganger",
    icon: Doppel,
    hp: 4,
    description: "A twisted predator that manipulates fear by existing in two places at once. Outcasts never know which form is the true threat until it's too late.",
    passive: "Shared Vitality: Both forms share the same HP pool. Damage to one affects both",
    abilities: [
      {
        name: "Divide",
        description: "Split into two bodies within 2 spaces. Each can move/act separately, share action pool. Only 1 can attack per turn",
        evolutions: [
          "Gain extra basic action per turn",
          "Both bodies can attack in same turn"
        ],
        cooldown: "No cooldown"
      },
      {
        name: "Merge",
        description: "Combine both bodies back into one form at either location",
        evolutions: [
          "Regain 1 HP after merging",
          "Free attack hitting all adjacent outcasts for 1 HP"
        ],
        cooldown: "No cooldown"
      }
    ],
    drawback: "Complex management required for dual forms",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
            Warden Characters
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Powerful hunters with evolving abilities. Choose your playstyle and adapt as the game progresses.
          </p>
        </div>

        {/* Character Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {wardenCharacters.map((character, characterIndex) => {
            const IconComponent = character.icon;
            return (
              <Card
                key={characterIndex}
                className={`bg-slate-800/50 border-slate-600 hover:bg-slate-800/70 transition-all duration-300 cursor-pointer ${selectedCharacter === characterIndex ? 'ring-2 ring-red-500 scale-105' : 'hover:scale-105'
                  }`}
                onClick={() => setSelectedCharacter(selectedCharacter === characterIndex ? null : characterIndex)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${iconColors[character.color]}`}>
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
                  <p className="text-slate-300 text-sm leading-relaxed">{character.description}</p>

                  {selectedCharacter === characterIndex && (
                    <div className="space-y-4 mt-4 pt-4 border-t border-slate-600">

                      {/* Passive Traits */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-400" />
                          <h4 className="font-semibold text-yellow-400">Passive Traits</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{character.passive}</p>
                      </div>

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
                            <div key={abilityIndex} className="bg-slate-900/50 rounded-lg p-3">
                              <div
                                className="cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAbility(characterIndex, abilityIndex);
                                }}
                              >
                                <div className="flex items-center justify-between">
                                  <h5 className="font-semibold text-blue-400">{ability.name}</h5>
                                  <div className="flex items-center gap-2">
                                    <Badge className="bg-slate-700 text-slate-300 text-xs">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {ability.cooldown}
                                    </Badge>
                                    <span className="text-slate-500 text-xs">{isExpanded ? '−' : '+'}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-300 mt-1">{ability.description}</p>
                              </div>

                              {isExpanded && (
                                <div className="mt-3 space-y-2">
                                  <h6 className="text-xs font-semibold text-emerald-400">Evolution Levels:</h6>
                                  {ability.evolutions.map((evolution, evIndex) => (
                                    <div key={evIndex} className="flex items-start gap-2">
                                      <Badge className="bg-emerald-500/20 text-emerald-400 text-xs flex-shrink-0">
                                        Lv{evIndex + 2}
                                      </Badge>
                                      <p className="text-xs text-slate-400">{evolution}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Drawbacks */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <h4 className="font-semibold text-red-400">Drawbacks</h4>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{character.drawback}</p>
                      </div>
                    </div>
                  )}

                  <div className="text-center pt-2">
                    <p className="text-xs text-slate-500">
                      {selectedCharacter === characterIndex ? 'Click to collapse' : 'Click to expand details'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Evolution System */}
        <Card className="bg-red-500/10 border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-red-400">
              <ArrowUp className="w-6 h-6" />
              Evolution System
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Evolution Triggers</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span><span className="text-yellow-400 font-semibold">5 objectives remaining:</span> Draw Warden card OR evolve ability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span><span className="text-yellow-400 font-semibold">All objectives completed:</span> Draw Warden card OR evolve ability</span>
                  </div>
                  <p className="text-orange-400 text-xs mt-2">
                    <strong>Requirement:</strong> Must complete a Warden objective card to evolve
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">Strategy Tips</h3>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• <span className="text-red-400 font-semibold">Plan evolution path:</span> Choose abilities that complement your playstyle</li>
                  <li>• <span className="text-red-400 font-semibold">Complete objectives:</span> Focus on Warden objectives to unlock evolution</li>
                  <li>• <span className="text-red-400 font-semibold">Timing matters:</span> Evolve at key moments to maximum impact</li>
                  <li>• <span className="text-red-400 font-semibold">Adapt strategy:</span> Each evolution changes your tactical options</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}