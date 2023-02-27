import React, { useState } from "react";
import "./Pages.css";
import NavMenu from "../components/NavBarLogic";
import "bootstrap/dist/css/bootstrap.css";

const FriendPage = () => {
  const [username, setUsername] = useState("");
  const [picFilePath, setPicFilePath] = useState("");
  const [point, setPoint] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div key={"friendPage"}>
      <NavMenu username={username} profilePicturePath={picFilePath} />
      <div className="text-center mt-3">
        <div>
          <h1>Barátok:</h1>
          <ul>
            <li>USername: 1000pont</li>
            <li>USername: 1000pont</li>
            <li>USername: 1000pont</li>
            <li>USername: 1000pont</li>
            <li>USername: 1000pont</li>
            <li>USername: 1000pont</li>
            <li>USername: 1000pont</li>
            <li>USername: 1000pont</li>
            <li>USername: 1000pont</li>
            <li>USername: 1000pont</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default FriendPage;
