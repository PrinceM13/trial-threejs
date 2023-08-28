import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "@/store";

const ColorPicker = () => {
  const snap = useSnapshot(state);

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        onChange={(color) => (state.color = color.hex)}
        presetColors={[
          "#000000", // black
          "#FFFFFF", // white
          "#FF0000", // red
          "#00FF00", // green
          "#0000FF", // blue
          "#FFFF00" // yellow
        ]}
        disableAlpha
      />
    </div>
  );
};

export default ColorPicker;
