//imports
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { response } from 'express';
import {  BrowserRouter as Router,  Routes,  Route,  Link, BrowserRouter  } from 'react-router-dom';
import UserPage from './userPage';
import RankPage from './rankPage';
import FriendPage from './friendPage';

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
        <Route path="/rankPage" element={<RankPage />}>
        </Route>
        <Route path="/friendPage" element={<FriendPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
    );
}


export default App;
