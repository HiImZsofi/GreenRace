//Imports
import React, { useEffect, useState } from "react";
import "./Pages.css";
import NavMenu from "../components/NavBarLogic";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { Console } from "console";

//Creating variables
interface Routes {
  line: string;
  date: Date;
  emission: number;
}
var Routelist: Routes[] = [];

//RoutesPage main code
const RoutesPage = () => {
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
    fetch("http://localhost:3001/routePage", requestOptions).then(
      async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const routedata = isJson && (await response.json());
        for (let i = 0; i < routedata.userData.length; i++) {
          if (routedata.userData[i] !== undefined){
            let line: string = routedata.userData[i].line;
            let date: Date = routedata.userData[i].date;
            let emission: number = routedata.userData[i]["emission"];
            let route: Routes = { line: line, date: date, emission: emission};
            Routelist[i] = route;
          }
        }
        Routelist= Routelist.sort((a, b) => b.emission - a.emission);
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
  return (
    <div key={"routesPage"}>
      <NavMenu username={username} profilePicturePath={picFilePath} width={windowSize}/>
      <div className="text-center mt-3">
        <div>
          <h1>Utazások:</h1>
          <div className="text-center overflow-auto zoom" style={{maxHeight:"55.7vh"}}>
            <table className="mx-auto">
              <tbody>
                {Routelist.map((Route, i) => (
                  <tr key={i}>
                    <td className="px-2">{new Date(Route.date).toISOString().slice(0, 10)}</td>
                    <td className="px-2">{Route.line}</td>
                    <td className="px-2">{Route.emission}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  );
};
export default RoutesPage;
