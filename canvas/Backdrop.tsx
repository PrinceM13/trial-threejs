"use client";

import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows: any = useRef();
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={100}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight amount={4} radius={4} intensity={1.2} ambient={0.8} position={[5, 5, -10]} />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.85}
        ambient={0.8}
        position={[-5, 5, -10]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
