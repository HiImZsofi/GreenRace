//imports
import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { response } from 'express';
import RegistrationFormHandler from './components/registrationFormHandler';

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
      <RegistrationFormHandler/>
    )
}


export default App;
