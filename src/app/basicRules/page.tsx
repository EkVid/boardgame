import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileSliders, 
  Heart,
  Shield, 
  Users, 
  Clock, 
  Zap,
  TrendingUp,
  Info, 
  Target,
  Sword,
  Map,
  Landmark,
  AlignEndHorizontal,
  Eye,
  Boxes,
  Axe,
  InspectionPanel
} from "lucide-react";

export default function BasicRules() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900/20 p-6">
      <style>{`
        @keyframes sinisterGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.7); }
        }
        
        .sinister-glow {
          animation: sinisterGlow 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-300 via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Game Rules
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            The fundamental mechanics of the game, and how outcasts and warden are played
          </p>
        </div>

        {/* Health & Combat System */}
        <Card className="bg-gray-900/50 border-red-800/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <FileSliders className="w-6 h-6 text-red-400 sinister-glow" />
              Basic Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-emerald-400 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Outcast
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p><span className="text-emerald-400 font-semibold">Number of Players: </span>4</p>
                  <p><span className="text-emerald-400 font-semibold">Hitpoint:</span> Each outcast has 1-4 HP based on the character</p>
                  <p><span className="text-emerald-400 font-semibold">Objectives:</span></p>
                  <p>As an Outcast, your goal is survival and resistance against the Warden's hunt. You and your allies must cooperate, plan carefully, and take risks to outlast or overcome the Warden</p>                  
                  <p><span className="text-emerald-400 font-semibold">Win Conditions:</span></p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 leading-relaxed">
                    <li>
                     <span className="text-emerald-400">Escape Victory</span> – At least 3 Outcasts successfully leaves the playground by the exit gates
                    </li>                    
                    <li>
                     <span className="text-emerald-400">Defiance Victory</span> – The Outcasts collectively defeat the Warden by reducing its HP to 0
                    </li>
                  </ul>
                 
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-red-400 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Warden
                </h3>
                <div className="space-y-3 text-gray-300">
                  <p><span className="text-red-400 font-semibold">Number of Players: </span>1</p>
                  <p><span className="text-red-400 font-semibold">Hitpoint:</span> Warden has 2 - 6 HP based on the character</p>
                  <p><span className="text-red-400 font-semibold">Objectives:</span></p>
                  <p>As a Warden, you are the executioner within the Playground. Your role is to control, outmaneuver, and eliminate the Outcasts before they can escape or bring you down</p>
                  <p><span className="text-red-400 font-semibold">Win Conditions:</span></p>
                  <ul className="list-disc list-inside space-y-2 text-gray-200 leading-relaxed">
                    <li>
                    <span className="text-red-400">Elimination Victory </span> – At least 3 Outcasts are eliminated and you are still alive</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

         {/* Outcast Rules */}
         <Card className="bg-emerald-900/20 border-emerald-600/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-emerald-400">
              <Users className="w-6 h-6" />
              Outcasts' Mechanism
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Coma State */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Coma State</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg space-y-2 border border-emerald-900/30">
                <p className="text-gray-300">When an outcast's HP reaches 0 → the Outcast enters <span className="text-emerald-400 font-semibold">Coma State</span>, unable to perform any actions for <span className="italic text-emerald-400">3 rounds</span></p>
                <p className="text-gray-300">Teammates may revive them through a "Revive" action if they are in the <span className="text-emerald-400">same space</span> (unless an ability allows otherwise)</p>
                <p className="text-gray-300">A revived Outcast returns with <span className="font-semibold text-emerald-400">1 HP</span></p>
                <p className="text-gray-300">If an outcast enters coma state the third time → the Outcast is <span className="text-red-400 font-semibold">eliminated immediately</span></p>
                <p className="text-gray-300">If not revived within their coma duration → the Outcast is also <span className="text-red-400 font-semibold">eliminated</span></p>
              </div>
            </div>

            {/* Healing */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Healing Rules</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-emerald-900/30 space-y-2">
                <p className="text-gray-300">Outcasts can heal <span className="text-emerald-400">their teammates</span> through a "Heal" action if they are in the same space (unless an ability allows otherwise)</p>
                <p className="text-gray-300">The healed Outcast regains <span className="text-emerald-400">1 HP</span> unless an ability allows more</p>
                <p className="text-gray-300">An Outcast <span className="text-emerald-400">cannot</span> perform "Heal" action on themselves</p>
                <p className="text-gray-300">An Outcast <span className="text-emerald-400">can only</span> heal themselves using the "First Aid Kit" item</p>
              </div>
            </div>

            {/* Movement Restrictions */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Movement Rules</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-emerald-900/30 space-y-2">
                <p className="text-gray-300">Outcasts cannot cross <span className="text-emerald-400">walls and towers</span></p>
                <p className="text-gray-300">Outcasts cannot cross <span className="text-emerald-400">river</span> without the bridge</p>
              </div>
            </div>

            {/* Objectives & Escape */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Objective Cards & Escape</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-emerald-900/30 space-y-2">
                <p className="text-gray-300">The Outcast team begins with <span className="font-semibold text-emerald-400">10 objective cards</span></p>
                <p className="text-gray-300">To activate the exit gates, Outcasts must complete <span className="font-semibold">all objectives</span></p>
                <p className="text-gray-300">Once all objectives are complete, <span className="text-emerald-400">two exit gates</span> are activated and can be opened through an action</p>
                <p className="text-gray-300">Outcasts may then escape through these gates</p>
                <p className="text-gray-300">Completed objectives must be <span className="italic">declared immediately</span> and shown to the Warden</p>
              </div>
            </div>

            {/* Combat */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sword className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Combat</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-emerald-900/30">
                <p className="text-gray-300">Outcasts can apply damage and debuffs to the Warden using <span className="text-emerald-400">character specific abilities</span> and <span className="text-emerald-400">items</span> discovered during play</p>
              </div>
            </div>

            {/* Turn Order */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-semibold text-white">Turn Order</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-emerald-900/30">
                <p className="text-gray-300">Each Outcast plays according to their <span className="text-emerald-400">player card</span> during their turn</p>
              </div>
            </div>

          </CardContent>
        </Card>


        {/* Warden Rules */}
        <Card className="bg-red-900/20 border-red-600/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-red-400">
              <Shield className="w-6 h-6 sinister-glow" />
              Warden's Mechanism
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6"> 

            {/* Attack Rules */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sword className="w-5 h-5 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Attack Action Rules</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg space-y-2 border border-red-900/30">
                <p className="text-gray-300">Warden can deal <span className="text-red-400">1 HP damage</span> to an outcast</p>
                <p className="text-gray-300">The Outcast has to be in the same space as the Warden</p>
                <p className="text-gray-300">If multiple Outcasts are in the same space as the Warden, the damage can only be dealt to one Outcast</p>
              </div>
            </div>

            {/* Terrain Restrictions */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Movement Rules</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg space-y-2 border border-red-900/30">
                <p className="text-gray-300">Wardens cannot cross <span className="text-red-400">walls, towers, and traps</span> unless empowered by abilities</p>
                <p className="text-gray-300">Wardens cannot cross <span className="text-red-400">river</span> without the bridge unless empowered by abilities</p>
              </div>
            </div>

            {/* Dark Powers */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Power Cards & Evolution of Abilities</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg space-y-2 border border-red-900/30">
                <p className="text-gray-300">Draw <Badge className="bg-red-800/30 text-red-400 border border-red-600/30">2 Warden specific Power Cards</Badge> at game start — choose one to keep</p>
                <p className="text-gray-300">Draw <Badge className="bg-red-800/30 text-red-400 border border-red-600/30">2 Evolution Cards</Badge> at game start — complete them during the game to upgrade abilities</p>
                <p className="text-gray-300">There are a total of 6 Power Cards and 6 Evolution Cards</p>
              </div>
            </div>

            {/* Comeback Mechanics */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Comeback Mechanics</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg space-y-2 border border-red-900/30">
                <p className="text-gray-300"><span className="text-yellow-400 font-semibold">When Outcasts have 5 objectives remain:</span> The warden draws another power card <span className="text-sm">(must be revealed)</span> OR evolve an ability immediately</p>
                <p className="text-gray-300"><span className="text-yellow-400 font-semibold">When Outcasts complete all objects: </span> Draw another Power Card <span className="text-sm">(must be revealed)</span> OR evolve an ability immediately</p>
              </div>
            </div>

            {/* Turn Order */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-400" />
                <h3 className="text-xl font-semibold text-white">Turn Order</h3>
              </div>
              <div className="bg-black/50 p-4 rounded-lg border border-emerald-900/30">
                <p className="text-gray-300">The Warden <span className="text-red-400 font-semibold">always plays first</span> before Outcasts each round</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Landmark className="w-6 h-6 text-purple-400" />
              Building and Terrain
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">

              {/* Tower */}
              <div className="bg-black/50 p-4 rounded-lg border border-yellow-800/30">
                <h4 className="font-semibold text-yellow-400 mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded" />
                  Tower
                </h4>
                <p className="text-sm text-gray-300"> A tower that can be built or repaired by Outcasts during the game</p>
                <p className="text-sm text-gray-300">Outcasts and Warden can both climbed to the top</p>
                <p className="text-sm text-gray-300">Can also be destroyed by the Warden</p>
              </div>

              {/* Bridge */}
              <div className="bg-black/50 p-4 rounded-lg border border-blue-800/30">
                <h4 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <div className="w-6 h-1 bg-blue-400 rounded" />
                  Bridge
                </h4>
                <p className="text-sm text-gray-300">A bridge that can be built or repaired by Outcasts during the game</p>
                <p className="text-sm text-gray-300">Can be used to cross river</p>
                <p className="text-sm text-gray-300">Can also be destroyed by the Warden</p>
              </div>

              {/* Trap */}
              <div className="bg-black/50 p-4 rounded-lg border border-red-800/30">
                <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rotate-45" />
                  Trap
                </h4>
                <p className="text-sm text-gray-300">A trap that can be built and placed by Outcasts during the game</p>
                <p className="text-sm text-gray-300">Can slow down the Warden</p>
                <p className="text-sm text-gray-300">Can also be destroyed by the Warden</p>
              </div>

              {/* Wall */}
              <div className="bg-black/50 p-4 rounded-lg border border-orange-800/30">
                <h4 className="font-semibold text-orange-400 mb-2 flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded" />
                  Wall
                </h4>
                <p className="text-sm text-gray-300">A barrier that can be built or repaired by Outcasts during the game</p>
                <p className="text-sm text-gray-300">Can block the Warden</p>
                <p className="text-sm text-gray-300">Can also be destroyed by the Warden</p>
              </div>

              {/* Tunnel */}
              <div className="bg-black/50 p-4 rounded-lg border border-green-800/30">
                <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                  <div className="w-4 h-2 bg-green-400 rounded" />
                  Tunnel
                </h4>
                <p className="text-sm text-gray-300">An underground passage that can be built or repaired by Outcasts during the game</p>
                <p className="text-sm text-gray-300">Can navigate to a distanted in one move for outcasts only</p>
                <p className="text-sm text-gray-300">Can also be destroyed by the Warden</p>
              </div>

              {/* Underground */}
              <div className="bg-black/50 p-4 rounded-lg border border-purple-800/30">
                <h4 className="font-semibold text-purple-400 mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Hunter's Trap
                </h4>
                <p className="text-sm text-gray-300">A special trap that can only be placed by the outcast - Hunter</p>
                <p className="text-sm text-gray-300">Deals damage to the Warden, but can also be destroyed by the warden</p>
                <p className="text-sm text-gray-300">Cannot be built or repaired</p>
              </div>

              {/* River */}
              <div className="bg-black/50 p-4 rounded-lg border border-cyan-800/30 md:col-span-3">
                <h4 className="font-semibold text-cyan-400 mb-2 flex items-center gap-2">
                  <div className="w-6 h-1 bg-cyan-400 rounded" />
                  River
                </h4>
                <p className="text-sm text-gray-300">A river that cannot be crossed unless through the bridge</p>
              </div>

              {/* Basement */}
              <div className="bg-black/50 p-4 rounded-lg border border-teal-800/30 md:col-span-3">
              <h4 className="font-semibold text-teal-400 mb-2 flex items-center gap-2">
                <Boxes className="w-4 h-4 text-teal-400" />
                Basement
              </h4>
              <p className="text-sm text-gray-300">
                A basement that's underground, both Outcasts and Warden can enter and exit through the stairs
              </p>
            </div>


            </div>
          </CardContent>
        </Card>


        {/* Resource Components */}
        <Card className="bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl">
              <AlignEndHorizontal className="w-6 h-6 text-purple-400" />
              Resources & Items
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="bg-black/50 p-4 rounded-lg border border-teal-800/30 md:col-span-3">
                <div className="flex items-center gap-3">
                  <InspectionPanel className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-semibold text-white">Resources</h3>
                </div>
                <p className="text-gray-300 mt-4">Outcasts can collect resources based on the type of space they are at</p>
                <p className="text-gray-300 mt-4">Resources can be carried with Outcasts if inventory has space</p>
                <p className="text-gray-300 mt-4">Resources are used to build and repair buildings</p>
                <p className="text-gray-300 mt-4">Collectable Resources include: <span className="text-purple-400">Metal, Rock, and Wood</span></p>
            </div>

            <div className="bg-black/50 p-4 rounded-lg border border-teal-800/30 md:col-span-3 mt-8">
             <div className="flex items-center gap-3">
                <Axe className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-semibold text-white">Items</h3>
                </div>
                <p className="text-gray-300 mt-4">Outcasts can discover items by doing an action at a space where an item marker is present</p>
                <p className="text-gray-300 mt-4">Items cannot be repaired or built, and each type of item can only be obtained once in a game from its designated marker space</p>
                <p className="text-gray-300 mt-4">Collectable Items include: <span className="text-purple-400">First Aid Kit, Rope, Molotov Cocktail, Adrenaline Shot, Sprint Boots, Stone Sword, </span> and <span className="text-purple-400">Scrap Shield</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="bg-yellow-900/20 border-yellow-600/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl text-yellow-400">
              <Info className="w-6 h-6" />
              Next Step
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-gray-300">
              Now that you’ve learned the basics of the game, you can move on to the <a href="/gameFlow"><span className="text-yellow-400 font-semibold">Gameflow</span></a> section
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}