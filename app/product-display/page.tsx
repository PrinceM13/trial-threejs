"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { Model3D } from "@/components";
import Image from "next/image";
import { MouseEvent, useEffect, useRef, useState } from "react";

const initialLensSize = { width: 400, height: 400 };
const initialImageSize: number = 400;
const thumbnailSize: number = 80;

const displayImages = [
  { order: 6, label: "3d-model", url: "" },
  { order: 1, label: "ahh-duo", url: "/images/ahh/ahh-duo.jpeg" },
  { order: 2, label: "ahh-yellow-front", url: "/images/ahh/ahh-yellow-front.jpeg" },
  { order: 3, label: "ahh-yellow-back", url: "/images/ahh/ahh-yellow-back.jpeg" },
  { order: 4, label: "ahh-brown-front", url: "/images/ahh/ahh-brown-front.jpeg" },
  { order: 5, label: "ahh-brown-back", url: "/images/ahh/ahh-brown-back.jpeg" }
];

export default function ProductDisplay(): JSX.Element {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bound, setBound] = useState({ x: 0, y: 0 });
  const [lensSize, setLensSize] = useState(initialLensSize);
  const [zoomRatio, setZoomRatio] = useState(2);
  const [isZooming, setIsZooming] = useState(false);
  const [selectedImage, setSelectedImage] = useState(displayImages[1]);

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

  // * next image by order (default: move forward)
  const moveImage = (currentOrder: number, moveForward: boolean = true) => {
    const nextImage = displayImages.find(
      (image) => image.order === (moveForward ? currentOrder + 1 : currentOrder - 1)
    );
    if (nextImage) {
      setSelectedImage(nextImage);
    }
  };

  return (
    <main className="bg-neutral-800 text-white min-h-screen flex flex-col justify-center items-center gap-8 py-20">
      <div className="text-4xl bg-neutral-600 px-8 py-4 rounded-xl">Ahh time!</div>

      <div className="w-[80%] flex flex-col justify-center items-center gap-8 px-20 py-10 border-4 border-teal-500 rounded-2xl">
        <div className="text-2xl">Ahh today and 4ever</div>

        {selectedImage.label === "3d-model" ? (
          <div className="w-[600px] h-[400px] bg-white">
            <Canvas>
              <Model3D.Ahh />
              <Environment preset="city" />
              <OrbitControls />
              <ambientLight intensity={0.5} />
            </Canvas>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-4">
              {[
                { laber: "x2", value: 2 },
                { laber: "x3", value: 3 },
                { laber: "x4", value: 4 },
                { laber: "x5", value: 5 }
              ].map((zoom) => (
                <div
                  key={zoom.value}
                  className={`px-2 py-1 rounded-2xl shadow-neutral-950 cursor-pointer bg-neutral-400 shadow-lg hover:bg-neutral-500 active:bg-neutral-600 ${
                    zoom.value == zoomRatio
                      ? "bg-teal-500 hover:bg-teal-500 active:bg-teal-500"
                      : ""
                  }`}
                  onClick={() => setZoomRatio(zoom.value)}
                >
                  {zoom.laber}
                </div>
              ))}
            </div>
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
                // left: `${position.x - lensSize.width / 2}px`,
                // top: `${position.y - lensSize.height / 2}px`,
                backgroundImage: `url(${selectedImage.url})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${initialImageSize * zoomRatio}px ${
                  initialImageSize * zoomRatio
                }px`,
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
          </div>
        )}

        {/* thumbnail */}
        <div className="flex items-center gap-4">
          <div
            className="text-sm px-2 py-1 flex justify-center items-center rounded-full border border-neutral-500 cursor-pointer hover:bg-neutral-500"
            style={{ width: thumbnailSize }}
            onClick={() => moveImage(selectedImage.order, false)}
          >
            previous
          </div>
          {displayImages
            .sort((a, b) => a.order - b.order)
            .map((image) => (
              <div
                key={image.label}
                onClick={() => setSelectedImage(image)}
                className={`flex justify-center items-center cursor-pointer hover:border-4 hover:border-teal-500 ${
                  image.label == selectedImage.label ? "border-4 border-teal-500" : ""
                } `}
              >
                {image.label === "3d-model" ? (
                  <div
                    className="flex justify-center items-center bg-teal-700"
                    style={{ width: thumbnailSize, height: thumbnailSize }}
                  >
                    3d model
                  </div>
                ) : (
                  <div
                    className="bg-teal-500"
                    style={{ width: thumbnailSize, height: thumbnailSize }}
                  >
                    <Image
                      src={image.url}
                      width={800}
                      height={800}
                      alt={image.label}
                      style={{ width: thumbnailSize, height: thumbnailSize }}
                    />
                  </div>
                )}
              </div>
            ))}
          <div
            className="text-sm px-2 py-1 flex justify-center items-center rounded-full border border-neutral-500 cursor-pointer hover:bg-neutral-500"
            style={{ width: thumbnailSize }}
            onClick={() => moveImage(selectedImage.order)}
          >
            next
          </div>
        </div>
      </div>
    </main>
  );
}
