// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CanvasEditor from "./components/CanvasEditor";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canvas/:canvasId" element={<CanvasEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
