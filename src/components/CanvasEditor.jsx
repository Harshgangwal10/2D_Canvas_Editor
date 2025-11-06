import React, { useEffect, useRef, useState } from "react";
import * as fabricModule from "fabric";
import { useParams } from "react-router-dom";
import {loadCanvas, saveCanvas} from '../config/firebase.js'
import "./CanvasEditor.css";


const CanvasEditor = () => {
  const { canvasId } = useParams(); 
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
   const [selectedColor, setSelectedColor] = useState("#000000");

  // Initialize canvas
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1400,
      height: 500,
      backgroundColor: "#ffffffff",
    
    });
    fabricRef.current = canvas;


 // Load existing canvas data if present in Firestore
 
const load = async () => {
    const data = await loadCanvas(canvasId);
    if (data) {
      fabricRef.current.loadFromJSON(data, () => fabricRef.current.renderAll());
    }
  };

    load();
    return () => canvas.dispose();
  }, [canvasId]);

   // Save Canvas to Firestore
const handleSave = async () => {
  setIsSaving(true);
  const success = await saveCanvas(canvasId, fabricRef.current.toJSON(["selectable", "editable"]));
  if (success) alert("Canvas saved successfully!");
  else alert("Error saving canvas. Check console.");
  setIsSaving(false);
};

  // Add Rectangle
  const addRectangle = () => {
    const canvas = fabricRef.current;
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: "blue",
      width: 100,
      height: 100,
    });
    canvas.add(rect);
  };

  // Add Circle
  const addCircle = () => {
    const canvas = fabricRef.current;
    const circle = new fabric.Circle({
      left: 200,
      top: 200,
      radius: 50,
      fill: "red",
    });
    canvas.add(circle);
  };

  //  Add Text
  const addText = () => {
    const canvas = fabricRef.current;
    const text = new fabric.Textbox("Edit me!", {
      left: 300,
      top: 150,
      fontSize: 24,
      fill: "black",
    });
    canvas.add(text);
  };

  //  Toggle Pen
  const togglePen = () => {
    const canvas = fabricRef.current;
    canvas.isDrawingMode = !canvas.isDrawingMode;
    setIsDrawingMode(canvas.isDrawingMode);
  };

  //  Delete Selected
  const deleteSelected = () => {
    const canvas = fabricRef.current;
    const activeObj = canvas.getActiveObject();
    if (activeObj) {
      canvas.remove(activeObj);
    }
  };
  const changeColor = (color) => {
    setSelectedColor(color);
    const activeObj = fabricRef.current.getActiveObject();
    if (activeObj) {
      activeObj.set("fill", color);
      fabricRef.current.renderAll();
    }
  };




  return (
    <div className="canvas-editor">
  <h2>Canvas Editor</h2>

  {/* Show Canvas ID */}

  <div className="canvas-id">Canvas ID: {canvasId}</div>

  <div className="toolbar">
    <button onClick={addRectangle}>Add Rectangle</button>
    <button onClick={addCircle}>Add Circle</button>
    <button
  onClick={() => {
    const canvas = fabricRef.current;
    const text = new fabric.Textbox("Edit me!", {
      left: 300,
      top: 150,
      fontSize: 24,
      fill: selectedColor,
      editable: true,
      textBaseline: "alphabetic", 
    });
    canvas.add(text);
  }}
>
  Add Text
</button>

    <button onClick={togglePen}>
      {isDrawingMode ? "Disable Pen" : "Enable Pen"}
    </button>
    <button onClick={deleteSelected}>Delete Selected</button>
    <button onClick={handleSave} disabled={isSaving}>
      {isSaving ? "Saving..." : "Save Canvas"}
    </button>

   
    <div className="color-picker-wrapper">
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => changeColor(e.target.value)}
        title="Pick Color"
        className="color-picker"
      />
    </div>
  </div>

  <div className="canvas-wrapper">
    <canvas ref={canvasRef} className="canvas-container" />
  </div>
</div>

  );
};

export default CanvasEditor;
