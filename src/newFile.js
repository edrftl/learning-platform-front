import React from 'react';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { root } from '.';

root.render(
    // <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />}>
                {/* <Route index element={<Home />} /> */}
                <Route path="main" element={<Main />} />
                <Route path="progress" element={<h1>Progress</h1>} />
                <Route path="homework" element={<h1>Homework</h1>} />
                <Route path="educational-material" element={<h1>Educational Material</h1>} />
                <Route path="schedule" element={<h1>Schedule</h1>} />
                <Route path="*" element={<h1>Page Not Found!</h1>} />
            </Route>
        </Routes>
    </BrowserRouter>
);
