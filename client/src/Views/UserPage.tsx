//Imports
import React, { useEffect, useRef, useState } from "react";
import "./Pages.css";
import "bootstrap/dist/css/bootstrap.css";
import NavMenu from "../components/NavBarLogic";
import { useNavigate } from "react-router-dom";
import GreenChart from "../components/Chart";
import { ProgressBar } from "react-bootstrap";

//Creating variables
interface Achivements {
  name: string;
  description: string;
  completed: boolean;
  progress: number;
}
var Achilist: Achivements[] = [];

//UserPage main code
const UserPage = () => {
  const [username, setUsername] = useState("");
  const [picfilepath, setPicfilepath] = useState("");
  const [points, setPoints] = useState(0);
  const [Achivementlist, setAchivementlist] = useState<Achivements[]>([]);
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
          setPicfilepath(data.userData.picfilepath);
          setPoints(data.userData.points);
        }
      }
    );
    fetch("http://localhost:3001/check/completion", requestOptions).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const achivementdata = isJson && (await response.json());
        for (let i = 0; i < achivementdata.achievements.length; i++) {
          if (achivementdata.achievements[i] !== undefined) {
            let name: string = achivementdata.achievements[i].name;
            let description: string = achivementdata.achievements[i].description;
            let completed: boolean = achivementdata.achievements[i].completed;
            let progress: number = achivementdata.achievements[i].progress;
            let achievement: Achivements = {name: name, description: description, completed: completed, progress: progress}
            Achilist[i] = achievement;
          }
        }
        setAchivementlist(Achilist);
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
	},[]);
  
  //Page Visual Part
  return (
    <div key={"userPage"}>
      <NavMenu username={username} profilePicturePath={picfilepath} width={windowSize}/>
      <div className="text-center overflow-auto" style={{maxHeight:"55.7vh"}}>
        <div>
          <h1>
            {points} <span id={dark == "false" ? "pont-dark": "pont-light"}>Zöldpont</span>-od van
          </h1>
          <p>Ez {points*10}g szennyezésnek felel meg</p>
        </div>
        <div>
          <h3>Elért eredmények:</h3>
          <table className="mx-auto">
            <tbody>
            {Achivementlist.map((Achivement, i) => (
              i % 4 === 0 ? (
                <tr key={i}>
                {[0, 1, 2, 3].map((j) => (
                  Achivementlist[i+j] ? (
                    <td key={i+j} className="px-2">
                      <h6>{Achivementlist[i+j].name}</h6>
                      <p className="description">{Achivementlist[i+j].description}</p>
                       <ProgressBar variant="success" now={Achivementlist[i+j].progress} />
                    </td>
                  ) : null
                ))}
                </tr>
              )  : null
            ))}
            </tbody> 
          </table>
        </div>
        <div className="Chart">
          <GreenChart/>
        </div>
      </div>
    </div>
  );
};
export default UserPage;
