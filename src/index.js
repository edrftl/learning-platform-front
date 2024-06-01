import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/user/Main';
import Progress from './components/user/Progress';
import Homework from './components/user/Homework';
import EducationalMaterial from './components/user/EducationalMaterial';
import Schedule from './components/user/Schedule';
import Courses from './components/admin/Courses';
import CourseForm from './components/admin/CourseForm';
import CourseInfo from './components/newClient/CourseInfo';
import Catalog from './components/newClient/Catalog';
import Groups from './components/admin/Groups';
import GroupForm from './components/admin/GroupForm';
import Register from './components/account/Register';
import Login from './components/account/Login';

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
        <Route path="group" element={<Groups />} />
        <Route path="group/create" element={<GroupForm />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />


        <Route path="*" element={<h1>Page Not Found!</h1>} />
      </Route>
    </Routes>
  </BrowserRouter>
);