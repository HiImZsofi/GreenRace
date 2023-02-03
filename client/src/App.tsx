//imports
import React, { useEffect, useState } from 'react';
import './App.css';
import { response } from 'express';
import LoginForm from './Login';

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
      <React.StrictMode>
        <LoginForm />
      </React.StrictMode>
    );
}


export default App;
