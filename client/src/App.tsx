//imports
import React from "react";
import "./App.css";
import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Views/Login";
import Register from "./Views/Register";
import UserSettings from "./Views/UserSettings";
import UserPage from "./Views/UserPage";
import RankPage from "./Views/RankPage";
import FriendPage from "./Views/FriendPage";

function App() {
  return (
    //Routes in the webapp
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/userPage" element={<UserPage />}></Route>
        <Route path="/rankPage" element={<RankPage />}></Route>
        <Route path="/friendPage" element={<FriendPage />}></Route>
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
