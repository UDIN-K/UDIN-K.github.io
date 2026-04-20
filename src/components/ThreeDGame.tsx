import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { Trophy, Play, RefreshCw, Shield, Target, AlertCircle } from 'lucide-react';

export const ThreeDGame: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [health, setHealth] = useState(100);

  // Game Logic Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const playerRef = useRef<THREE.Mesh | null>(null);
  const tilesRef = useRef<THREE.Group[]>([]);
  const enemiesRef = useRef<THREE.Group[]>([]);
  
  // Physics & Mechanics Refs
  const frameIdRef = useRef<number>(0);
  const scoreRef = useRef<number>(0);
  const healthRef = useRef<number>(100);
  const targetPos = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const currentPos = useRef<{x: number, z: number}>({x: 0, z: 0});
  const boardSize = 5;
  const tileSize = 2.2;

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    scene.fog = new THREE.FogExp2(0x020617, 0.1);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, currentMount.clientWidth / currentMount.clientHeight, 0.1, 100);
    camera.position.set(0, 12, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.shadowMap.enabled = true;
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const spotLight = new THREE.SpotLight(0x00f2ff, 100);
    spotLight.position.set(10, 20, 10);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Initial Board
    const createBoard = () => {
        for (let i = -boardSize; i <= boardSize; i++) {
            for (let j = -boardSize; j <= boardSize; j++) {
                const group = new THREE.Group();
                const geo = new THREE.BoxGeometry(tileSize - 0.2, 0.2, tileSize - 0.2);
                const mat = new THREE.MeshPhongMaterial({ 
                    color: (i + j) % 2 === 0 ? 0x0f172a : 0x1e293b,
                    emissive: 0x00f2ff,
                    emissiveIntensity: 0.1
                });
                const tile = new THREE.Mesh(geo, mat);
                group.position.set(i * tileSize, -0.2, j * tileSize);
                group.add(tile);
                scene.add(group);
                tilesRef.current.push(group);
            }
        }
    };
    createBoard();

    // Player (Chess Piece Style)
    const playerGeo = new THREE.CylinderGeometry(0.5, 0.7, 1.5, 6);
    const playerMat = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x00f2ff, emissiveIntensity: 0.5 });
    const player = new THREE.Mesh(playerGeo, playerMat);
    player.position.set(0, 0.75, 0);
    player.castShadow = true;
    scene.add(player);
    playerRef.current = player;

    const handleResize = () => {
        if (!currentMount || !cameraRef.current || !rendererRef.current) return;
        rendererRef.current.setSize(currentMount.clientWidth, currentMount.clientHeight);
        cameraRef.current.aspect = currentMount.clientWidth / currentMount.clientHeight;
        cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        if (currentMount) currentMount.innerHTML = '';
        cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  const movePlayer = useCallback((dx: number, dz: number) => {
    if (gameState !== 'playing') return;
    const nx = Math.max(-boardSize, Math.min(boardSize, currentPos.current.x + dx));
    const nz = Math.max(-boardSize, Math.min(boardSize, currentPos.current.z + dz));
    currentPos.current = {x: nx, z: nz};
    targetPos.current.set(nx * tileSize, 0.75, nz * tileSize);
  }, [gameState, boardSize, tileSize]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
        if (e.code === 'ArrowLeft' || e.code === 'KeyA') movePlayer(-1, 0);
        if (e.code === 'ArrowRight' || e.code === 'KeyD') movePlayer(1, 0);
        if (e.code === 'ArrowUp' || e.code === 'KeyW') movePlayer(0, -1);
        if (e.code === 'ArrowDown' || e.code === 'KeyS') movePlayer(0, 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [movePlayer]);

  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnEnemy = () => {
        if (!sceneRef.current) return;
        if (Math.random() < 0.05 + scoreRef.current * 0.001) {
            const ex = Math.floor(Math.random() * (boardSize * 2 + 1)) - boardSize;
            const ez = Math.floor(Math.random() * (boardSize * 2 + 1)) - boardSize;
            
            // Don't spawn on player
            if (ex === currentPos.current.x && ez === currentPos.current.z) return;

            const enemyGroup = new THREE.Group();
            const geo = new THREE.OctahedronGeometry(0.6);
            const mat = new THREE.MeshPhongMaterial({ color: 0xff0044, emissive: 0xff0044, emissiveIntensity: 1 });
            const mesh = new THREE.Mesh(geo, mat);
            enemyGroup.add(mesh);
            enemyGroup.position.set(ex * tileSize, 0.6, ez * tileSize);
            enemyGroup.userData = { ex, ez, life: 100 };
            
            sceneRef.current.add(enemyGroup);
            enemiesRef.current.push(enemyGroup);
        }
    };

    const animate = () => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !playerRef.current) return;

        spawnEnemy();

        // Smooth player move
        playerRef.current.position.lerp(targetPos.current, 0.2);
        playerRef.current.rotation.y += 0.05;

        // Animate Enemies & Tiles
        for (let i = enemiesRef.current.length - 1; i >= 0; i--) {
            const enemy = enemiesRef.current[i];
            enemy.rotation.x += 0.1;
            enemy.rotation.z += 0.05;
            
            // Interaction Check
            const dist = playerRef.current.position.distanceTo(enemy.position);
            if (dist < 1.0) {
                // Fixed: Players successfully hunting an enemy rewards them correctly
                scoreRef.current += 50;
                setScore(scoreRef.current);
                
                // Flash green
                playerRef.current.material = new THREE.MeshPhongMaterial({ color: 0x00ff00, emissive: 0x00ff00, emissiveIntensity: 0.5 });
                setTimeout(() => {
                    if(playerRef.current) playerRef.current.material = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0x00f2ff, emissiveIntensity: 0.5 });
                }, 100);
                
                sceneRef.current.remove(enemy);
                enemiesRef.current.splice(i, 1);
            }
        }

        // RNG Floor Events (Tiles turning red/lethal)
        tilesRef.current.forEach(tileGroup => {
            const tile = tileGroup.children[0] as THREE.Mesh;
            const mat = tile.material as THREE.MeshPhongMaterial;
            
            if (Math.random() < 0.001) {
                mat.color.setHex(0xff0044);
                tileGroup.userData.lethal = true;
                setTimeout(() => {
                    mat.color.setHex(0x0f172a);
                    tileGroup.userData.lethal = false;
                }, 3000);
            }

            if (tileGroup.userData.lethal) {
                const dist = playerRef.current!.position.distanceTo(tileGroup.position);
                if (dist < 1.0) {
                    healthRef.current -= 0.5;
                    setHealth(Math.max(0, healthRef.current));
                    if (healthRef.current <= 0) setGameState('gameover');
                }
            }
        });

        scoreRef.current += 0.01;
        setScore(Math.floor(scoreRef.current));

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [gameState, tileSize]);

  const resetGame = () => {
    if (score > highScore) setHighScore(score);
    scoreRef.current = 0;
    setScore(0);
    healthRef.current = 100;
    setHealth(100);
    currentPos.current = {x: 0, z: 0};
    targetPos.current.set(0, 0.75, 0);
    
    // Snap visual pos immediately to prevent ghost-gliding
    if (playerRef.current) playerRef.current.position.set(0, 0.75, 0);
    
    enemiesRef.current.forEach(e => sceneRef.current?.remove(e));
    enemiesRef.current = [];
    setGameState('playing');
  };

  return (
    <div className="relative w-full h-[500px] bg-slate-950 rounded-lg overflow-hidden border border-slate-900 shadow-2xl group select-none font-mono">
        <div ref={mountRef} className="w-full h-full relative overflow-hidden">
             <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(2,6,23,0.8)_100%)]"></div>
        </div>

        {/* HUD */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10 pointer-events-none">
            <div className="space-y-3">
                <div className="bg-slate-900/80 px-4 py-2 border border-slate-800 rounded flex items-center gap-3 backdrop-blur-md">
                    <Trophy className="w-4 h-4 text-accent" />
                    <span className="text-white font-black tracking-widest text-[10px] uppercase">SCORE: {score.toString().padStart(6, '0')}</span>
                </div>
                <div className="bg-slate-900/80 px-4 py-2 border border-slate-800 rounded flex items-center gap-3 backdrop-blur-md">
                    <Shield className="w-4 h-4 text-green-500" />
                    <div className="w-32 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div animate={{ width: `${health}%` }} className="h-full bg-green-500" />
                    </div>
                </div>
            </div>

            <div className="bg-slate-900/80 px-4 py-2 border border-slate-800 rounded flex items-center gap-3 backdrop-blur-md">
                <Target className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-white font-black tracking-widest text-[8px] uppercase">ARENA_INSTABILITY: {(score/1000).toFixed(2)}%</span>
            </div>
        </div>

        <AnimatePresence>
            {gameState === 'start' && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center z-20 backdrop-blur-xl"
                >
                    <div className="relative mb-12 text-center p-8 bg-slate-900/30 border border-white/5 rounded-2xl">
                        <div className="flex justify-center gap-2 mb-4">
                            {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-3 bg-accent animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />)}
                        </div>
                        <h3 className="text-6xl font-black text-white tracking-widest uppercase italic mb-2">NEURAL_ARENA</h3>
                        <p className="text-accent font-black tracking-[0.5em] text-[10px] uppercase opacity-60 italic mb-8">PVP-RNG Hybrid Core</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-left max-w-sm">
                            <div className="p-4 border border-white/5 bg-black/20">
                                <p className="text-[8px] text-slate-500 font-black uppercase mb-1">Navigation</p>
                                <p className="text-xs text-white font-bold">WASD / ARROWS</p>
                            </div>
                            <div className="p-4 border border-white/5 bg-black/20">
                                <p className="text-[8px] text-slate-500 font-black uppercase mb-1">Defense</p>
                                <p className="text-xs text-white font-bold">RNG_BUCKET_ROLL</p>
                            </div>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => setGameState('playing')}
                        className="group relative px-20 py-6 bg-white text-slate-950 font-black tracking-[0.4em] overflow-hidden transition-all hover:bg-accent"
                    >
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <span className="relative z-10 flex items-center gap-4">
                            <Play className="w-5 h-5 fill-current" /> SYNC_CONSCIOUSNESS
                        </span>
                    </button>
                </motion.div>
            )}

            {gameState === 'gameover' && (
                 <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-red-950/95 flex flex-col items-center justify-center z-20 backdrop-blur-2xl"
                 >
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <AlertCircle className="w-20 h-20 text-white animate-bounce" />
                        </div>
                        <h3 className="text-6xl font-black text-white mb-2 tracking-tighter uppercase italic">DE-SYNCHED</h3>
                        <p className="text-accent font-black tracking-[0.4em] text-xs uppercase italic opacity-60">Neural Correlation Lost</p>
                    </div>

                    <div className="bg-black/40 p-8 rounded border border-white/5 min-w-[300px] mb-12">
                         <div className="flex justify-between items-center mb-6">
                            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Final Data Points</span>
                            <span className="text-3xl text-white font-black">{score}</span>
                         </div>
                         <div className="h-[1px] bg-white/5 mb-6"></div>
                         <div className="flex justify-between items-center">
                            <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Record Max</span>
                            <span className="text-xl text-yellow-500 font-black">{Math.max(score, highScore)}</span>
                         </div>
                    </div>

                    <button 
                        onClick={resetGame}
                        className="px-16 py-5 bg-white text-red-600 font-black tracking-[0.3em] transition-all hover:bg-accent hover:text-white flex items-center gap-4 shadow-2xl"
                    >
                        <RefreshCw className="w-5 h-5" /> RE-CALIBRATE
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

        {/* Global FX */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-50 bg-[radial-gradient(circle_at_50%_0%,white,transparent)]"></div>
    </div>
  );
};
