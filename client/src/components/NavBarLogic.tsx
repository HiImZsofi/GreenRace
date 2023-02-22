import React from "react";
import { Navigate } from "react-router-dom";
import NavMenuLayout from "./NavBar";
import { NavMenuProps, NavMenuState } from "../Interfaces";
class NavMenu extends React.Component<NavMenuProps, NavMenuState> {
  constructor(props: NavMenuProps) {
    super(props);
    this.logoutHandler = this.logoutHandler.bind(this);

    this.state = {
      username: props.username,
      profilePicturePath: props.profilePicturePath,
      //This can be set to true because it should only be on pages when you are logged in
      isLoggedIn: true,
    };
  }

  logoutHandler() {
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
          this.setState({
            isLoggedIn: false,
          });
        }
      })

      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  render(): React.ReactNode {
    if (!this.state.isLoggedIn) {
      return <Navigate to="/login" replace={true} />;
    } else {
      return (
        <NavMenuLayout
          username={this.state.username}
          picfilepath={this.state.profilePicturePath}
          logoutHandler={this.logoutHandler}
        />
      );
    }
  }
}

export default NavMenu;
