"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, RoundedBox, Text } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh } from "three";
import { MathUtils, Vector3 } from "three";

type ProductShowcaseProps = {
  introActive: boolean;
  reducedMotion: boolean;
};

type PartTarget = {
  ref: React.RefObject<Group>;
  from: [number, number, number];
  to: [number, number, number];
  fromRotation?: [number, number, number];
  toRotation?: [number, number, number];
};

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

function movePart(part: PartTarget, progress: number) {
  const node = part.ref.current;
  if (!node) return;

  const eased = smoothstep(progress);
  node.position.set(
    MathUtils.lerp(part.from[0], part.to[0], eased),
    MathUtils.lerp(part.from[1], part.to[1], eased),
    MathUtils.lerp(part.from[2], part.to[2], eased)
  );

  const fromRotation = part.fromRotation ?? [0, 0, 0];
  const toRotation = part.toRotation ?? [0, 0, 0];
  node.rotation.set(
    MathUtils.lerp(fromRotation[0], toRotation[0], eased),
    MathUtils.lerp(fromRotation[1], toRotation[1], eased),
    MathUtils.lerp(fromRotation[2], toRotation[2], eased)
  );
}

function AnimatedCamera({ introActive, reducedMotion }: ProductShowcaseProps) {
  const { camera } = useThree();
  const start = useRef<number | null>(null);

  useFrame(({ clock }) => {
    if (reducedMotion) {
      camera.position.lerp(new Vector3(0, 0.28, 5.65), 0.08);
      camera.lookAt(0, 0.1, 0);
      return;
    }

    if (introActive && start.current === null) start.current = clock.elapsedTime;
    if (!introActive) start.current = null;

    const elapsed = start.current === null ? 1 : Math.min((clock.elapsedTime - start.current) / 5.2, 1);
    const eased = smoothstep(elapsed);
    const targetZ = MathUtils.lerp(8.3, 5.45, eased);
    const targetY = MathUtils.lerp(0.88, 0.28, eased);
    camera.position.lerp(new Vector3(0, targetY, targetZ), 0.07);
    camera.lookAt(0, 0.1, 0);
  });

  return null;
}

function ArtDecoAssembly({ introActive, reducedMotion }: ProductShowcaseProps) {
  const root = useRef<Group>(null);
  const bottle = useRef<Group>(null);
  const box = useRef<Group>(null);
  const ring = useRef<Group>(null);
  const sprayer = useRef<Group>(null);
  const cap = useRef<Group>(null);
  const amber = useRef<Mesh>(null);
  const start = useRef<number | null>(null);

  const parts = useMemo<PartTarget[]>(
    () => [
      {
        ref: bottle,
        from: [0, -1.05, 0],
        to: [0, -0.22, 0],
        fromRotation: [0.18, -0.34, -0.08],
        toRotation: [0, -0.1, 0]
      },
      {
        ref: box,
        from: [2.55, -0.45, -0.95],
        to: [1.52, -0.3, -0.72],
        fromRotation: [0.02, -0.85, 0.1],
        toRotation: [0, -0.24, 0]
      },
      {
        ref: ring,
        from: [-1.75, 1.48, 0.28],
        to: [0, 1.55, 0.02],
        fromRotation: [1.28, 0.24, -0.46],
        toRotation: [0, 0, 0]
      },
      {
        ref: sprayer,
        from: [1.45, 2.15, 0.22],
        to: [0, 1.92, 0.02],
        fromRotation: [0.42, 0.1, 0.36],
        toRotation: [0, 0, 0]
      },
      {
        ref: cap,
        from: [0, 3.35, 0.34],
        to: [0, 2.27, 0.02],
        fromRotation: [-0.22, 0.78, 0],
        toRotation: [0, 0, 0]
      }
    ],
    []
  );

  useFrame(({ clock }) => {
    if (reducedMotion) {
      parts.forEach((part) => movePart(part, 1));
      if (root.current) root.current.rotation.y = -0.08;
      return;
    }

    if (introActive && start.current === null) start.current = clock.elapsedTime;
    if (!introActive) start.current = null;

    const introProgress = start.current === null ? 1 : Math.min((clock.elapsedTime - start.current) / 4.9, 1);
    parts.forEach((part, index) => {
      const staggered = MathUtils.clamp((introProgress - index * 0.08) / 0.72, 0, 1);
      movePart(part, staggered);
    });

    if (root.current) {
      root.current.rotation.y = -0.08 + Math.sin(clock.elapsedTime * 0.34) * 0.075;
      root.current.position.y = Math.sin(clock.elapsedTime * 0.72) * 0.035;
    }

    if (amber.current) amber.current.rotation.z = Math.sin(clock.elapsedTime * 0.9) * 0.012;
  });

  return (
    <group ref={root} position={[0, -0.08, 0]}>
      <group ref={box}>
        <RoundedBox args={[1.54, 3.34, 0.78]} radius={0.045} smoothness={5} position={[0, -0.05, 0]}>
          <meshStandardMaterial color="#120804" roughness={0.38} metalness={0.18} />
        </RoundedBox>
        <mesh position={[0, -0.05, 0.397]}>
          <planeGeometry args={[1.16, 2.62]} />
          <meshStandardMaterial color="#2b1309" roughness={0.35} metalness={0.16} />
        </mesh>
        <mesh position={[0, 0.05, 0.409]}>
          <planeGeometry args={[0.62, 0.9]} />
          <meshStandardMaterial color="#8f1b14" roughness={0.31} metalness={0.12} />
        </mesh>
        <Text
          position={[0, 0.14, 0.428]}
          fontSize={0.32}
          letterSpacing={0.08}
          color="#d8ae72"
          anchorX="center"
          anchorY="middle"
        >
          XXI
        </Text>
        <mesh position={[0, 1.23, 0.418]}>
          <boxGeometry args={[0.86, 0.018, 0.018]} />
          <meshStandardMaterial color="#d5a866" roughness={0.2} metalness={0.82} />
        </mesh>
        <mesh position={[0, -1.33, 0.418]}>
          <boxGeometry args={[0.86, 0.018, 0.018]} />
          <meshStandardMaterial color="#d5a866" roughness={0.2} metalness={0.82} />
        </mesh>
      </group>

      <group ref={bottle}>
        <RoundedBox args={[1.78, 3.48, 0.78]} radius={0.06} smoothness={8} position={[0, 0, 0]}>
          <meshPhysicalMaterial
            color="#1b0d08"
            roughness={0.08}
            metalness={0.08}
            transmission={0.48}
            thickness={0.64}
            transparent
            opacity={0.58}
            clearcoat={1}
            clearcoatRoughness={0.03}
            ior={1.48}
          />
        </RoundedBox>
        <mesh ref={amber} position={[0, -0.04, 0.08]}>
          <boxGeometry args={[1.26, 2.72, 0.48]} />
          <meshPhysicalMaterial
            color="#c47a34"
            roughness={0.16}
            metalness={0.05}
            transparent
            opacity={0.5}
            transmission={0.42}
            thickness={0.8}
            clearcoat={0.55}
            clearcoatRoughness={0.08}
          />
        </mesh>
        <mesh position={[-0.43, 0.12, 0.505]} rotation={[0, 0, -0.09]}>
          <planeGeometry args={[0.08, 2.7]} />
          <meshStandardMaterial color="#fff3dc" transparent opacity={0.35} roughness={0.2} metalness={0.05} />
        </mesh>
        <mesh position={[0.55, 0.22, 0.51]} rotation={[0, 0, 0.1]}>
          <planeGeometry args={[0.045, 2.25]} />
          <meshStandardMaterial color="#e8c08b" transparent opacity={0.22} roughness={0.2} metalness={0.08} />
        </mesh>
        <mesh position={[0, -0.02, 0.48]}>
          <boxGeometry args={[0.84, 1.08, 0.05]} />
          <meshStandardMaterial color="#d4ad72" roughness={0.24} metalness={0.46} />
        </mesh>
        <Text
          position={[0, 0.11, 0.545]}
          fontSize={0.32}
          letterSpacing={0.09}
          color="#841911"
          anchorX="center"
          anchorY="middle"
        >
          XXI
        </Text>
        <Text
          position={[0, -0.28, 0.545]}
          fontSize={0.13}
          letterSpacing={0.08}
          color="#5d120d"
          anchorX="center"
          anchorY="middle"
        >
          ART DECO
        </Text>
        {[-0.48, -0.24, 0, 0.24, 0.48].map((x, index) => (
          <mesh key={x} position={[x, -0.2, 0.54]} rotation={[0, 0, index % 2 === 0 ? 0.18 : -0.18]}>
            <boxGeometry args={[0.018, 0.78, 0.018]} />
            <meshStandardMaterial color="#090503" roughness={0.2} metalness={0.55} />
          </mesh>
        ))}
        <mesh position={[-0.98, 0, 0.1]}>
          <boxGeometry args={[0.035, 3.2, 0.08]} />
          <meshStandardMaterial color="#c79a63" roughness={0.26} metalness={0.7} />
        </mesh>
        <mesh position={[0.98, 0, 0.1]}>
          <boxGeometry args={[0.035, 3.2, 0.08]} />
          <meshStandardMaterial color="#c79a63" roughness={0.26} metalness={0.7} />
        </mesh>
      </group>

      <group ref={ring}>
        <mesh>
          <torusGeometry args={[0.44, 0.08, 22, 96]} />
          <meshStandardMaterial color="#d9ad6e" roughness={0.18} metalness={0.86} />
        </mesh>
        <mesh>
          <torusGeometry args={[0.53, 0.012, 14, 96]} />
          <meshStandardMaterial color="#fff0c9" roughness={0.16} metalness={0.9} />
        </mesh>
      </group>

      <group ref={sprayer}>
        <mesh>
          <cylinderGeometry args={[0.42, 0.34, 0.46, 12]} />
          <meshStandardMaterial color="#080403" roughness={0.14} metalness={0.68} />
        </mesh>
        <mesh position={[0.25, 0.13, 0]}>
          <boxGeometry args={[0.42, 0.12, 0.28]} />
          <meshStandardMaterial color="#0c0705" roughness={0.16} metalness={0.62} />
        </mesh>
      </group>

      <group ref={cap}>
        <RoundedBox args={[0.92, 0.56, 0.66]} radius={0.045} smoothness={7}>
          <meshStandardMaterial color="#050302" roughness={0.13} metalness={0.62} />
        </RoundedBox>
        <mesh position={[0, 0.34, 0]}>
          <sphereGeometry args={[0.18, 32, 16]} />
          <meshStandardMaterial color="#d9ad6e" roughness={0.16} metalness={0.9} />
        </mesh>
        <mesh position={[0, -0.01, 0.345]}>
          <planeGeometry args={[0.58, 0.32]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.12} roughness={0.2} metalness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function WebGLFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-[#070403]">
      <div className="relative h-[72%] w-[min(42vw,360px)] min-w-[220px] border border-[#b9874d]/35 bg-black shadow-[0_38px_120px_rgba(0,0,0,0.78)]">
        <div className="absolute -right-[42%] top-[10%] h-[78%] w-[70%] border border-[#b9874d]/20 bg-[#130905]" />
        <div className="absolute -top-14 left-1/2 h-16 w-[52%] -translate-x-1/2 bg-[#050302]" />
        <div className="absolute left-1/2 top-[38%] grid h-36 w-36 -translate-x-1/2 place-items-center bg-[#b9874d]/70 text-center">
          <span className="text-4xl font-semibold tracking-[0.1em] text-[#8d1d15]">XXI</span>
        </div>
      </div>
    </div>
  );
}

function WebGLScene(props: ProductShowcaseProps) {
  return (
    <Canvas camera={{ position: [0, 0.35, 7.7], fov: 31 }} dpr={[1, 1.8]} shadows>
      <color attach="background" args={["#070403"]} />
      <ambientLight intensity={0.24} />
      <spotLight castShadow position={[-3.4, 5.8, 4.5]} angle={0.32} penumbra={0.92} intensity={6.4} color="#f2c58b" shadow-mapSize={[1024, 1024]} />
      <spotLight position={[3.8, 1.6, 3.2]} angle={0.38} penumbra={0.8} intensity={2.1} color="#9c5e34" />
      <pointLight position={[0.2, -2.3, 3.4]} intensity={2.25} color="#d69b58" />
      <pointLight position={[-1.7, 1.1, 2.8]} intensity={1.35} color="#e8c08b" />
      <pointLight position={[0, 3.4, -1.2]} intensity={1.1} color="#fff0cf" />
      <AnimatedCamera {...props} />
      <ArtDecoAssembly {...props} />
      <ContactShadows position={[0, -2.12, 0]} opacity={0.62} scale={6.6} blur={2.7} far={3.6} color="#050201" />
    </Canvas>
  );
}

export function ProductShowcase({ introActive, reducedMotion }: ProductShowcaseProps) {
  const [webglReady, setWebglReady] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    setWebglReady(Boolean(gl));
  }, []);

  return (
    <div className="absolute inset-0">
      {webglReady ? <WebGLScene introActive={introActive} reducedMotion={reducedMotion} /> : <WebGLFallback />}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[9] h-[min(66vw,690px)] w-[min(78vw,760px)] -translate-x-1/2 -translate-y-[44%]"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(248,183,102,0.28),rgba(154,76,26,0.1)_46%,transparent_70%)] blur-3xl" />
        <div className="absolute left-[2%] top-[13%] h-[78%] w-[48%] opacity-95 drop-shadow-[0_44px_90px_rgba(0,0,0,0.78)]">
          <Image
            src="/images/products/clive-christian-xxi-art-deco-blonde-amber.png"
            alt="Clive Christian XXI Art Deco Blonde Amber флакон и коробка"
            fill
            priority
            sizes="(max-width: 768px) 70vw, 38vw"
            className="object-contain"
          />
        </div>
        <div className="absolute left-[41%] top-[2%] h-[94%] w-[46%] drop-shadow-[0_50px_120px_rgba(0,0,0,0.82)]">
          <Image
            src="/images/products/clive-christian-xxi-art-deco-blonde-amber.png"
            alt="Clive Christian XXI Art Deco Blonde Amber"
            fill
            priority
            sizes="(max-width: 768px) 72vw, 34vw"
            className="object-contain"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden w-40 -translate-x-1/2 translate-y-10 select-none text-center mix-blend-screen drop-shadow-[0_0_18px_rgba(126,22,16,0.34)]">
        <p className="text-[8px] uppercase tracking-[0.34em] text-[#7e1610]">XXI Art Deco</p>
        <p className="mt-1 text-[18px] font-semibold leading-none text-[#7e1610]">Blonde</p>
        <p className="text-[14px] uppercase tracking-[0.2em] text-[#7e1610]">Amber</p>
      </div>
    </div>
  );
}
