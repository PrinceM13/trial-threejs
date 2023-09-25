"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Model3D } from "@/components";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";

const initialLensSize = { width: 400, height: 400 };
const initialImageSize: number = 400;

const displayImages = [
  { label: "ahh-duo", url: "/images/ahh/ahh-duo.jpeg" },
  { label: "ahh-yellow-front", url: "/images/ahh/ahh-yellow-front.jpeg" },
  { label: "ahh-yellow-back", url: "/images/ahh/ahh-yellow-back.jpeg" },
  { label: "ahh-brown-front", url: "/images/ahh/ahh-brown-front.jpeg" },
  { label: "ahh-brown-back", url: "/images/ahh/ahh-brown-back.jpeg" }
];

export default function Ahh(): JSX.Element {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bound, setBound] = useState({ x: 0, y: 0 });
  const [lensSize, setLensSize] = useState(initialLensSize);
  const [zoomRatio, setZoomRatio] = useState(2);
  const [isZooming, setIsZooming] = useState(false);
  const [selectedImage, setSelectedImage] = useState(displayImages[0]);

  const imageRef = useRef<any>(null);

  const updateBound = () => {
    const image: any = imageRef.current;
    if (image) {
      const bound = image.getBoundingClientRect();
      setBound({ x: bound.x, y: bound.y });
    }
  };

  // * get bound of image
  useEffect(() => {
    updateBound();

    // * attach the scroll event listener
    window.addEventListener("scroll", updateBound);

    // * clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", updateBound);
    };
  }, []);

  const moveLens = (e: MouseEvent) => {
    setPosition({ x: e.clientX - bound.x, y: e.clientY - bound.y });
  };

  return (
    <main className="bg-neutral-800 text-white min-h-screen flex flex-col justify-center items-center gap-8 py-20">
      <div className="text-4xl bg-neutral-600 px-8 py-4 rounded-xl">Ahh time!</div>

      <div className="w-[80%] flex flex-col justify-center items-center gap-8 px-20 py-10 border-4 border-teal-500 rounded-2xl">
        <div className="text-2xl">Image with magnify (pure)</div>
        <div className="flex gap-4">
          {[
            { laber: "x1", value: 1 },
            { laber: "x1.5", value: 1.5 },
            { laber: "x2", value: 2 },
            { laber: "x5", value: 5 }
          ].map((zoom) => (
            <div
              key={zoom.value}
              className={`px-2 py-1 rounded-2xl shadow-neutral-950 cursor-pointer bg-neutral-400 shadow-lg hover:bg-neutral-500 active:bg-neutral-600 ${
                zoom.value == zoomRatio ? "bg-teal-500 hover:bg-teal-500 active:bg-teal-500" : ""
              }`}
              onClick={() => setZoomRatio(zoom.value)}
            >
              {zoom.laber}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {/* image */}
          <Image
            ref={imageRef}
            src={selectedImage.url}
            width={initialImageSize}
            height={initialImageSize}
            alt="Ahh"
            className="cursor-zoom-in"
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={(e) => moveLens(e)}
            // onTouchMove={(e) => moveLens(e)}
          />

          {/* lens */}
          <div
            className={`border-2 border-neutral-400 ${isZooming ? "" : "invisible"}`}
            style={{
              width: `${lensSize.width}px`,
              height: `${lensSize.height}px`,
              left: `${position.x - lensSize.width / 2}px`,
              top: `${position.y - lensSize.height / 2}px`,
              backgroundImage: `url(${selectedImage.url})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: `${initialImageSize * zoomRatio}px ${initialImageSize * zoomRatio}px`,
              backgroundPosition: `-${
                position.x * zoomRatio - lensSize.width / 2 <
                initialImageSize * zoomRatio - lensSize.width
                  ? position.x * zoomRatio - lensSize.width / 2
                  : initialImageSize * zoomRatio - lensSize.width
              }px -${
                position.y * zoomRatio - lensSize.height / 2 <
                initialImageSize * zoomRatio - lensSize.height
                  ? position.y * zoomRatio - lensSize.height / 2
                  : initialImageSize * zoomRatio - lensSize.height
              }px`
            }}
          ></div>
          <div className="absolute">Ahh</div>
        </div>

        {/* thumbnail */}
        <div className="flex gap-4">
          {displayImages.map((image) => (
            <Image
              key={image.label}
              src={image.url}
              width={initialImageSize}
              height={initialImageSize}
              alt={image.label}
              className={`w-32 cursor-pointer hover:border-8 hover:border-teal-500
            ${image.label == selectedImage.label ? "border-8 border-teal-500" : ""}
            `}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
      </div>

      <div className="w-[80%] flex flex-col justify-center items-center gap-8 px-20 py-10 border-4 border-teal-500 rounded-2xl">
        <div className="text-2xl">3D model</div>
        <div className="w-[600px] h-[400px] bg-white">
          <Canvas>
            <Model3D.Ahh />
            <Environment preset="city" />
            <OrbitControls />
            <ambientLight intensity={0.5} />
          </Canvas>
        </div>
      </div>
    </main>
  );
}
