import React from "react";
import { useNavigate } from "react-router-dom";
import { createNewCanvas, db } from '../config/firebase.js'


const Home = () => {
  const navigate = useNavigate();

 const handleCreateCanvas = async () => {
    try {
      const canvasId = await createNewCanvas();
      navigate(`/canvas/${canvasId}`);
    } catch (error) {
      alert("Error creating canvas, check console for details.");
    }
  };
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1> Welcome to 2D Canvas Editor</h1>
      <button onClick={handleCreateCanvas}>Create New Canvas</button>
    </div>
  );
};

export default Home;
