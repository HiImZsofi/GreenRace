//Imports
import React, { useState, useEffect } from "react";
import "./Pages.css";
import NavMenu from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import { UserPageDto } from "../Interfaces";
import { Navigate, useNavigate } from "react-router-dom";

//Creating variables
interface Ranking {
  username: string;
  points: number;
}
const Ranglist: Ranking[] = [];

//RankPage main code
const RankPage = () => {
  const [username, setUsername] = useState("");
  const [picFilePath, setPicFilePath] = useState("");
  const [points, setPoints] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
          setUsername(data.username);
          setPicFilePath(data.picfilepath);
          setPoints(data.points);
        }
      }
    );
    fetch("http://localhost:3001/rankPage", requestOptions).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const rankdata = isJson && (await response.json());
        for (let i = 0; i < 10; i++) {
          if (rankdata[i] !== undefined) {
            let username: string = rankdata[i].username;
            let points = rankdata[i].points;
            let rang: Ranking = { username: username, points: points };
            Ranglist[i] = rang;
          }
        }
      });
  };

  //TODO: this needs testing after server fixed probably needed in other pages
  const logoutHandler = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    fetch("http://localhost:3001/logout", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        if (response.status == 200) {
          setIsLoggedIn(!isLoggedIn);
        }
      })

      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  useEffect(() => {
    authenticationHandler();
  });

  //Page Visual Part
  if (isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  } else {
    return (
      <div key={"rankPage"}>
        <NavMenu
          username={username}
          picfilepath={picFilePath}
          logoutHandler={logoutHandler}
        />
        <div className="text-center mt-3">
          <div>
            <h1>Rang Lista:</h1>
            <ul>
              {Ranglist.map((Ranking, i) => (
                <li key={i}>
                  {i + 1}. {Ranking.username}:{Ranking.points}p
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
};
export default RankPage;
