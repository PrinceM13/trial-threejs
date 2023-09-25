import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function AhhModel(props: any) {
  const { nodes }: any = useGLTF("/3d-models/ahh/3DModel_LowPoly.glb");
  const geometry = nodes.defaultobject.geometry;
  const material = nodes.defaultobject.material;
  return (
    <group {...props} dispose={null}>
      <mesh geometry={geometry} material={material} />
    </group>
  );
}

useGLTF.preload("/3DModel_LowPoly.glb");
