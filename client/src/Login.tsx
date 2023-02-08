//Imports
import React from "react";
import FormSubmitButton from "./components/FormSubmitButton";
import InputField from "./components/InputField";

//LoginForm component
class LoginForm extends React.Component<{}, any> {
	//TODO remove any
	constructor(props: any) {
		super(props);

		//Bind functions to this so they actually work
		this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
		this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
		this.loginHandler = this.loginHandler.bind(this);

		//Decalare state variables
		this.state = { username: "", password: "", usernameErr: false, passwordErr: false, usernameErrMsg: '', passwordErrMsg: '' };
	}

	//Lifted setState for the username field
	usernameChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ username: e.currentTarget.value });
	}

	//Lifted setState for the username field
	passwordChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ password: e.currentTarget.value });
	}

	//HTTP POST request to backend
	loginHandler() {
		if (
			//TODO Fine tune the condition
			this.state.username == null ||
			this.state.username == "" ||
			this.state.password == null ||
			this.state.password == ""
		) {
			this.setState({ usernameErr: true });
			this.setState({ passwordErr: true });
			this.setState({
				usernameErrMsg: "Invalid input",
				passwordErrMsg: "Invalid input",
			});
		}

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
					//TODO reroute to main page
					
				} else if (response.status == 401) {
					//TODO Make the input fields red
					this.setState({usernameErr: true, usernameErrMsg: 'Wrong username', passwordErr: true, passwordErrMsg: 'Wrong password'});
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

	render(): React.ReactNode {
		return (
			<div>
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
			</div>
		);
	}
}

export default LoginForm;
