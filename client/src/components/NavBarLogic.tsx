import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import NavMenuLayout from "./NavBar";
import { NavMenuProps, NavMenuState } from "../Interfaces";
const NavMenu = (props: {
  username: string;
	profilePicturePath: string;
  width: number;
  }) => {
  //This can be set to true because it should only be on pages when you are logged in
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
          localStorage.clear();
          setIsLoggedIn(false);
        }
      })

      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
    if (!isLoggedIn) {
      return <Navigate to="/login" replace={true} />;
    } else {
      return (
        <NavMenuLayout
          username={props.username}
          picfilepath={props.profilePicturePath}
          logoutHandler={logoutHandler}
          width={props.width}
        />
      );
    }
}

export default NavMenu;
