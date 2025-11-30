import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export const ThreeDGame: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
  const [score, setScore] = useState(0);

    // Ref logic game
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const playerRef = useRef<THREE.Mesh | null>(null);
  const floorRef = useRef<THREE.Mesh | null>(null);
    const obstaclesRef = useRef<THREE.Group[]>([]); // Group untuk spike + glow
  
    // Ref fisika
  const frameIdRef = useRef<number>(0);
  const velocityY = useRef<number>(0);
  const isGrounded = useRef<boolean>(false);
  const gameSpeed = useRef<number>(0.2);
  const scoreRef = useRef<number>(0);
  
    // Konstanta
  const GRAVITY = -0.015;
  const JUMP_FORCE = 0.38;
  const FLOOR_Y = -2;

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Setup scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Slate 900 (warna)
    // fog untuk kedalaman
    scene.fog = new THREE.Fog(0x0f172a, 10, 40);
    sceneRef.current = scene;

    // Kamera (view samping)
    const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 12); // mundur
    camera.position.y = 1;
    camera.lookAt(2, -1, 0); // lihat sedikit ke depan
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Pencahayaan
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const spotLight = new THREE.SpotLight(0x38bdf8, 20);
    spotLight.position.set(5, 10, 5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // 3. Lantai (garis neon)
    const floorGeo = new THREE.BoxGeometry(100, 1, 4);
    const floorMat = new THREE.MeshPhongMaterial({ 
        color: 0x1e293b, 
        emissive: 0x0f172a,
        specular: 0x111111,
        shininess: 30
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = FLOOR_Y - 0.5; // sedikit di bawah garis
    floor.receiveShadow = true;
    scene.add(floor);
    floorRef.current = floor;

    // Garis glow lantai (jalur lari)
    const lineGeo = new THREE.BoxGeometry(100, 0.05, 0.1);
    const lineMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const line = new THREE.Mesh(lineGeo, lineMat);
    line.position.y = FLOOR_Y;
    line.position.z = 0;
    scene.add(line);

    // 4. Pemain (kubus)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // Gaya Geometry Dash: kubus neon kuning
    const material = new THREE.MeshPhongMaterial({ 
        color: 0xffd700, // emas/kuning
        emissive: 0xaa4400,
        emissiveIntensity: 0.2
    });
    const player = new THREE.Mesh(geometry, material);
    player.position.set(-5, FLOOR_Y + 0.5, 0);
    player.castShadow = true;
    scene.add(player);
    playerRef.current = player;
    
    // Player Trail (Simple particles logic or just a glowing outline)
    const outlineGeo = new THREE.EdgesGeometry(geometry);
    const outlineMat = new THREE.LineBasicMaterial({ color: 0xffffff });
    const outline = new THREE.LineSegments(outlineGeo, outlineMat);
    player.add(outline);

    // Partikel/Background bintang
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 200;
    const posArray = new Float32Array(starCount * 3);
    for(let i = 0; i < starCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 60;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starsMat = new THREE.PointsMaterial({ size: 0.1, color: 0x38bdf8, transparent: true, opacity: 0.5 });
    const stars = new THREE.Points(starsGeo, starsMat);
    scene.add(stars);


    // tangani resize
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
        if (mountRef.current) {
            mountRef.current.innerHTML = '';
        }
        cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

    // aksi lompat
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

    // listener input
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          const active = document.activeElement as HTMLElement;
          // cek ketat: abaikan input saat mengetik
          if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) {
              return;
          }

          if (e.code === 'Space' || e.code === 'ArrowUp') {
              e.preventDefault();
              jump();
          }
      };
      
          const handleMouseDown = (e: MouseEvent) => {
          // prevent default supaya tidak pindah fokus
          // e.preventDefault(); 
      };
      
      window.addEventListener('keydown', handleKeyDown);
      
    // pasang click di container saja
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


    // Loop game
  useEffect(() => {
    if (gameState !== 'playing') return;

    const animate = () => {
        if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !playerRef.current) return;

        // 1. Fisika (Gravitasi)
        playerRef.current.position.y += velocityY.current;
        
        if (playerRef.current.position.y <= FLOOR_Y + 0.5) {
            // kena tanah
            playerRef.current.position.y = FLOOR_Y + 0.5;
            velocityY.current = 0;
            isGrounded.current = true;
            
            // Reset rotation on ground
            // reset rotasi saat di tanah
            const rot = playerRef.current.rotation.z;
            const targetRot = Math.round(rot / (Math.PI / 2)) * (Math.PI / 2);
            playerRef.current.rotation.z += (targetRot - rot) * 0.2;

        } else {
            // di udara
            velocityY.current += GRAVITY;
            isGrounded.current = false;
            // Spin while jumping
            // putar saat lompat
            playerRef.current.rotation.z -= 0.15;
        }

        // 2. Spawn obstacle
        // peluang spawn naik seiring skor
        const spawnThreshold = 0.02 + (scoreRef.current * 0.0001);
        
        // jaga jarak min antar obstacle
        const lastObs = obstaclesRef.current[obstaclesRef.current.length - 1];
        const minDistance = 10;
        const canSpawn = !lastObs || (20 - lastObs.position.x) > minDistance;

        if (canSpawn && Math.random() < spawnThreshold) {
            const type = Math.random() > 0.7 ? 'block' : 'spike';
            
            const group = new THREE.Group();
            
            if (type === 'spike') {
                const geo = new THREE.ConeGeometry(0.5, 1, 4);
                const mat = new THREE.MeshPhongMaterial({ color: 0xff0044, emissive: 0xff0000, emissiveIntensity: 0.5 });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.rotation.y = Math.PI / 4; // Rotate to look sharp
                group.add(mesh);
                group.position.y = FLOOR_Y + 0.5;
            } else {
                const geo = new THREE.BoxGeometry(1, 1, 1);
                const mat = new THREE.MeshPhongMaterial({ color: 0x00ffcc, emissive: 0x00aa88, emissiveIntensity: 0.5 });
                const mesh = new THREE.Mesh(geo, mat);
                group.add(mesh);
                group.position.y = FLOOR_Y + 0.5;
            }

            group.position.x = 25; // spawn di depan
            group.position.z = 0;
            
            sceneRef.current.add(group);
            obstaclesRef.current.push(group);
        }

        // 3. Gerak obstacle & tabrakan
        for (let i = obstaclesRef.current.length - 1; i >= 0; i--) {
            const obs = obstaclesRef.current[i];
            obs.position.x -= gameSpeed.current;

            // Collision (AABB)
            // Collision (AABB)
            // Player x: -5, width ~1
            // Obstacle width ~1
            const dx = Math.abs(obs.position.x - playerRef.current.position.x);
            const dy = Math.abs(obs.position.y - playerRef.current.position.y);
            
            if (dx < 0.8 && dy < 0.8) {
                setGameState('gameover');
            }

            // hapus jika keluar layar
            if (obs.position.x < -15) {
                sceneRef.current.remove(obs);
                obstaclesRef.current.splice(i, 1);
                scoreRef.current += 1;
                setScore(scoreRef.current);
                
                // Speed up
                if (gameSpeed.current < 0.5) gameSpeed.current += 0.001;
            }
        }

        // 4. Simulasi gerak lantai
        if (floorRef.current) {
           // sulit scroll texture tanpa UV mapping,
           // tapi partikel memberi ilusi gerak
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
      
      // Clear obstacles
      obstaclesRef.current.forEach(obs => sceneRef.current?.remove(obs));
      obstaclesRef.current = [];
      
      // Reset Player
      if (playerRef.current) {
        playerRef.current.position.y = FLOOR_Y + 0.5;
        playerRef.current.rotation.set(0,0,0);
      }

      setGameState('playing');
  };

  return (
    <div className="relative w-full h-[400px] bg-slate-900 rounded-xl overflow-hidden border border-slate-700 shadow-2xl group select-none">
        {/* 3D Canvas Container */}
        <div ref={mountRef} className="w-full h-full cursor-pointer touch-manipulation"></div>

        {/* UI Overlay */}
        <div className="absolute top-4 right-4 bg-slate-800/80 px-4 py-2 rounded-full border border-slate-600 font-mono text-white font-bold backdrop-blur-sm z-10">
            SCORE: {score}
        </div>

        {gameState === 'start' && (
            <div className="absolute inset-0 bg-slate-900/80 flex flex-col items-center justify-center z-20">
                <h3 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2 tracking-tighter italic">
                    GEOMETRY <span className="text-white">DASH</span> 3D
                </h3>
                <p className="text-slate-400 mb-8 text-sm animate-pulse">Click or Space to Jump</p>
                <button 
                    onClick={() => setGameState('playing')}
                    className="px-10 py-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black text-lg rounded-xl shadow-[0_4px_0_rgb(161,98,7)] active:shadow-none active:translate-y-1 transition-all"
                >
                    PLAY
                </button>
            </div>
        )}

        {gameState === 'gameover' && (
             <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20 animate-fade-in-up backdrop-blur-sm">
                <h3 className="text-5xl font-black text-red-500 mb-2 drop-shadow-[0_2px_10px_rgba(220,38,38,0.8)]">CRASHED</h3>
                <p className="text-white mb-8 font-mono text-xl">Score: {score}</p>
                <button 
                    onClick={resetGame}
                    className="px-8 py-3 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-lg shadow-lg"
                >
                    RETRY
                </button>
            </div>
        )}
        
        {/* Hint text */}
        {gameState === 'playing' && (
             <div className="absolute bottom-4 left-0 right-0 text-center text-slate-500 text-xs pointer-events-none opacity-50">
                 Tap to Jump
             </div>
        )}
    </div>
  );
};