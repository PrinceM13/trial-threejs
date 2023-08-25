import state from "@/store";
import { useSnapshot } from "valtio";

const ButtonCustom = ({
  type,
  title,
  customStyles,
  handleClick
}: {
  type: string;
  title: string;
  customStyles: string;
  handleClick: () => void;
}): JSX.Element => {
  const snap = useSnapshot(state);

  const generateStyle = (type: string) => {
    switch (type) {
      case "filled":
        return {
          backgroundColor: snap.color,
          color: "#fff"
        };

      //   case "outlined":
      //     return {
      //       backgroundColor: "transparent",
      //       color: snap.color,
      //       border: `1px solid ${snap.color}`
      //     };

      default:
        return {
          backgroundColor: "#5F9EA0",
          color: "#fff"
        };
    }
  };
  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default ButtonCustom;
