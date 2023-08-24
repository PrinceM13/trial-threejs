import Canvas from "@/canvas";
import { Customizer, Home } from "@/pages";

export default function App() {
  return (
    <main className="app transition-all ease-in">
      <h1 className="head-text">ThreeJS</h1>
      <Home />
      <Canvas />
      <Customizer />
    </main>
  );
}
