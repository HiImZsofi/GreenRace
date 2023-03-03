//Imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import NavMenu from "../components/NavBarLogic";

interface Profpics {
	path: string;
  name: string;
}
let Profilepictures: Profpics[] = [
  {path: "npic.png", name: "genderless"},
  {path: "profpic-male.jpg", name: "male"},
  {path: "profpic-female.jpg", name: "female"},
];

//ProfilePicSetter main code
const ProfilePicSetter = () => {
  const [PicpathErr, setPicpathErr] = useState(false);
  const [PicpathErrMsg, setPicpathErrMsg] = useState("");
  const [username, setUsername] = useState("");
  const [picFilePath, setPicFilePath] = useState("");
  const [index, setIndex] = useState(0);
  let dark = localStorage.getItem('darkmode');
  const navigate = useNavigate();

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
        }
      }
    );
  };

  const cancelHandler = () => {
    navigate("/userPage", { replace: true });
  };

  const nextHandler = () => {
    if(index < Profilepictures.length-1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    } 
  };

  const backHandler = () => {
    if(index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(Profilepictures.length-1);
    } 
  };

  const saveHandler = () => {
    setPicpathErr(false);
    setPicpathErrMsg("");
    const token = localStorage.getItem("key");
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        picfilepath: Profilepictures[index].path,
      }),
    };
    fetch("http://localhost:3001/profpicset", requestOptions)
    .then(async (response) =>{
      const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const data = isJson && (await response.json());

           //Check for server response
           if (response.status === 200) {
            setPicpathErr(false);
            setPicpathErrMsg("");
            navigate("/userPage", { replace: true });
          } else if (response.status === 500) {
            if (data.error === "Picfilepath") {
              setPicpathErr(true);
              setPicpathErrMsg(data.result);
            }
          }
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  };

  useEffect(() => {
    authenticationHandler();
    document.body.className = "body-zoom";
  });

  //Page Visual Part
  return (
    <>
      <NavMenu username={username} profilePicturePath={picFilePath} />
      <FormWrapper vhnum="55.6vh" background={dark == "false" ? "loginbackground-dark": "loginbackground-light"}>
        <div className="mb-4">
        <Button 
          variant="secondary"
          className="py-4"
          onClick={backHandler}
        >&#10094;</Button>
        <img
					id="profpic"
				  alt="Profpic"
				  src={Profilepictures[index].path}
				  width="120vh="
				  height="120vh="/>
        <Button
          variant="secondary"
          className="py-4"
          onClick={nextHandler}
        >&#10095;</Button>
        <h6>{Profilepictures[index].name}</h6></div>
        <div><Button
          variant="success"
          className="px-4 me-4"
          onClick={saveHandler}
        >Mentés</Button>
        <Button
          variant="outline-success"
          className="px-3"
          onClick={cancelHandler}
        >Vissza</Button></div>
      </FormWrapper>
    </>
  )
}
export default ProfilePicSetter;