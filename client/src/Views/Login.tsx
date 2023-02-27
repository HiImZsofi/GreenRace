//Imports
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FormSubmitButton from "../components/FormSubmitButton";
import InputField from "../components/InputField";
import { UserLoginDto } from "../Interfaces";
import "../Views/Pages.css";
import FormWrapper from "../components/FormWrapper";
import FormRedirectLink from "../components/FormRedirectLink";

//LoginForm component
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState("");
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const navigate = useNavigate();

  const emailChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value.trim());
  };

  //Lifted setState for the username field
  const passwordChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value.trim());
  };

  //HTTP POST request to backend
  const loginHandler = () => {
    //Check if the input fields are empty or not
    if (
      email.trim() == null ||
      email.trim() == "" ||
      password.trim() == null ||
      password.trim() == ""
    ) {
      setEmailErr(true);
      setPasswordErr(true);
      setEmailErrMsg("Invalid input");
      setPasswordErrMsg("Invalid input");
    } else {
      //Send POST request to the server
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      fetch("http://localhost:3001/login", requestOptions)
        .then(async (response) => {
          const isJson = response.headers
            .get("content-type")
            ?.includes("application/json");
          const data = isJson && (await response.json());

          //Check for server response
          if (response.status == 200) {
            localStorage.setItem("email", email);
            setEmailErr(false);
            setEmailErrMsg("");
            setPasswordErr(false);
            setPasswordErrMsg("");
            navigate("/userPage", { replace: true });
          } else if (response.status == 404) {
            setEmailErr(true);
            setEmailErrMsg("Wrong email address");
            setPasswordErr(true);
            setPasswordErrMsg("Invalid password");
          } else if (response.status == 401) {
            setEmailErr(false);
            setEmailErrMsg("");
            setPasswordErr(true);
            setPasswordErrMsg("Invalid password");
          } else {
            // get error message from body or default to response status
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };
  return (
    <FormWrapper vhnum="100vh">
      <InputField
        type={{
          inputType: "Email",
          placeholder: "Email",
          value: email,
          onChangeHandler: emailChangeHandler,
        }}
        error={emailErr}
        errorMessage={emailErrMsg}
      />
      <InputField
        type={{
          inputType: "Password",
          placeholder: "Password",
          value: password,
          onChangeHandler: passwordChangeHandler,
        }}
        error={passwordErr}
        errorMessage={passwordErrMsg}
      />
      <FormSubmitButton
        type={{ inputType: "Login" }}
        onClickHandler={loginHandler}
      />
      <FormRedirectLink
        url="/register"
        classname="LRlink"
        text="Még nincs fiókom"
      />
    </FormWrapper>
  );
};

export default Login;
