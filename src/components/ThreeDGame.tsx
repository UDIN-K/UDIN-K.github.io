import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { Trophy, Play, RefreshCw, Zap } from 'lucide-react';

export const ThreeDGame: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);

  // Game Logic Refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const playerRef = useRef<THREE.Mesh | null>(null);
  const floorRef = useRef<THREE.Mesh | null>(null);
  const obstaclesRef = useRef<THREE.Group[]>([]);
  
  // Physics Refs
  const frameIdRef = useRef<number>(0);
  const velocityY = useRef<number>(0);
  const isGrounded = useRef<boolean>(false);
  const gameSpeed = useRef<number>(0.2);
  const scoreRef = useRef<number>(0);
  
  const GRAVITY = -0.015;
  const JUMP_FORCE = 0.38;
  const FLOOR_Y = -2;

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020617);
    scene.fog = new THREE.Fog(0x020617, 10, 40);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 12);
    camera.position.y = 1;
    camera.lookAt(2, -1, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const spotLight = new THREE.SpotLight(0x00f2ff, 40);
    spotLight.position.set(5, 10, 5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    const floorGeo = new THREE.BoxGeometry(100, 1, 4);
    const floorMat = new THREE.MeshPhongMaterial({ color: 0x0f172a });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = FLOOR_Y - 0.5;
    floor.receiveShadow = true;
    scene.add(floor);
    floorRef.current = floor;

    const lineGeo = new THREE.BoxGeometry(100, 0.05, 0.1);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x00f2ff });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.y = FLOOR_Y;
    scene.add(line);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xffd700 });
    const player = new THREE.Mesh(geometry, material);
    player.position.set(-5, FLOOR_Y + 0.5, 0);
    player.castShadow = true;
    scene.add(player);
    playerRef.current = player;
    
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(geometry), new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 }));
    player.add(outline);

    const handleResize = () => {
        if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        if (mountRef.current) mountRef.current.innerHTML = '';
        cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  const jump = () => {
      if (gameState !== 'playing') {
          if (gameState === 'start') setGameState('playing');
          return;
      }
      if (isGrounded.current) {
          velocityY.current = JUMP_FORCE;
          isGrounded.current = false;
      }
  };

  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          const active = document.activeElement as HTMLElement;
          if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;
          if (e.code === 'Space' || e.code === 'ArrowUp') {
              e.preventDefault();
              jump();
          }
      };
      window.addEventListener('keydown', handleKeyDown);
      const container = mountRef.current;
      const onContainerClick = (e: MouseEvent | TouchEvent) => {
          if (e.cancelable) e.preventDefault();
          jump();
      }
      container?.addEventListener('mousedown', onContainerClick);
      container?.addEventListener('touchstart', onContainerClick);
      return () => {
          window.removeEventListener('keydown', handleKeyDown);
          container?.removeEventListener('mousedown', onContainerClick);
          container?.removeEventListener('touchstart', onContainerClick);
      };
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const animate = () => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !playerRef.current) return;
        playerRef.current.position.y += velocityY.current;
        if (playerRef.current.position.y <= FLOOR_Y + 0.5) {
            playerRef.current.position.y = FLOOR_Y + 0.5;
            velocityY.current = 0;
            isGrounded.current = true;
            const targetRot = Math.round(playerRef.current.rotation.z / (Math.PI / 2)) * (Math.PI / 2);
            playerRef.current.rotation.z += (targetRot - playerRef.current.rotation.z) * 0.2;
        } else {
            velocityY.current += GRAVITY;
            isGrounded.current = false;
            playerRef.current.rotation.z -= 0.15;
        }
        const minDistance = 10;
        const lastObs = obstaclesRef.current[obstaclesRef.current.length - 1];
        if ((!lastObs || (20 - lastObs.position.x) > minDistance) && Math.random() < 0.02 + scoreRef.current * 0.0001) {
            const group = new THREE.Group();
            const mesh = Math.random() > 0.7 ? 
                new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshPhongMaterial({ color: 0x00ffcc, emissive: 0x00ffcc, emissiveIntensity: 0.5 })) :
                new THREE.Mesh(new THREE.ConeGeometry(0.5, 1, 4), new THREE.MeshPhongMaterial({ color: 0xff0044, emissive: 0xff0044, emissiveIntensity: 0.5 }));
            if (mesh.geometry.type === 'ConeGeometry') mesh.rotation.y = Math.PI / 4;
            group.add(mesh);
            group.position.set(25, FLOOR_Y + 0.5, 0);
            sceneRef.current.add(group);
            obstaclesRef.current.push(group);
        }
        for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
            const obs = obstaclesRef.current[i];
            obs.position.x -= gameSpeed.current;
            if (Math.abs(obs.position.x - playerRef.current.position.x) < 0.8 && Math.abs(obs.position.y - playerRef.current.position.y) < 0.8) {
                setGameState('gameover');
            }
            if (obs.position.x < -15) {
                sceneRef.current.remove(obs);
                obstaclesRef.current.splice(i, 1);
                scoreRef.current += 1;
                setScore(scoreRef.current);
                if (gameSpeed.current < 0.5) gameSpeed.current += 0.001;
            }
        }
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        frameIdRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [gameState]);

  const resetGame = () => {
      scoreRef.current = 0;
      setScore(0);
      gameSpeed.current = 0.2;
      velocityY.current = 0;
      obstaclesRef.current.forEach(obs => sceneRef.current?.remove(obs));
      obstaclesRef.current = [];
      if (playerRef.current) {
        playerRef.current.position.y = FLOOR_Y + 0.5;
        playerRef.current.rotation.set(0,0,0);
      }
      setGameState('playing');
  };

  return (
    <div className="relative w-full h-[400px] bg-slate-950 rounded-lg overflow-hidden border border-slate-900 shadow-2xl group select-none font-mono">
        <div ref={mountRef} className="w-full h-full cursor-pointer touch-manipulation"></div>

        <div className="absolute top-6 left-6 flex items-center gap-4 z-10 pointer-events-none">
            <div className="bg-slate-900/80 px-4 py-2 border border-slate-800 rounded flex items-center gap-3 backdrop-blur-md">
                <Trophy className="w-4 h-4 text-accent" />
                <span className="text-white font-black tracking-widest text-sm">SCORE: {score.toString().padStart(3, '0')}</span>
            </div>
        </div>

        <AnimatePresence>
            {gameState === 'start' && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center z-20 backdrop-blur-sm"
                >
                    <div className="relative mb-8">
                        <motion.h3 
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            className="text-4xl font-black text-white tracking-[0.2em] italic text-center"
                        >
                            SYS.<span className="text-accent underline underline-offset-8">RUNNER</span>
                        </motion.h3>
                        <Zap className="absolute -top-4 -right-8 w-10 h-10 text-accent/20 animate-pulse" />
                    </div>
                    
                    <button 
                        onClick={() => setGameState('playing')}
                        className="group relative px-12 py-5 bg-white text-slate-950 font-black tracking-widest rounded-sm hover:bg-accent transition-all active:scale-95 flex items-center gap-3 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-accent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                        <Play className="w-5 h-5 relative z-10 fill-current" />
                        <span className="relative z-10">INITIALIZE</span>
                    </button>
                    
                    <p className="mt-8 text-[10px] text-slate-600 tracking-[0.3em] uppercase animate-pulse">Wait for authorization...</p>
                </motion.div>
            )}

            {gameState === 'gameover' && (
                 <motion.div 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-red-950/95 flex flex-col items-center justify-center z-20 backdrop-blur-md"
                 >
                    <h3 className="text-6xl font-black text-white mb-2 tracking-tighter uppercase italic">Crashed</h3>
                    <div className="h-1 w-32 bg-white/20 mb-8"></div>
                    <p className="text-white/60 mb-12 font-bold tracking-[0.5em] text-xl">BLOCKS: {score}</p>
                    <button 
                        onClick={resetGame}
                        className="px-10 py-4 bg-white text-red-600 font-black tracking-widest rounded transition-all hover:px-14 active:scale-95 flex items-center gap-3"
                    >
                        <RefreshCw className="w-5 h-5" /> REBOOT
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
        
        {gameState === 'playing' && (
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600 text-[10px] uppercase font-bold tracking-[0.5em] pointer-events-none animate-pulse">
                 Input Detected
             </div>
        )}
    </div>
  );
};
