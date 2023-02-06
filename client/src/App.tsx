//imports
import React, { Fragment, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { response } from 'express';
import RegistrationFormHandler from './components/registrationFormHandler';
import {  BrowserRouter as Router,  Routes,  Route,  Link, BrowserRouter  } from 'react-router-dom'; 

function App() {

    // const [data, setData] = useState(null);
    // const [error, setError] = useState(null);
  
    // useEffect(() => {
    //   fetch('http://localhost:3306/api')
    //     .then(response => response.json())
    //     .then(data => setData(data))
    //     .catch(error => setError(error));
    // }, []);
  
    // return (
    //   <div>
    //     <>
    //     {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    //     </>
    //   </div>
    // );


    return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegistrationFormHandler />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;
