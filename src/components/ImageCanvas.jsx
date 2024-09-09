
import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { useLocation } from "react-router-dom";

const ImageCanvas = () => {
  const canvasRef = useRef(null);
  const location = useLocation();
  const { image: imageUrl } = location.state || {};
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    if (!imageUrl) return;

    const image = new Image();
    image.crossOrigin = "Anonymous";
    image.src = imageUrl;

    // console.log(image.width,image.height)

    image.onload = () => {
      if (canvasRef.current) {
        const aspectRatio = image.width / image.height;
        const canvasWidth = image.width;
        const canvasHeight = canvasWidth / aspectRatio;

        const fabricCanvas = new fabric.Canvas(canvasRef.current, {
          width: canvasWidth,
          height: canvasHeight,
        });

        const fabricImage = new fabric.FabricImage(image, {
          selectable: false,
          evented: false,
        });

        fabricImage.scaleToWidth(fabricCanvas.width);
        fabricImage.scaleToHeight(fabricCanvas.height);
        fabricCanvas.set("backgroundImage", fabricImage);
        fabricCanvas.renderAll();
        setCanvas(fabricCanvas);
      }
    };

    return () => {
      if (canvas) {
        canvas.dispose();
      }
    };
  }, [imageUrl, canvas]);

  const addText = () => {
    const text = new fabric.Textbox("Enter text here", {
      left: 50,
      top: 50,
      width: 300,
      fontSize: 20,
    });
    canvas.add(text);
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "red",
          left: 100,
          top: 100,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: "green",
          left: 150,
          top: 150,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "blue",
          left: 200,
          top: 200,
        });
        break;
      default:
        return;
    }
    canvas.add(shape);
  };

  const downloadImage = () => {
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "modified-image.png";
    link.click();
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:gap-20">
      <canvas ref={canvasRef} className="border border-gray-300 mb-4 mt-7" />
      <div className="flex flex-col mb-4 mt-8 p-5 gap-7">
        <div className="flex gap-20">
          <button
            onClick={addText}
            className="bg-gray-500 text-white px-4 py-2 rounded-full"
          >
            Add Text
          </button>
          <button
            onClick={() => addShape("circle")}
            className="bg-red-500 text-white px-4 py-2 rounded-full"
          >
            Add Circle
          </button>
        </div>
        <div className="flex gap-6">
          <button
            onClick={() => addShape("rectangle")}
            className="bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Add Rectangle
          </button>
          <button
            onClick={() => addShape("triangle")}
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Add Triangle
          </button>
        </div>
        <button
          onClick={downloadImage}
          className="bg-yellow-500 text-white px-4 py-2 rounded-full"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default ImageCanvas;
