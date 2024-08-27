import React from "react";
import SearchPage from "./components/SearchPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ImageCanvas from "./components/ImageCanvas";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path= "/canvas-editor" element={<ImageCanvas/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
