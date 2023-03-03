//Imports
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import NavMenu from "../components/NavBarLogic";

//ProfilePicSetter main code
const ProfilePicSetter = () => {
  const [username, setUsername] = useState("");
  const [picFilePath, setPicFilePath] = useState("");
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

  useEffect(() => {
    authenticationHandler();
  });

  //Page Visual Part
  return (
    <>
      <NavMenu username={username} profilePicturePath={picFilePath} />
      <FormWrapper vhnum="89vh" background={dark == "false" ? "loginbackground-dark": "loginbackground-light"}>
        <div className="mb-4"><Button
          variant="secondary"
          className="py-4"
          //onClick={saveHandler}
        >&#10094;</Button>
        <img
					id="profpic"
				  alt="Profpic"
				  src={picFilePath !== null ? picFilePath : "npic.png"}
				  width="120vh="
				  height="120vh="/>
        <Button
          variant="secondary"
          className="py-4"
          //onClick={cancelHandler}
        >&#10095;</Button>
        <h6>Profpic_name</h6></div>
        <div><Button
          variant="success"
          className="px-4 me-4"
          //onClick={saveHandler}
        >Mentés</Button>
        <Button
          variant="outline-success"
          className="px-3"
          //onClick={cancelHandler}
        >Vissza</Button></div>
      </FormWrapper>
    </>
  )
}
export default ProfilePicSetter;