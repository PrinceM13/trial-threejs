import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#EFBD48",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./images/BlueSeas-logo.png",
  fullDecal: "./images/BlueSeas-logo.png"
  // logoDecal: "./images/threejs.png",
  // fullDecal: "./images/threejs.png"
});

export default state;
