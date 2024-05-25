import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Progress from './components/Progress';
import Homework from './components/Homework';
import EducationalMaterial from './components/EducationalMaterial';
import Schedule from './components/Schedule';
import Courses from './components/Courses';
import CourseForm from './components/CourseForm';
import CourseInfo from './components/CourseInfo';
import Catalog from './components/Catalog';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="main" element={<Main />} />
        <Route path="progress" element={<Progress />} />
        <Route path="homework" element={<Homework />} />
        <Route path="educational-material" element={<EducationalMaterial />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="course" element={<Courses />} />
        <Route path="course/create" element={<CourseForm />} />
        <Route path="course/edit/:id" element={<CourseForm />} />
        <Route path="course/info/:id" element={<CourseInfo />} />
        <Route path="catalog" element={<Catalog />} />


        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
