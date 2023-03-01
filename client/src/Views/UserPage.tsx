//Imports
import React, { useEffect, useState } from "react";
import "./Pages.css";
import NavMenuLayout from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import { UserPageDto } from "../Interfaces";
import NavMenu from "../components/NavBarLogic";
import { useNavigate } from "react-router-dom";

//UserPage main code
const UserPage = () => {
  const [username, setUsername] = useState("");
  const [picfilepath, setPicfilepath] = useState("");
  const [points, setPoints] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  let dark = localStorage.getItem('darkmode');
  const navigate = useNavigate();

  //Getting data form Server
  //TODO: this doens't work getting data just ask down if loged in new fetch probably required
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
          setUsername(data.username);
          setPicfilepath(data.picfilepath);
          setPoints(data.points);
        }
      }
    );
  };

  useEffect(() => {
		authenticationHandler();
	});

  //Page Visual Part
  return (
    <div key={"userPage"}>
      <NavMenu username={username} profilePicturePath={picfilepath} />
      <div className="text-center mt-3">
        <div>
          <h1>
            {points} <span id={dark == "false" ? "pont-dark": "pont-light"}>Zöldpont</span>-od van
          </h1>
          <p>Ez 1000 szenyezésnek felel meg</p>
        </div>
        <div>
          <h6>Elért eredmények:</h6>
          <img
            alt="Achivements"
            src="achivement_placeholder.jpg"
            height="300vh="
            width="400vh="
            className="mb-3"
          />
        </div>
        <div>
          <h6>Statisztikáid:</h6>
          <img alt="Graph" src="graph-placeholder.jpg" className="mb-3" />
        </div>
      </div>
    </div>
  );
};
export default UserPage;
