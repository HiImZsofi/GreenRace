//Imports
import React, { useEffect, useState } from "react";
import FormSubmitButton from "../components/FormSubmitButton";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import FormRedirectLink from "../components/FormRedirectLink";

//RegisterForm component
const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [usernameErr, setUsernameErr] = useState(false);
	const [passwordErr, setPasswordErr] = useState(false);
	const [emailErr, setEmailErr] = useState(false);
	const [usernameErrMsg, setUsernameErrMsg] = useState("");
	const [passwordErrMsg, setPasswordErrMsg] = useState("");
	const [emailErrMsg, setEmailErrMsg] = useState("");
	const navigate = useNavigate();

	const usernameChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
		setUsername(e.currentTarget.value);
	};

	const passwordChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
		setPassword(e.currentTarget.value);
	};

	const emailChangeHandler = (e: React.SyntheticEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value);
	};

	//HTTP POST request to backend
	const submitHandler = () => {
		//Check if the input fields are empty or not
		if (
			username.trim() == null ||
			username.trim() == "" ||
			email.trim() == null ||
			email.trim() == "" ||
			password.trim() == null ||
			password.trim() == ""
		) {
			setEmailErr(true);
			setUsernameErr(true);
			setPasswordErr(true);
			setEmailErrMsg("Mező nem lehet Üres!");
			setUsernameErrMsg("Mező nem lehet Üres!");
			setPasswordErrMsg("Mező nem lehet Üres!");
		} else {
			const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (emailRegex.test(email)){
				setUsernameErr(false);
				setPasswordErr(false);
				setUsernameErrMsg("");
				setPasswordErrMsg("");
			//Send POST request to the server
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: username,
					password: password,
					email: email,
				}),
			};
			fetch("http://localhost:3001/register", requestOptions)
				.then(async (response) => {
					const isJson = response.headers
						.get("content-type")
						?.includes("application/json");
					const data = isJson && (await response.json()); //if response headers include json then await
					//Check for server response
					if (response.status == 200) {
						navigate("/login", { replace: true });
					} else if (response.status == 500) {
						setEmailErr(true);
						setEmailErrMsg("Foglalt email!");
					} else {
						// get error message from body or default to response status
						const error = (data && data.message) || response.status;
						return Promise.reject(error);
					}
				})
				.catch((error) => {
					console.error("There was an error!", error);
				});
			} else {
				setUsernameErr(false);
				setPasswordErr(false);
				setUsernameErrMsg("");
				setPasswordErrMsg("");
				setEmailErr(true);
				setEmailErrMsg("Nem megfelelő email");
			}
		}
	};
	useEffect(() => {
		document.body.className = "body-zoom";
	  });
	//Page Visual Part
	return (
		<FormWrapper vhnum="66.6vh" background="formbackground-image">
			<InputField
				type={{
					inputType: "Username",
					placeholder: "Felhasználónév",
					value: username,
					onChangeHandler: usernameChangeHandler,
				}}
				error={usernameErr}
				errorMessage={usernameErrMsg}
			/>
			<InputField
				type={{
					inputType: "Password",
					placeholder: "Jelszó",
					value: password,
					onChangeHandler: passwordChangeHandler,
				}}
				error={passwordErr}
				errorMessage={passwordErrMsg}
			/>
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
			<FormSubmitButton
				type={{ inputType: "Regisztráció" }}
				onClickHandler={submitHandler}
			/>
			<FormRedirectLink url="/login" classname="LRlink" text="Már van fiókom" />
		</FormWrapper>
	);
};

export default Register;
