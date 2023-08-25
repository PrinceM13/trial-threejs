import { CanvasModel } from "@/canvas";
import { Customizer, Home } from "@/contents";

export default function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <CanvasModel />
      <Customizer />
    </main>
  );
}
