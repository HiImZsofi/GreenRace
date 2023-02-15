//Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { Navigate } from "react-router-dom";
import FormSubmitButton from "../components/FormSubmitButton";
import InputField from "../components/InputField";
import { UserLoginDto } from "../Interfaces";
import '../Views/Pages.css';
import { Navbar, Container, Nav, Offcanvas} from 'react-bootstrap';
import Card from "@mui/material/Card";

//LoginForm component
class LoginForm extends React.Component<{}, UserLoginDto> {
	constructor(props: any) {
		super(props);

		//Bind functions to this so they actually work
		this.emailChangeHandler = this.emailChangeHandler.bind(this);
		this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
		this.loginHandler = this.loginHandler.bind(this);

		//Decalare state variables
		this.state = {
			email: "",
			password: "",
			emailErr: false,
			passwordErr: false,
			emailErrMsg: "",
			passwordErrMsg: "",
			loginSuccess: false,
		};
	}

	//Lifted setState for the username field
	emailChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ email: e.currentTarget.value.trim() });
	}

	//Lifted setState for the username field
	passwordChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ password: e.currentTarget.value.trim() });
	}

	//HTTP POST request to backend
	loginHandler() {
		//Check if the input fields are empty or not
		if (
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
			//Send POST request to the server
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: this.state.email,
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
							emailErr: false,
							emailErrMsg: "",
							passwordErr: false,
							passwordErrMsg: "",
							loginSuccess: true,
						});
					} else if (response.status == 404) {
						this.setState({
							emailErr: true,
							emailErrMsg: "Wrong email address",
							passwordErr: true,
							passwordErrMsg: "Invalid password",
						});
					} else if (response.status == 401) {
						this.setState({
							emailErr: false,
							emailErrMsg: "",
							passwordErr: true,
							passwordErrMsg: "Invalid password",
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
		//Redirect to the home page
		if (this.state.loginSuccess) {
			return <Navigate to="/userPage" replace={true} />;
		} else {
			return (
				<>
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: "100vh" }}
					className="loginbackground"
				>
					<Grid item xs={3}>
						<Box
							component="form"
							sx={{
								"& .MuiTextField-root": { m: 1, width: "25ch" },
							}}
							textAlign={"center"}
							noValidate
							autoComplete="off"
						>
							<Card
								variant="outlined"
								sx={{
									padding: 2,
									backgroundColor: "rgba(255, 255, 255, 0.85);",
									boxShadow: 5,
								}}
							>
							<div>
								<InputField
									type={{
										inputType: "Email",
										value: this.state.email,
										onChangeHandler: this.emailChangeHandler,
									}}
									error={this.state.emailErr}
									errorMessage={this.state.emailErrMsg}
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
							<a href="./register" className="LRlink">Nincs még fiókom</a>	
							</Card>
						</Box>		
					</Grid>
				</Grid>
				</>
			);
		}
	}
}

export default LoginForm;
