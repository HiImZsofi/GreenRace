//Imports
import React, { useState, useEffect } from "react";
import "./Pages.css";
import "bootstrap/dist/css/bootstrap.css";
import { Navigate, useNavigate } from "react-router-dom";
import NavMenu from "../components/NavBarLogic";
import { Table } from "react-bootstrap";

//Creating variables
interface Ranking {
  username: string;
  points: number;
  picfilepath: string;
}
const Ranglist: Ranking[] = [];

//RankPage main code
const RankPage = () => {
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
    fetch("http://localhost:3001/rankPage", requestOptions).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const rankdata = isJson && (await response.json());
        for (let i = 0; i < rankdata.userData.length; i++) {
          if (rankdata.userData[i] !== undefined) {
            let username: string = rankdata.userData[i].username;
            let points:number = rankdata.userData[i].points;
            let picfilepath:string = rankdata.userData[i].picfilepath;
            let rang: Ranking = { username: username, points: points , picfilepath: picfilepath};
            Ranglist[i] = rang;
          }
        }
      });
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
    return (
      <div key={"rankPage"}>
        <NavMenu
          username={username}
          profilePicturePath={picFilePath}
          width={windowSize}
        />
        <div className="text-center mt-3">
          <div>
            <h1>Rang Lista:</h1>
            <div className="text-center overflow-auto zoom" style={{maxHeight:"55.7vh"}}>
            <Table striped bordered hover size="sm" variant={dark == "false" ? 'dark':''} className="mx-auto">
              <tbody>
              {Ranglist.map((Ranking, i) => (
                <tr key={i}>
                  <td className="px-2 align-middle"><img id="profpic" alt="Profpic" 
                  src={Ranking.picfilepath !== null ? Ranking.picfilepath : "npic.png"}
									width="40vh=" height="40vh="/></td>
                  <td className="px-2 align-middle">{Ranking.username}</td>
                  <td className="px-2 align-middle">{Ranking.points}p</td>
                </tr>
              ))}
              </tbody>
            </Table>
            </div>
          </div>
        </div>
      </div>
    );
};
export default RankPage;
