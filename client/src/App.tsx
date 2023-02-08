//imports
import React, { useEffect, useState } from 'react';
import './App.css';
import { response } from 'express';
import {  BrowserRouter as Router,  Routes,  Route,  Link, BrowserRouter  } from 'react-router-dom';
import UserPage from './userPage';

function App() {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:3306/api')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => setError(error));
    }, []);
  
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/userPage" element={<UserPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
    );
}


export default App;
