//Imports
import React, { useEffect, useState } from "react";
import "./Pages.css";
import NavMenu from "../components/NavBarLogic";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";

//FriendPage main code
//TODO: Not functional yet
const FriendPage = () => {
  const [username, setUsername] = useState("");
  const [picFilePath, setPicFilePath] = useState("");
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  let dark = localStorage.getItem('darkmode');
  const navigate = useNavigate();

  //Getting data form Server
  const authenticationHandler = async () => {
    const token = localStorage.getItem("key");
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      withCredentials: true,
    };
    fetch("http://localhost:3001/userPage", requestOptions).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        if (response.status !== 200) {
          navigate("/login", { replace: true });
        } else {
          setUsername(data.userData.username);
          setPicFilePath(data.userData.picfilepath);
        }
      }
    );
  };

  function handleResize() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    authenticationHandler();
    if (dark == "false"){
      document.body.className = "body-dark body-zoom";
    } else {
      document.body.className = "body-light body-zoom";
    }
    window.addEventListener('resize', handleResize)
  });

  //Page Visual Part
  //TODO: Only Placeholder
  return (
    <div key={"friendPage"}>
      <NavMenu username={username} profilePicturePath={picFilePath} width={windowSize}/>
      <div className="text-center mt-3">
        <div>
          <h1>Barátok:</h1>
              <img
            alt="No-friends-placeholder"
            src="friends.jpg"
            height="300vh="
            width="100%"
            className="mb-3"
            />
        </div>
      </div>
    </div>
  );
};
export default FriendPage;
