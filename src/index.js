import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Graph from './Graph';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Government from './government';
import Home from './Home';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/App" element={<App />} />
      <Route path="/Graph" element={<Graph />} />
      <Route path="/Government" element={<Government />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
