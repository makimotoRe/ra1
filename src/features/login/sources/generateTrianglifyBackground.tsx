import Trianglify from "trianglify";

export const generateTrianglifyBackground = () => {
  const pattern = Trianglify({
    width: window.innerWidth,
    height: window.innerHeight,
    xColors: [
      "#f0f1f6",
      "#e5dbf0",
      "#d4c4e3",
      "#c4add7",
      "#b496cb",
      "#a37fbe",
      "#9368b2",
    ],
    yColors: ["#f0f1f6"],
  });

  const canvas = pattern.toCanvas();
  return canvas.toDataURL();
};
