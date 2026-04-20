import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Box, Cpu, Shield, Copy, Check, X, Terminal } from 'lucide-react';
import { cn } from '../lib/utils';

interface LuaScript {
  id: string;
  title: string;
  type: 'ModuleScript' | 'LocalScript' | 'ServerScript';
  description: string;
  code: string;
  icon: React.ReactNode;
}

const scripts: LuaScript[] = [
  {
    id: '1',
    title: 'DataStoreManager',
    type: 'ModuleScript',
    icon: <Box className="w-5 h-5" />,
    description: 'Persistence layer wrapper with session locking and retry mechanisms.',
    code: `-- DataStoreManager.lua
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local Manager = {}
Manager.SessionCache = {}

function Manager:LoadData(player)
    local key = "Player_" .. player.UserId
    local store = DataStoreService:GetDataStore("PlayerData_v1")
    
    local success, data = pcall(function()
        return store:GetAsync(key)
    end)
    
    if success then
        self.SessionCache[player.UserId] = data or {Coins = 0, XP = 0}
    end
end

return Manager`
  },
  {
    id: '2',
    title: 'KinematicController',
    type: 'LocalScript',
    icon: <Cpu className="w-5 h-5" />,
    description: 'Client-side physics for procedural recoil and raycasting.',
    code: `-- KinematicController.lua
local RunService = game:GetService("RunService")
local Camera = workspace.CurrentCamera

local GunSystem = { Recoil = Vector3.new(0, 0, 0) }

function GunSystem:Fire()
    local recoilPattern = Vector3.new(math.random(-10, 10)/100, 0.5, 0)
    self.Recoil = self.Recoil + recoilPattern
end

RunService.RenderStepped:Connect(function(dt)
    GunSystem.Recoil = GunSystem.Recoil:Lerp(Vector3.new(0,0,0), dt * 10)
    Camera.CFrame = Camera.CFrame * CFrame.Angles(GunSystem.Recoil.Y, GunSystem.Recoil.X, 0)
end)

return GunSystem`
  },
  {
    id: '3',
    title: 'CommandDispatcher',
    type: 'ServerScript',
    icon: <Shield className="w-5 h-5" />,
    description: 'Multi-level permission system and command parsing engine.',
    code: `-- CommandDispatcher.lua
local Admins = { [12345678] = true }

game.Players.PlayerAdded:Connect(function(player)
    player.Chatted:Connect(function(msg)
        if not Admins[player.UserId] then return end
        
        local args = msg:split(" ")
        local cmd = args[1]:lower()
        
        if cmd == ":kick" and args[2] then
            game.Players:FindFirstChild(args[2]):Kick()
        end
    end)
end)`
  },
  {
    id: '4',
    title: 'AStarPathfinder',
    type: 'ModuleScript',
    icon: <Terminal className="w-5 h-5" />,
    description: 'Optimized pathfinding for autonomous behavioral agents.',
    code: `-- AStarPathfinder.lua
local RunService = game:GetService("RunService")
local PetAI = {}

function PetAI:StartFollowing(petModel, rootPart)
    local petRoot = petModel.PrimaryPart
    
    local alignPos = Instance.new("AlignPosition")
    alignPos.Parent = petRoot
    
    RunService.Heartbeat:Connect(function()
        local targetCFrame = rootPart.CFrame * CFrame.new(2, 2, 4)
        alignPos.Position = targetCFrame.Position
    end)
end

return PetAI`
  }
];

export const RobloxShowcase: React.FC = () => {
  const [selectedScript, setSelectedScript] = useState<LuaScript | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (selectedScript) {
      navigator.clipboard.writeText(selectedScript.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
        >
           <h2 className="text-4xl font-bold mb-4 text-white font-mono uppercase tracking-tight">
             Behavioral <span className="text-accent">Logic</span>
           </h2>
           <p className="text-slate-500 max-w-2xl font-mono text-sm leading-relaxed">
             Scalable Lua modules for complex game environments. Focused on memory efficiency and asynchronous performance.
           </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scripts.map((script, idx) => (
            <motion.div 
              key={script.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedScript(script)}
              className="group cursor-pointer bg-slate-950/50 rounded-lg p-6 border border-slate-800 hover:border-accent/40 transition-all shadow-inner hover:shadow-accent/5"
            >
              <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors ring-1 ring-inset",
                  script.type === 'ModuleScript' ? 'bg-yellow-500/10 text-yellow-500 ring-yellow-500/20' :
                  script.type === 'LocalScript' ? 'bg-blue-500/10 text-blue-500 ring-blue-500/20' :
                  'bg-green-500/10 text-green-500 ring-green-500/20'
              )}>
                 {script.icon}
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors font-mono uppercase tracking-tight">
                  {script.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-mono opacity-80 mb-6">
                  {script.description}
              </p>
              
              <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-600 border-t border-slate-800 pt-4">
                 <span>{script.type}</span>
                 <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">View Output</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
            {selectedScript && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedScript(null)}
                        className="absolute inset-0 bg-black/90 backdrop-blur-md"
                    />
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-slate-950 w-full max-w-4xl rounded-sm border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[85vh] relative z-10"
                    >
                        {/* Editor Header */}
                        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Code2 className="w-4 h-4 text-accent" />
                                <span className="text-xs font-mono font-bold text-slate-300 tracking-wider uppercase">
                                    {selectedScript.title}.lua
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={handleCopy}
                                    className="p-2 text-slate-500 hover:text-white transition-colors"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                </button>
                                <button 
                                    onClick={() => setSelectedScript(null)}
                                    className="p-2 text-slate-500 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Editor Content */}
                        <div className="flex-1 overflow-auto p-8 font-mono text-xs leading-loose bg-slate-950 text-slate-300 custom-scrollbar">
                             <pre>
                                <code>{selectedScript.code}</code>
                             </pre>
                        </div>
                        
                        <div className="bg-slate-900 px-6 py-2 border-t border-slate-800 flex justify-between text-[9px] uppercase tracking-[0.2em] font-bold text-slate-500">
                            <div className="flex gap-4">
                                <span>Ln 1, Col 1</span>
                                <span>Spaces: 4</span>
                            </div>
                            <div className="text-accent animate-pulse">Running Simulation...</div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
};
