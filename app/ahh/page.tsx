"use client";

import { Model3D } from "@/components";
import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export default function Ahh(): JSX.Element {
  return (
    <main className="bg-neutral-500 min-h-screen flex flex-col justify-center items-center gap-8">
      <div className="text-4xl text-white">Ahh time!</div>
      <div className="w-[600px] h-[400px] bg-white rounded-2xl">
        <Canvas>
          <Model3D.Ahh />
          <Environment preset="city" />
          <OrbitControls />
          <ambientLight intensity={0.5} />
        </Canvas>
      </div>
    </main>
  );
}
