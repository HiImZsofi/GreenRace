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
        }
      }
    );
  };

  //TODO this should be done in the fetch before this but that one doesn't have point component making new fetch probably required
  const dataLoadIn = () => {
    const requestUserData = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        picfilepath: picfilepath,
        points: points,
      }),
    };
    fetch("http://localhost:3001/userpage", requestUserData).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(data);
        //TODO set state values
      }
    );
  };
  useEffect(() => {
		//TODO Make this into one fetch for better performance
		authenticationHandler();
		//!Fix fetch options
		//dataLoadIn();
	});

  //Page Visual Part
  return (
    <div key={"userPage"}>
      <NavMenu username={username} profilePicturePath={picfilepath} />
      <div className="text-center mt-3">
        <div>
          <h1>
            {points} <span id="pont">Zöldpont</span>-od van
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
