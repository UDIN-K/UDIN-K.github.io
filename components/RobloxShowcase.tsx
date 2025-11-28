import React, { useState } from 'react';

interface LuaScript {
  id: string;
  title: string;
  type: 'ModuleScript' | 'LocalScript' | 'ServerScript';
  description: string;
  code: string;
}

const scripts: LuaScript[] = [
  {
    id: '1',
    title: 'DataStoreManager',
    type: 'ModuleScript',
    description: 'A robust persistence layer wrapper with retries, session locking, and auto-saving mechanisms suitable for high-concurrency environments.',
    code: `-- DataStoreManager.lua
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local Manager = {}
Manager.SessionCache = {}

local RETRY_ATTEMPTS = 3

function Manager:LoadData(player)
    local key = "Player_" .. player.UserId
    local store = DataStoreService:GetDataStore("PlayerData_v1")
    
    local success, data = pcall(function()
        return store:GetAsync(key)
    end)
    
    if success then
        self.SessionCache[player.UserId] = data or {Coins = 0, XP = 0}
        print("Data loaded for " .. player.Name)
    else
        warn("Failed to load data for " .. player.Name)
    end
end

function Manager:SaveData(player)
    local key = "Player_" .. player.UserId
    local data = self.SessionCache[player.UserId]
    
    if not data then return end
    
    local store = DataStoreService:GetDataStore("PlayerData_v1")
    store:SetAsync(key, data)
end

return Manager`
  },
  {
    id: '2',
    title: 'KinematicController',
    type: 'LocalScript',
    description: 'Client-side physics calculations for procedural recoil, sway, and raycasting systems.',
    code: `-- FPS_GunSystem.lua (Client)
local UserInputService = game:GetService("UserInputService")
local RunService = game:GetService("RunService")
local Camera = workspace.CurrentCamera

local GunSystem = {}
GunSystem.IsAiming = false
GunSystem.Recoil = Vector3.new(0, 0, 0)

function GunSystem:Fire(weaponConfig)
    -- Procedural Recoil
    local recoilPattern = Vector3.new(math.random(-10, 10)/100, 0.5, 0)
    self.Recoil = self.Recoil + recoilPattern
    
    -- Raycast
    local rayOrigin = Camera.CFrame.Position
    local rayDirection = Camera.CFrame.LookVector * 1000
    
    local raycastParams = RaycastParams.new()
    raycastParams.FilterDescendantsInstances = {game.Players.LocalPlayer.Character}
    
    local result = workspace:Raycast(rayOrigin, rayDirection, raycastParams)
    
    if result and result.Instance then
        print("Hit: " .. result.Instance.Name)
        -- Fire remote event to server here
    end
end

RunService.RenderStepped:Connect(function(dt)
    -- Recoil Recovery
    GunSystem.Recoil = GunSystem.Recoil:Lerp(Vector3.new(0,0,0), dt * 10)
    Camera.CFrame = Camera.CFrame * CFrame.Angles(GunSystem.Recoil.Y, GunSystem.Recoil.X, 0)
end)

return GunSystem`
  },
  {
    id: '3',
    title: 'CommandDispatcher',
    type: 'ServerScript',
    description: 'Server-side command pattern implementation with permission levels and argument parsing.',
    code: `-- AdminCommands.lua
local Commands = {}
local Admins = {
    [12345678] = true, -- UserId
    ["UDIN-K"] = true
}

game.Players.PlayerAdded:Connect(function(player)
    player.Chatted:Connect(function(msg)
        if not Admins[player.UserId] and not Admins[player.Name] then return end
        
        local args = msg:split(" ")
        local cmd = args[1]:lower()
        
        if cmd == ":kick" and args[2] then
            local target = game.Players:FindFirstChild(args[2])
            if target then
                target:Kick("Kicked by admin.")
            end
        elseif cmd == ":givecoins" then
            -- Logic to give coins
            print("Gave coins")
        end
    end)
end)

return Commands`
  },
  {
    id: '4',
    title: 'AStarPathfinder',
    type: 'ModuleScript',
    description: 'Optimized pathfinding and interpolation algorithm for autonomous agents.',
    code: `-- PetFollowAI.lua
local RunService = game:GetService("RunService")

local PetAI = {}

function PetAI:StartFollowing(petModel, ownerCharacter)
    local rootPart = ownerCharacter:WaitForChild("HumanoidRootPart")
    local petRoot = petModel.PrimaryPart
    
    local alignPos = Instance.new("AlignPosition")
    alignPos.Mode = Enum.PositionAlignmentMode.OneAttachment
    alignPos.Attachment0 = petRoot:FindFirstChild("RootAttachment")
    alignPos.Responsiveness = 20
    alignPos.Parent = petRoot
    
    RunService.Heartbeat:Connect(function()
        if not rootPart then return end
        
        -- Calculate target position behind player
        local targetCFrame = rootPart.CFrame * CFrame.new(2, 2, 4)
        alignPos.Position = targetCFrame.Position
        
        -- Smooth rotation
        petRoot.CFrame = petRoot.CFrame:Lerp(CFrame.new(petRoot.Position, targetCFrame.Position), 0.1)
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
    <section id="portfolio" className="py-24 bg-slate-900 relative border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="mb-12 animate-fade-in-up">
           <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
             Lua Scripting & <span className="text-blue-500">System Architecture</span>
           </h2>
           <p className="text-slate-400 max-w-2xl">
             A showcase of modular logic systems designed for high-concurrency environments. 
             These modules handle data persistence, kinematic physics, and administrative control flow.
           </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scripts.map((script) => (
            <div 
              key={script.id}
              onClick={() => setSelectedScript(script)}
              className="group cursor-pointer bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Icon based on type */}
              <div className="mb-4 flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    script.type === 'ModuleScript' ? 'bg-yellow-500/20 text-yellow-500' :
                    script.type === 'LocalScript' ? 'bg-blue-500/20 text-blue-500' :
                    'bg-green-500/20 text-green-500'
                }`}>
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                   </svg>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-900 px-2 py-1 rounded">
                    {script.type === 'ModuleScript' ? 'Module' : script.type === 'LocalScript' ? 'Client' : 'Server'}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {script.title}
              </h3>
              <p className="text-sm text-slate-400 line-clamp-2">
                  {script.description}
              </p>
              <div className="mt-4 text-xs font-mono text-slate-500 flex items-center">
                 <span className="w-2 h-2 bg-slate-600 rounded-full mr-2"></span>
                 View Code
              </div>
            </div>
          ))}
        </div>

        {/* Modal Pop-up */}
        {selectedScript && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
            <div className="bg-[#1e1e1e] w-full max-w-3xl rounded-xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
              
              {/* Modal Header */}
              <div className="bg-[#252526] px-4 py-3 border-b border-[#3e3e42] flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                   <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                   </svg>
                   <span className="text-sm font-medium text-white">{selectedScript.title}.lua</span>
                </div>
                <div className="flex items-center gap-2">
                   <button 
                     onClick={handleCopy}
                     className="text-xs flex items-center gap-1 px-3 py-1.5 bg-[#333333] hover:bg-[#444444] text-white rounded transition-colors"
                   >
                     {copied ? (
                        <>
                           <svg className="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                           Copied!
                        </>
                     ) : (
                        <>
                           <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                           Copy
                        </>
                     )}
                   </button>
                   <button 
                     onClick={() => setSelectedScript(null)}
                     className="p-1.5 hover:bg-red-500/20 hover:text-red-400 text-slate-400 rounded transition-colors"
                   >
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                     </svg>
                   </button>
                </div>
              </div>

              {/* Modal Body (Code Editor Look) */}
              <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed bg-[#1e1e1e] text-[#d4d4d4]">
                 <pre className="whitespace-pre-wrap">
                    <code>{selectedScript.code}</code>
                 </pre>
              </div>
              
              <div className="bg-[#007acc] px-4 py-1 text-[10px] text-white flex justify-between shrink-0">
                  <span>Ln 1, Col 1</span>
                  <span>UTF-8</span>
                  <span>Lua</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};