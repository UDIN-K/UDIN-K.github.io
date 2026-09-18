import React, { useEffect, useRef } from 'react';

// === Shaders ===
const VERT = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG_ADVECT_VELOCITY = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2  uTexSize;
uniform float uDt;
uniform float uViscosity;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 velocity = texture(uVelocity, vUv).xy;
  vec2 coord = clamp(vUv - velocity * uDt / uTexSize, 0.0, 1.0);
  vec2 newVel = texture(uSource, coord).xy * (1.0 - uViscosity);
  fragColor = vec4(newVel, 0.0, 1.0);
}`;

const FRAG_DIVERGENCE = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform vec2 uTexSize;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  float left   = texture(uVelocity, vUv + vec2(-1.0 / uTexSize.x, 0.0)).x;
  float right  = texture(uVelocity, vUv + vec2( 1.0 / uTexSize.x, 0.0)).x;
  float bottom = texture(uVelocity, vUv + vec2(0.0, -1.0 / uTexSize.y)).y;
  float top    = texture(uVelocity, vUv + vec2(0.0,  1.0 / uTexSize.y)).y;
  fragColor = vec4((right - left + top - bottom) * 0.5, 0.0, 0.0, 1.0);
}`;

const FRAG_PRESSURE = `#version 300 es
precision highp float;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
uniform vec2 uTexSize;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 texel = 1.0 / uTexSize;
  float left   = texture(uPressure, vUv - vec2(texel.x, 0.0)).r;
  float right  = texture(uPressure, vUv + vec2(texel.x, 0.0)).r;
  float bottom = texture(uPressure, vUv - vec2(0.0, texel.y)).r;
  float top    = texture(uPressure, vUv + vec2(0.0, texel.y)).r;
  float div    = texture(uDivergence, vUv).r;
  fragColor = vec4((left + right + bottom + top - div) * 0.25, 0.0, 0.0, 1.0);
}`;

const FRAG_GRADIENT = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uPressure;
uniform vec2 uTexSize;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  float left   = texture(uPressure, vUv - vec2(1.0 / uTexSize.x, 0.0)).r;
  float right  = texture(uPressure, vUv + vec2(1.0 / uTexSize.x, 0.0)).r;
  float bottom = texture(uPressure, vUv - vec2(0.0, 1.0 / uTexSize.y)).r;
  float top    = texture(uPressure, vUv + vec2(0.0, 1.0 / uTexSize.y)).r;
  vec2  vel    = texture(uVelocity, vUv).xy;
  vel -= vec2((right - left) * 0.5, (top - bottom) * 0.5);
  fragColor = vec4(vel, 0.0, 1.0);
}`;

const FRAG_ADVECT_INK = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform sampler2D uInk;
uniform vec2  uTexSize;
uniform float uDt;
uniform float uColorFade;
uniform float uAlphaFade;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 vel   = texture(uVelocity, vUv).xy;
  vec2 coord = clamp(vUv - vel * uDt / uTexSize, 0.0, 1.0);
  vec4 col   = texture(uInk, coord);
  col.rgb *= uColorFade;
  col.a   *= uAlphaFade;
  fragColor = col;
}`;

const FRAG_SPLAT_VELOCITY = `#version 300 es
precision highp float;
uniform sampler2D uVelocity;
uniform vec2  uPoint;
uniform vec2  uAdd;
uniform float uRadius;
uniform float uAspect;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec2 vel = texture(uVelocity, vUv).xy;
  vec2 d = vUv - uPoint;
  d.x *= uAspect;
  float dist = length(d);
  if (dist < uRadius) {
    vel += uAdd * (1.0 - dist / uRadius);
  }
  fragColor = vec4(vel, 0.0, 1.0);
}`;

const FRAG_SPLAT_INK = `#version 300 es
precision highp float;
uniform sampler2D uInk;
uniform vec2  uPoint;
uniform vec3  uColor;
uniform float uRadius;
uniform float uAspect;
in  vec2 vUv;
out vec4 fragColor;
void main() {
  vec4 oldColor = texture(uInk, vUv);
  vec2 d = vUv - uPoint;
  d.x *= uAspect;
  float dist = length(d);
  if (dist < uRadius) {
    oldColor = mix(oldColor, vec4(uColor, 1.0), 1.0 - dist / uRadius);
  }
  fragColor = oldColor;
}`;

const FRAG_COMPOSITE = `#version 300 es
precision highp float;
uniform sampler2D u_bgTexture;
uniform sampler2D u_bgTexture02;
uniform sampler2D u_fluidTexture;
uniform vec2  u_resolution;
uniform vec2  u_imageResolution;
uniform float u_distortionAmount;
uniform float u_zoom;
uniform float u_rgbShiftAmount;
uniform float u_fluidThreshold;
in  vec2 vUv;
out vec4 fragColor;

void main() {
  float screenAspect = u_resolution.x / u_resolution.y;
  float imageAspect  = u_imageResolution.x / u_imageResolution.y;
  vec2 scale = vec2(
    min(screenAspect / imageAspect, 1.0),
    min(imageAspect / screenAspect, 1.0)
  ) / max(u_zoom, 1.0);
  vec2 coverUV = (vUv - 0.5) * scale + 0.5;

  vec4 fluid       = texture(u_fluidTexture, vUv);
  vec2 fluidOffset = (fluid.rg - 0.5) * u_distortionAmount;
  vec2 uv = clamp(coverUV + fluidOffset, 0.0, 1.0);

  vec4 colorNoShift = texture(u_bgTexture, uv);
  vec2 uvShift = clamp(uv + u_rgbShiftAmount, 0.0, 1.0);
  vec4 colorShifted = vec4(texture(u_bgTexture02, uvShift).rgb, 1.0);

  float mask = clamp(fluid.a - u_fluidThreshold, 0.0, 1.0);
  fragColor = mix(colorShifted, colorNoShift, mask);
}`;

// === WebGL Helpers ===
function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const sh = gl.createShader(type);
  if (!sh) throw new Error("Could not create shader");
  gl.shaderSource(sh, source);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || "compile err");
  return sh;
}

function createProgram(gl: WebGL2RenderingContext, fragSource: string) {
  const program = gl.createProgram();
  if (!program) throw new Error("Program creation failed");
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, fragSource));
  gl.bindAttribLocation(program, 0, "position");
  gl.linkProgram(program);
  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if(info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
  }
  return { program, uniforms };
}

function createFBO(gl: WebGL2RenderingContext, w: number, h: number, internalFormat: number, format: number, type: number) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
  const fbo = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  return { texture, fbo, width: w, height: h };
}

function createDoubleFBO(gl: WebGL2RenderingContext, w: number, h: number, internalFormat: number, format: number, type: number) {
  return {
    read: createFBO(gl, w, h, internalFormat, format, type),
    write: createFBO(gl, w, h, internalFormat, format, type),
    swap() { const t = this.read; this.read = this.write; this.write = t; }
  };
}

function loadTexture(gl: WebGL2RenderingContext, url: string) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([10, 20, 28, 255]));
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const image = new Image();
  image.decoding = "async";
  image.crossOrigin = "anonymous";
  const ready = new Promise<{width:number, height:number} | null>((resolve) => {
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => resolve(null);
  });
  image.src = url;
  return { texture, ready };
}

export const WebGLFluid: React.FC<{
  colorSrc: string,
  monoSrc: string,
  className?: string
}> = ({ colorSrc, monoSrc, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    
    const gl = canvas.getContext("webgl2", { alpha: false, antialias: false, depth: false });
    if (!gl || !gl.getExtension("EXT_color_buffer_float")) return;
    gl.getExtension("OES_texture_float_linear");

    const programs = {
      advectVelocity: createProgram(gl, FRAG_ADVECT_VELOCITY),
      divergence: createProgram(gl, FRAG_DIVERGENCE),
      pressure: createProgram(gl, FRAG_PRESSURE),
      gradient: createProgram(gl, FRAG_GRADIENT),
      advectInk: createProgram(gl, FRAG_ADVECT_INK),
      splatVelocity: createProgram(gl, FRAG_SPLAT_VELOCITY),
      splatInk: createProgram(gl, FRAG_SPLAT_INK),
      composite: createProgram(gl, FRAG_COMPOSITE),
    };

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const N = 256; // Reduced slightly for performance
    const velocity = createDoubleFBO(gl, N, N, (gl as any).RGBA16F, gl.RGBA, (gl as any).HALF_FLOAT);
    const pressure = createDoubleFBO(gl, N, N, (gl as any).RGBA16F, gl.RGBA, (gl as any).HALF_FLOAT);
    const ink = createDoubleFBO(gl, N, N, (gl as any).RGBA16F, gl.RGBA, (gl as any).HALF_FLOAT);
    const divergence = createFBO(gl, N, N, (gl as any).RGBA16F, gl.RGBA, (gl as any).HALF_FLOAT);

    const bg = loadTexture(gl, colorSrc);
    const bg02 = loadTexture(gl, monoSrc);
    let imageResolution = [2048, 1365];

    Promise.all([bg.ready, bg02.ready]).then(res => {
      const got = res.find(r => r && r.width);
      if (got) imageResolution = [got.width, got.height];
    });

    const emitters = Array(6).fill(0).map(() => ({
      angle: Math.random() * Math.PI * 2, radius: Math.random() * 0.6,
      speed: Math.random() * 0.45 + 0.05, size: 0.6, prevX: 0, prevY: 0, seeded: false
    }));

    const pointer = { active: false, x: 0, y: 0, dx: 0, dy: 0 };
    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      pointer.active = true;
      pointer.x = (e.clientX - r.left) / r.width;
      pointer.y = 1 - (e.clientY - r.top) / r.height;
      pointer.dx = (e.movementX || 0) / r.width * 10;
      pointer.dy = -(e.movementY || 0) / r.height * 10;
    };
    window.addEventListener("pointermove", onMove);

    const blit = (target: any) => {
      if (target) { gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo); gl.viewport(0, 0, target.width, target.height); }
      else { gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, canvas.width, canvas.height); }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const bind = (tex: WebGLTexture|null, unit: number) => { gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex); return unit; };

    const splat = (prog: any, target: any, uniformsSet: (u: any) => void) => {
      gl.useProgram(prog.program); uniformsSet(prog.uniforms); blit(target.write); target.swap();
    };

    let rafId = 0;
    let last = performance.now();
    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 1/20);
      last = now;

      emitters.forEach(e => {
        e.angle += e.speed * dt;
        const x = 0.5 + e.radius * Math.cos(e.angle);
        const y = 0.5 + e.radius * Math.sin(e.angle);
        if (e.seeded) {
          splat(programs.splatVelocity, velocity, u => {
            gl.uniform1i(u.uVelocity, bind(velocity.read.texture, 0));
            gl.uniform2f(u.uPoint, x, y); gl.uniform2f(u.uAdd, (x-e.prevX)*1, (y-e.prevY)*120);
            gl.uniform1f(u.uRadius, 0.03); gl.uniform1f(u.uAspect, 1);
          });
          splat(programs.splatInk, ink, u => {
            gl.uniform1i(u.uInk, bind(ink.read.texture, 0));
            gl.uniform2f(u.uPoint, x, y); gl.uniform3f(u.uColor, e.size, 0.8, 0.8);
            gl.uniform1f(u.uRadius, 0.04); gl.uniform1f(u.uAspect, 1);
          });
        }
        e.prevX = x; e.prevY = y; e.seeded = true;
      });

      if (pointer.active) {
        splat(programs.splatVelocity, velocity, u => {
          gl.uniform1i(u.uVelocity, bind(velocity.read.texture, 0));
          gl.uniform2f(u.uPoint, pointer.x, pointer.y); gl.uniform2f(u.uAdd, pointer.dx, pointer.dy);
          gl.uniform1f(u.uRadius, 0.03); gl.uniform1f(u.uAspect, 1);
        });
        splat(programs.splatInk, ink, u => {
          gl.uniform1i(u.uInk, bind(ink.read.texture, 0));
          gl.uniform2f(u.uPoint, pointer.x, pointer.y); gl.uniform3f(u.uColor, 10, 1, 1);
          gl.uniform1f(u.uRadius, 0.04); gl.uniform1f(u.uAspect, 1);
        });
        pointer.active = false;
      }

      // Advect Velocity
      splat(programs.advectVelocity, velocity, u => {
        gl.uniform1i(u.uVelocity, bind(velocity.read.texture, 0)); gl.uniform1i(u.uSource, bind(velocity.read.texture, 0));
        gl.uniform2f(u.uTexSize, N, N); gl.uniform1f(u.uDt, 10.0); gl.uniform1f(u.uViscosity, 0.02);
      });
      // Divergence
      gl.useProgram(programs.divergence.program);
      gl.uniform1i(programs.divergence.uniforms.uVelocity, bind(velocity.read.texture, 0));
      gl.uniform2f(programs.divergence.uniforms.uTexSize, N, N);
      blit(divergence);
      // Pressure
      gl.useProgram(programs.pressure.program);
      gl.uniform2f(programs.pressure.uniforms.uTexSize, N, N);
      gl.uniform1i(programs.pressure.uniforms.uDivergence, bind(divergence.texture, 1));
      for(let i=0; i<10; i++) {
        gl.uniform1i(programs.pressure.uniforms.uPressure, bind(pressure.read.texture, 0));
        blit(pressure.write); pressure.swap();
      }
      // Gradient
      splat(programs.gradient, velocity, u => {
        gl.uniform1i(u.uVelocity, bind(velocity.read.texture, 0)); gl.uniform1i(u.uPressure, bind(pressure.read.texture, 1));
        gl.uniform2f(u.uTexSize, N, N);
      });
      // Advect Ink
      splat(programs.advectInk, ink, u => {
        gl.uniform1i(u.uVelocity, bind(velocity.read.texture, 0)); gl.uniform1i(u.uInk, bind(ink.read.texture, 1));
        gl.uniform2f(u.uTexSize, N, N); gl.uniform1f(u.uDt, 10.0); gl.uniform1f(u.uColorFade, 0.98); gl.uniform1f(u.uAlphaFade, 0.99);
      });

      // Composite
      gl.useProgram(programs.composite.program);
      gl.uniform1i(programs.composite.uniforms.u_bgTexture, bind(bg.texture, 0));
      gl.uniform1i(programs.composite.uniforms.u_bgTexture02, bind(bg02.texture, 1));
      gl.uniform1i(programs.composite.uniforms.u_fluidTexture, bind(ink.read.texture, 2));
      gl.uniform2f(programs.composite.uniforms.u_resolution, canvas.width, canvas.height);
      gl.uniform2f(programs.composite.uniforms.u_imageResolution, imageResolution[0], imageResolution[1]);
      gl.uniform1f(programs.composite.uniforms.u_distortionAmount, 0.01);
      gl.uniform1f(programs.composite.uniforms.u_zoom, 1.5);
      gl.uniform1f(programs.composite.uniforms.u_rgbShiftAmount, 0.002);
      gl.uniform1f(programs.composite.uniforms.u_fluidThreshold, 0.02);
      blit(null);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(container.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(container.clientHeight * dpr));
    };
    resize();
    window.addEventListener("resize", resize);

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [colorSrc, monoSrc]);

  return (
    <div ref={containerRef} className={`w-full h-full absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full outline-none" />
    </div>
  );
};