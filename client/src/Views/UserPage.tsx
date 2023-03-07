//Imports
import React, { useEffect, useState } from "react";
import "./Pages.css";
import "bootstrap/dist/css/bootstrap.css";
import NavMenu from "../components/NavBarLogic";
import { useNavigate } from "react-router-dom";
import GreenChart from "../components/Chart";


//UserPage main code
const UserPage = () => {
  const [username, setUsername] = useState("");
  const [picfilepath, setPicfilepath] = useState("");
  const [points, setPoints] = useState(0);
  const [chartData, setChartData] = useState([0]);
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
          setUsername(data.username);
          setPicfilepath(data.picfilepath);
          setPoints(data.points);
        }
      }
    );
  };

  useEffect(() => {
		authenticationHandler();
    if (dark == "false"){
      document.body.className = "body-dark body-zoom";
    } else {
      document.body.className = "body-light body-zoom";
    }
	});

  //Page Visual Part
  return (
    <div key={"userPage"}>
      <NavMenu username={username} profilePicturePath={picfilepath} />
      <div className="text-center overflow-auto" style={{maxHeight:"55.7vh"}}>
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
            width="100%"
            className="mb-3"
          />
        </div>
        <div className="Chart">
          <GreenChart chartData={chartData}/>
        </div>
      </div>
    </div>
  );
};
export default UserPage;
