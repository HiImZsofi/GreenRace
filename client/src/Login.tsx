//Imports
import Box from "@mui/material/Box";
import React from "react";
import { Navigate } from "react-router-dom";
import FormSubmitButton from "./components/FormSubmitButton";
import InputField from "./components/InputField";

//LoginForm component
class LoginForm extends React.Component<{}, any> {
	//TODO change any to State Interface
	constructor(props: any) {
		super(props);

		//Bind functions to this so they actually work
		this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
		this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
		this.loginHandler = this.loginHandler.bind(this);

		//Decalare state variables
		this.state = {
			username: "",
			password: "",
			usernameErr: false,
			passwordErr: false,
			usernameErrMsg: "",
			passwordErrMsg: "",
			loginSuccess: false,
		};
	}

	//Lifted setState for the username field
	usernameChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ username: e.currentTarget.value.trim() });
	}

	//Lifted setState for the username field
	passwordChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ password: e.currentTarget.value.trim() });
	}

	//HTTP POST request to backend
	loginHandler() {
		if (
			this.state.username.trim() == null ||
			this.state.username.trim() == "" ||
			this.state.password.trim() == null ||
			this.state.password.trim() == ""
		) {
			this.setState({ usernameErr: true });
			this.setState({ passwordErr: true });
			this.setState({
				usernameErrMsg: "Invalid input",
				passwordErrMsg: "Invalid input",
			});
		} else {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username: this.state.username,
					password: this.state.password,
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
						this.setState({
							usernameErr: false,
							usernameErrMsg: "",
							passwordErr: false,
							passwordErrMsg: "",
							loginSuccess: true,
						});
					} else if (response.status == 404) {
						this.setState({
							usernameErr: true,
							usernameErrMsg: "Wrong username",
							passwordErr: true,
							passwordErrMsg: "Invalid password",
						});
					} else if (response.status == 401) {
						this.setState({
							usernameErr: false,
							usernameErrMsg: "",
							passwordErr: true,
							passwordErrMsg: "Invalid password",
						});
					} else {
						// get error message from body or default to response status
						const error = (data && data.message) || response.status;
						return Promise.reject(error);
					}

					this.setState({ postId: data.id });
				})
				.catch((error) => {
					this.setState({ errorMessage: error.toString() });
					console.error("There was an error!", error);
				});
		}
	}

	render(): React.ReactNode {
		if (this.state.loginSuccess) {
			return <Navigate to="/" replace={true} />;
		} else {
			return (
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "25ch" },
					}}
					textAlign={"center"}
					noValidate
					autoComplete="off"
				>
					<div>
						<InputField
							type={{
								inputType: "Username",
								value: this.state.username,
								onChangeHandler: this.usernameChangeHandler,
							}}
							error={this.state.usernameErr}
							errorMessage={this.state.usernameErrMsg}
						/>
					</div>
					<div>
						<InputField
							type={{
								inputType: "Password",
								value: this.state.password,
								onChangeHandler: this.passwordChangeHandler,
							}}
							error={this.state.passwordErr}
							errorMessage={this.state.passwordErrMsg}
						/>
					</div>
					<FormSubmitButton
						type={{ inputType: "Login" }}
						onClickHandler={this.loginHandler}
					/>
				</Box>
			);
		}
	}
}


export default LoginForm;
