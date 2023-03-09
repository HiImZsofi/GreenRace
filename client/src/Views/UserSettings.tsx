//Imports
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CheckboxDark from "../components/Checkbox";
import FormWrapper from "../components/FormWrapper";
import InputField from "../components/InputField";
import NavMenu from "../components/NavBarLogic";

//SettingsPage main code
const UserSettings = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newUsernameErr, setNewUsernameErr] = useState(false);
  const [newUsernameErrMsg, setNewUsernameErrMsg] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState(false);
  const [newPasswordErrMsg, setNewPasswordErrMsg] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordErr, setCurrentPasswordErr] = useState(false);
  const [currentPasswordErrMsg, setCurrentPasswordErrMsg] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);
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
          setUsername(data.username);
          setPicFilePath(data.picfilepath);
        }
      }
    );
  };

  const newUsernameOnChangeHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setNewUsername(e.currentTarget.value);
  };
  const newPasswordOnChangeHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setNewPassword(e.currentTarget.value);
  };
  const currentPasswordOnChangeHandler = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    setCurrentPassword(e.currentTarget.value);
  };

  const onSwitchClick = () => {
    setDarkTheme(!darkTheme);
    let dark = JSON.stringify({darkTheme}.darkTheme);
    localStorage.setItem('darkmode',dark);
  };

  const cancelHandler = () => {
    navigate("/userPage", { replace: true });
  };

  const saveHandler = () => {
    if ((currentPassword !== "" && newUsername !== "") || newPassword !== "") {
      setNewUsernameErr(false);
      setNewUsernameErrMsg("");
      setNewPasswordErr(false);
      setNewPasswordErrMsg("");
      setCurrentPasswordErr(false);
      setCurrentPasswordErrMsg("");
      const token = localStorage.getItem("key");
			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify({
					newUsername: newUsername,
					newPassword: newPassword,
					currentPassword: currentPassword,
				}),
			};
      fetch("http://localhost:3001/settings", requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const data = isJson && (await response.json());

          //Check for server response
          if (response.status === 200) {
            setNewUsernameErr(false);
            setNewUsernameErrMsg("");
            setNewPasswordErr(false);
            setNewPasswordErrMsg("");
            setCurrentPasswordErr(false);
            setCurrentPasswordErrMsg("");
            navigate("/userPage", { replace: true });
          } else if (response.status === 500) {
            if (data.error === "Password") {
              setCurrentPasswordErr(true);
              setCurrentPasswordErrMsg(data.result);
            }
            if (data.error === "NewPassword") {
              setNewPasswordErr(true);
              setNewPasswordErrMsg(data.result);
            }
            if (data.error === "Username") {
              setNewUsernameErr(true);
              setNewUsernameErrMsg(data.result);
            }
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    } else {
      setCurrentPasswordErr(true);
      setCurrentPasswordErrMsg("This field is required to be filled in");
      if (newUsername === "") {
        setNewUsernameErr(true);
        setNewUsernameErrMsg("This field is required to be filled in");
      }
      if (newPassword === "") {
        setNewPasswordErr(true);
        setNewPasswordErrMsg("This field is required to be filled in");
      }
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
        <InputField
          type={{
            inputType: "Username",
            placeholder: "Új felhasználónév",
            value: newUsername,
            onChangeHandler: newUsernameOnChangeHandler,
          }}
          error={newUsernameErr}
          errorMessage={newUsernameErrMsg}
        />
        <InputField
          type={{
            inputType: "Password",
            placeholder: "Új jelszó",
            value: newPassword,
            onChangeHandler: newPasswordOnChangeHandler,
          }}
          error={newPasswordErr}
          errorMessage={newPasswordErrMsg}
        />
        <InputField
          type={{
            inputType: "Password",
            placeholder: "Jelenlegi jelszó:",
            value: currentPassword,
            onChangeHandler: currentPasswordOnChangeHandler,
          }}
          error={currentPasswordErr}
          errorMessage={currentPasswordErrMsg}
        /> 
        <CheckboxDark onSwitchHandler={onSwitchClick}/>
        <Button
          variant="success"
          className="px-4 me-4"
          onClick={saveHandler}
        >Mentés</Button>
        <Button
          variant="outline-success"
          className="px-3"
          onClick={cancelHandler}
        >Vissza</Button>
      </FormWrapper>
    </>
  );
};

export default UserSettings;
function setPoints(points: any) {
  throw new Error("Function not implemented.");
}

