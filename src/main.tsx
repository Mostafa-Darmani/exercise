import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import StudentsList from "./components/StudentsList";
import './index.css'


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/exercise">
      <div className="app-container">   
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/students" element={<StudentsList />} />
      </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
