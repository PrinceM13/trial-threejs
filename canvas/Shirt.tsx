"use client";

import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "@/store";

const Shirt = () => {
  const snap = useSnapshot(state);
  let geometry: any = null;
  let material: any = null;
  const isShirt = true;

  if (isShirt) {
    const { nodes, materials }: any = useGLTF("/3d-models/shirt/shirt_baked.glb");
    geometry = nodes.T_Shirt_male.geometry;
    material = materials.lambert1;
  } else {
    const { nodes }: any = useGLTF("/3d-models/ahh/3DModel_LowPoly.glb");
    geometry = nodes.defaultobject.geometry;
    material = nodes.defaultobject.material;
  }

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  useFrame((state, delta) => {
    easing.dampC(material.color, snap.color, 0.25, delta);
  });

  const stateString: string = JSON.stringify(snap);
  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={geometry}
        material={material}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />
        )}
        {snap.isLogoTexture && (
          <Decal position={[0, 0.04, 0.1]} rotation={[0, 0, 0]} scale={0.15} map={logoTexture} />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
