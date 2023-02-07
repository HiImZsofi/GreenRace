import React from "react";
import FormSubmitButton from "./components/FormSubmitButton";
import InputField from "./components/InputField";

//LoginForm componenet
class LoginForm extends React.Component<{}, any> {
	constructor(props: any) {
		super(props);
		this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
		this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
		this.loginHandler = this.loginHandler.bind(this);
		this.state = { username: "", password: "" };
	}

	//Lifted states
	//TODO Export components to files
	//const {value} = this.state
	//const {setValue}=(value:number)=>{
	//this.setState(value)
	//}

	usernameChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ username: e.currentTarget.value });
	}

	passwordChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ password: e.currentTarget.value });
	}

	//HTTP POST request to backend
	loginHandler() {
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
				<div>
					<InputField
						type={{
							inputType: "Username",
							value: this.state.username,
							onChangeHandler: this.usernameChangeHandler,
						}}
					/>
				</div>
				<div>
					<InputField
						type={{
							inputType: "Password",
							value: this.state.password,
							onChangeHandler: this.passwordChangeHandler,
						}}
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
