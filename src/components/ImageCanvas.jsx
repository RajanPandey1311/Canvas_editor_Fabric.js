import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import { useLocation } from 'react-router-dom';

const ImageCanvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const location = useLocation();
  const { image } = location.state || {}; 
  // console.log(image)

  useEffect(() => {
    if (!image) return; 
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 700,
      height: 500,
    });
    fabricCanvasRef.current = canvas;
    fabric.FabricImage.fromURL(`${image}`, (img) => {
      canvas.backgroundImage =  img
      canvas.renderAll()
    });

    return () => {
      canvas.dispose();
    };
  }, [image]);

  const addText = () => {
    const text = new fabric.Textbox('Enter text here', {
      left: 50,
      top: 50,
      width: 200,
      fontSize: 20,
    });
    fabricCanvasRef.current.add(text);
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case 'circle':
        shape = new fabric.Circle({ radius: 50, fill: 'red', left: 100, top: 100 });
        break;
      case 'rectangle':
        shape = new fabric.Rect({ width: 100, height: 60, fill: 'green', left: 150, top: 150 });
        break;
      case 'triangle':
        shape = new fabric.Triangle({ width: 100, height: 100, fill: 'blue', left: 200, top: 200 });
        break;
      default:
        break;
    }
    fabricCanvasRef.current.add(shape);
  };

  const downloadImage = () => {
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 1,
    });
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'modified-image.png';
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      <canvas ref={canvasRef} className="border border-gray-300 mb-4 mt-7" />
      <div className="flex space-x-2 mb-4 mt-8 p-5">
        <button onClick={addText} className="bg-gray-500 text-white px-4 py-2 rounded-full">Add Text</button>
        <button onClick={() => addShape('circle')} className="bg-red-500 text-white px-4 py-2 rounded-full">Add Circle</button>
        <button onClick={() => addShape('rectangle')} className="bg-green-500 text-white px-4 py-2 rounded-full">Add Rectangle</button>
        <button onClick={() => addShape('triangle')} className="bg-blue-500 text-white px-4 py-2 rounded-full">Add Triangle</button>
      </div>
      <button onClick={downloadImage} className="bg-yellow-500 text-white px-4 py-2 rounded-full">Download</button>
    </div>
  );
};

export default ImageCanvas;
