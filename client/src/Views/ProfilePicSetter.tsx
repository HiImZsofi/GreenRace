//Imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import NavMenu from "../components/NavBarLogic";
import Profilepictures from "../components/ProfilePicList";


//ProfilePicSetter main code
const ProfilePicSetter = () => {
  const [PicpathErr, setPicpathErr] = useState(false);
  const [PicpathErrMsg, setPicpathErrMsg] = useState("‎");
  const [username, setUsername] = useState("");
  const [picFilePath, setPicFilePath] = useState("");
  const [index, setIndex] = useState(0);
  const [windowSize, setWindowSize] = useState(window.innerWidth);
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
    setPicpathErrMsg("‎");
    if(index < Profilepictures.length-1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    } 
  };

  const backHandler = () => {
    setPicpathErrMsg("‎");
    if(index > 0) {
      setIndex(index - 1);
    } else {
      setIndex(Profilepictures.length-1);
    } 
  };

  const saveHandler = () => {
    if(Profilepictures[index].unlock) {
    setPicpathErr(false);
    setPicpathErrMsg("‎");
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
    } else {
      setPicpathErr(true);
      setPicpathErrMsg("Nincs még feloldva");
    }
  };

  function handleResize() {
    setWindowSize(window.innerWidth);
  }

  useEffect(() => {
    authenticationHandler();
    document.body.className = "body-zoom";
    window.addEventListener('resize', handleResize)
  });

  //Page Visual Part
  return (
    <>
      <NavMenu username={username} profilePicturePath={picFilePath} width={windowSize}/>
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
        <h6 className={Profilepictures[index].unlock == false ? "Unlocknt":"Unlock"}>{Profilepictures[index].name} {Profilepictures[index].unlock == false ? "🔒":"🔓"}</h6>
        <h6 className="Errorlock">{PicpathErrMsg}</h6></div>
        
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