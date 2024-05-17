import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './components/Main';
import Progress from './components/Progress';
import Homework from './components/Homework';
import EducationalMaterial from './components/EducationalMaterial';
import Schedule from './components/Schedule';
//import { BrowserRouter, Route, Routes };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="main" element={<Main />} />
        <Route path="progress" element={<Progress />} />
        <Route path="homework" element={<Homework />} />
        <Route path="educational-material" element={<EducationalMaterial />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

