import Box from "@mui/material/Box";
import React from "react";
import { UserRegisterDto } from "../Interfaces";
import FormSubmitButton from "../components/FormSubmitButton";
import InputField from "../components/InputField";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { response } from "express";
import FormWrapper from "../components/FormWrapper";
import FormRedirectLink from "../components/FormRedirectLink";

class Register extends React.Component<{}, UserRegisterDto> {
	constructor(props: any) {
		super(props);
		this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
		this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
		this.emailChangeHandler = this.emailChangeHandler.bind(this);
		this.submitHandler = this.submitHandler.bind(this);

		this.state = {
			username: "",
			password: "",
			email: "",
			usernameErr: false,
			passwordErr: false,
			emailErr: false,
			usernameErrMsg: "",
			passwordErrMsg: "",
			emailErrMsg: "",
			registerSuccess: false,
		};
	}

	usernameChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ username: e.currentTarget.value });
	}

	passwordChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ password: e.currentTarget.value });
	}

	emailChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ email: e.currentTarget.value });
	}

	submitHandler() {
		if (
			this.state.username.trim() == null ||
			this.state.username.trim() == "" ||
			this.state.email.trim() == null ||
			this.state.email.trim() == "" ||
			this.state.password.trim() == null ||
			this.state.password.trim() == ""
		) {
			this.setState({ emailErr: true });
			this.setState({ passwordErr: true });
			this.setState({
				emailErrMsg: "Invalid input",
				passwordErrMsg: "Invalid input",
			});
		} else {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
					email: this.state.email,
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
						//TODO reroute to main page
						this.setState({ registerSuccess: true });
					} else if (response.status == 500) {
						this.setState({
							emailErr: true,
							emailErrMsg: "Email already in use",
						});
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
	}

	render(): React.ReactNode {
		if (this.state.registerSuccess) {
			return <Navigate to="/login" replace={true} />;
		} else {
			return (
				<FormWrapper vhnum="100vh">
					<InputField
						type={{
							inputType: "Username",
							placeholder: "Username",
							value: this.state.username,
							onChangeHandler: this.usernameChangeHandler,
						}}
						error={this.state.usernameErr}
						errorMessage={this.state.usernameErrMsg}
					/>
					<InputField
						type={{
							inputType: "Password",
							placeholder: "Password",
							value: this.state.password,
							onChangeHandler: this.passwordChangeHandler,
						}}
						error={this.state.passwordErr}
						errorMessage={this.state.passwordErrMsg}
					/>
					<InputField
						type={{
							inputType: "Email",
							placeholder: "Email",
							value: this.state.email,
							onChangeHandler: this.emailChangeHandler,
						}}
						error={this.state.emailErr}
						errorMessage={this.state.emailErrMsg}
					/>
					<FormSubmitButton
						type={{ inputType: "Register" }}
						onClickHandler={this.submitHandler}
					/>
					<FormRedirectLink
						url="/login"
						classname="LRlink"
						text="Már van fiókom"
					/>
				</FormWrapper>
			);
		}
	}
}

export default Register;
