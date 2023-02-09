import Box from "@mui/material/Box";
import React from "react";
import { UserRegisterDto } from "../Interfaces";
import FormSubmitButton from "../components/FormSubmitButton";
import InputField from "../components/InputField";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import "./RegisterForm.css";

class RegisterForm extends React.Component<{}, UserRegisterDto> {
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
				const data = isJson && (await response.json()); //if response headers include json then await response

				//Check for server response
				if (response.status == 200) {
					//TODO reroute to main page
				} else if (response.status == 401) {
					//
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

	render(): React.ReactNode {
		return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: "100vh" }}
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
								<FormSubmitButton
									type={{ inputType: "Register" }}
									onClickHandler={this.submitHandler}
								/>
							</div>
						</Card>
					</Box>
				</Grid>
			</Grid>
		);
	}
}

export default RegisterForm;
