
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Heart,
  Bot,
  Book,
  Package,
  SplinePointer,
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
    name: "Architect",
    icon: Hammer,
    hp: 2,
    resources: 4,
    items: 0,
    description: "A highly skilled architect that knows how to build effectively, but he is stubborn and scared of height and darkness",
    passiveName1: 'MasterCraft:',
    passive1: "If the architect is in the game (not in coma or eliminated), then all the building costs are reduced by 1 including traps, excluding repairs",
    abilityName1: "Fortify",
    ability1: "Can instantly build a wall in current space (does not satisfy objectives).",
    coolDown1: 3,
    drawbackName1: "Stubborn Pride",
    drawback1: "Won't accept help from others - cannot participate in objectives that require more than 1 person",
    drawbackName2: "Phobias",
    drawback2: "Cannot climb to the top of towers or go underground",
    color: "orange",
  },
  {
    name: "Trickster",
    icon: Shuffle,
    hp: 2,
    resources: 2,
    items: 2,
    description: "A manipulator who thrives on deception and misdirection. People can never be sure if he’s just playing his own game",
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
    name: "Medic",
    icon: Activity,
    hp: 2,
    resources: 3,
    items: 1,
    description: "A trained professiontal who carries scraps of medical knowledge and supplies, but cannot fight",
    passiveName1: "Healer",
    passive1: "All Outcasts can heal each other from 1 space away instead of in the same space",
    passiveName2: "Doctor",
    passive2: "Outcasts revived by the Medic return with 1.5 HP instead of 1",
    abilityName1: "Emergency Patch",
    ability1: "Instantly restore 1 HP to self or another Outcast in the same space",
    coolDown1: 2,
    drawbackName1: "Pacifist",
    drawback1: "Cannot carry offensive items or set traps",
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
    defaultItemName1: "Hunting Rifle",
    defaultItem1: "Hunter carries a hunting rifle at the start of the game with 2 bullets, this item cannot be given, exchanged, or discarded",
    defaultItemName2: "Bear Trap",
    defaultItem2: "Hunter carries 2 Special Traps at the start of the game. The traps can only be placed or discarded to free up spaces to hold additional items. The traps can be recollected only by the hunter.",
    passiveName1: "Strength",
    passive1: "Immune to the first damaged received and all knockback effects",
    abilityName1: "Focused Shot",
    ability1: "Fire a bullet from the rifle at Warden from 2 spaces in straight line. Cannot fire through objects, if an obstacle is in the way, the bullet destroys that object instead. On a clear hit, deals 1 HP damage to the Warden",
    coolDown1: 2,
    abilityName2: "Trap Master",
    ability2: "Set one bear trap on currentor adjacent space, stuns Warden when triggered (Warden cannot move anymore in that turn).",
    coolDown2: 2,
    drawbackName1: "Slow Mover",
    drawback1: "Hunter's strong body makes him move slower, he needs an extra move actions to move 1 space",
    color: "red",
  },
  {
    name: "Boxer",
    icon: Swords,
    hp: 3,
    resources: 3,
    items: 1,
    description: "A trained competitor who thrives on physical prowess and endurance. Years of combat training make him a formidable opponent against the Warden",
    defaultItemName1: "Boxing Gloves",
    defaultItem1: "Boxer carries a pair of Boxing Gloves which cannot be given, exchanged, or discarded",
    passiveName1: "Second Wind",
    passive1: "When reduced to 0 HP, he immediately regains +1 HP (once per game)",
    passiveName2: "Last Dance",
    passive2: "When at 1 HP or below, all damages dealt to the Warden are doubled",
    abilityName1: "Heavy Strike",
    ability1: "Perform an attack to the Warden in the same space with Boxing Gloves",
    coolDown1: 3,
    abilityName2: "Wraith Rush",
    ability2: "The boxer can dash to a direction of up to 2 spaces. If the warden is hit on the way, then the warden will be knocked back 1 space. If there is an object behind the warden, then the warden will be stunned and cannot attack next turn. And the warden will take 1 HP damage",
    coolDown2: 3,
    drawbackName1: "Protective Instinct",
    drawback1: "Must move toward an Oucast in coma until revived by the Boxer or other Outcasts. During the process, the boxer cannot perform any other actions other than Move or Wraith Rush Ability",
    drawbackName2: "Overexertion",
    drawback2: "After dealing more than 1 damage to the Warden in a single turn (via any ability), the Boxer becomes exhausted and cannot perform any actions in his next turn (basically skip his next turn)",
    color: "blue",
  },
  {
    name: "Mechanic",
    icon: Wrench,
    hp: 2,
    resources: 2,
    items: 1,
    description: "A hands-on tinkerer who excels at machines and gadgets. Can create a robotic companion to assist in objectives, but is fragile in combat",
    defaultItemName1: "Controller",
    defaultItem1: "The Mechanic has a controller that can create / control a robot that's created by him. Cannot be given, exchanged, and can only be discarded when the usage limit hits",
    passiveName1: "Efficient Repairs",
    passive1: "If the mechanic is in the game (not in coma or eliminated), then all repair actions require 1 less material",
    abilityName1: "Robot Control",
    ability1: "Mechanic constructs a robot piece on any adjacent space (not on river). The robot is basically like a normal outcast that has no ability or trait, it can be controlled based on the robot playcard. The mechanic can still control the robot even when he is in coma, and he can construct a 2nd robot if the first one is destroyed by the hunter",
    drawbackName1: "Stationary Operator",
    drawback1: "The mechanic cannot move on the same turn when Robot Control is used",
    drawbackName2: "Fragile",
    drawback2: "Any damage taken from the Warden will be doubled",
    color: "cyan",
  },
  {
    name: "Robot",
    icon: Bot, 
    hp: 1,
    resources: 1,
    items: 1,
    description: "A mechanical companion built by the Mechanic. It follows the Mechanic's commands but lacks autonomy and abilities",
    desc: "The Robot is not a character that can be picked. It's created from the Mechanic's ability. It has no unique passive traits, abilities, or weaknesses of its own, but it can perform standard actions such as moving, building, repairing, combating, and assisting with objectives just like any other Outcast",
    color: "gray",
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
                          
                          {character.desc && 
                           <motion.div
                           className="space-y-2"
                           initial={{ x: -20, opacity: 0 }}
                           animate={{ x: 0, opacity: 1 }}
                           transition={{ delay: 0.1 }}
                          >
                            <div className="flex items-center gap-2">
                              <Book className="w-4 h-4 text-purple-300" />
                              <h4 className="font-semibold text-purple-300">Description</h4>
                            </div>
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              {character.desc}
                            </p>
                          </motion.div>
                          }


                          {character.defaultItem1 && <motion.div
                              className="space-y-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <div className="flex items-center gap-2">
                                <SplinePointer className="w-4 h-4 text-purple-300" />
                                <h4 className="font-semibold text-purple-300">Default Item - {character.defaultItemName1}</h4>
                              </div>
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                                {character.defaultItem1}
                              </p>
                            </motion.div> 
                          }
                          
                          {character.defaultItem2 && <motion.div
                              className="space-y-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1 }}
                            >
                              <div className="flex items-center gap-2">
                                <SplinePointer className="w-4 h-4 text-purple-300" />
                                <h4 className="font-semibold text-purple-300">Default Item - {character.defaultItemName2}</h4>
                              </div>
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                                {character.defaultItem2}
                              </p>
                            </motion.div> 
                          }

                          {character.passive1 && <motion.div
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
                          }


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

                          {character.ability1 && <motion.div
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
                            {character.name === 'Hunter' ?
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              Limit: {character.coolDown1} bullets
                            </p> 
                            : 
                            character.name === 'Mechanic' ?
                            <div>
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              Limit - 1 : Only 1 robot can be present and can construct a total of {character.coolDown1} robots in a game
                              </p> 
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                              Limit - 2: The total actions allowed are 8 actions. If the robot is still alive after 8 allowed actions, then it stays on the board but it cannot be controlled
                              </p> 
                            </div>
                            : 
                            <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                             CoolDown: {character.coolDown1} turns
                            </p> 
                            }
                          </motion.div>
                          }

                          {character.ability2 && <motion.div
                              className="space-y-2"
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              >
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-300" />
                                <h4 className="font-semibold text-blue-300">Ability - {character.abilityName2}</h4>
                              </div>
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                                {character.ability2}
                              </p>
                              {character.name === 'Hunter' ?
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                                Limit: {character.coolDown2} traps
                              </p> 
                              : 
                              <p className="text-sm text-gray-200 leading-relaxed bg-gray-900/30 p-3 rounded-lg">
                                CoolDown: {character.coolDown2} turns
                              </p> 
                              }
                            </motion.div>
                          }

                          {character.drawback1 && <motion.div
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
                          }

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
                Now that you’ve seen what Outcasts' characters there are, you can move on to the <a href="/wardenCharacters"><span className="text-yellow-400 font-semibold">Warden's Character</span></a> section
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
