import React, { useEffect } from "react";
import FormSubmitButton from "./components/FormSubmitButton";
import TextField from "@mui/material/TextField";

//LoginForm componenet
class LoginForm extends React.Component<{}, any> {
	constructor(props: any) {
		super(props);
		this.loginHandler = this.loginHandler.bind(this);
		this.state = { username: "", password: "", postId: Number };
	}

	//HTTP POST request to backend
	loginHandler() {
		//TODO POST Request to backend
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

				// check for error response
				if (!response.ok) {
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

	render(): React.ReactNode {
		return (
			<div>
				<form action="" method="post">
					<div>
						<TextField
							type={"text"}
							placeholder={"Username"}
							value={this.state.username}
							onChange={(e) => this.setState({ username: e.target.value })}
							required
						/>
					</div>
					<div>
						<TextField
							type={"password"}
							placeholder={"Password"}
							value={this.state.password}
							onChange={(e) => this.setState({ password: e.target.value })}
							required
						/>
					</div>
					<FormSubmitButton
						type={{ inputType: "Login" }}
						onClickHandler={this.loginHandler}
					/>
				</form>
			</div>
		);
	}
}

export default LoginForm;
