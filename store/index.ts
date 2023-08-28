import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#1EA1A1",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./images/Png_C.png",
  fullDecal: "./images/Png_C.png"
  // logoDecal: "./images/BlueSeas-logo.png",
  // fullDecal: "./images/BlueSeas-logo.png"
  // logoDecal: "./images/threejs.png",
  // fullDecal: "./images/threejs.png"
});

export default state;
