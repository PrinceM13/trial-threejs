"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";

import { Shirt, Backdrop, CameraRig } from "@/canvas";

const CanvasModel = (): JSX.Element => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
