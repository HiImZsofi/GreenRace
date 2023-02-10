//imports
import Grid from "@mui/material/Grid";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RegisterForm from "./Views/RegisterForm";
import TestHome from "./TestHome";

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
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<TestHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
