import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './auth/login/login'
import { UserPage } from './user/userPage/userPage';
import { useState } from 'react';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<UserPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
