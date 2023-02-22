import React from "react";
import FormSubmitButton from "../components/FormSubmitButton";
import FormSwitch from "../components/FormSwitch";
import FormWrapper from "../components/FormWrapper";
import InputField from "../components/InputField";
import NavMenuLayout from "../components/NavBar";
import { UserSettingsDto } from "../Interfaces";
import NavMenu from "../components/NavBar";
import { Navigate } from "react-router-dom";


class UserSettings extends React.Component<{}, UserSettingsDto> {
	constructor(props: any) {
		super(props);

		this.newUsernameOnChangeHandler =
			this.newUsernameOnChangeHandler.bind(this);
		this.newPasswordOnChangeHandler =
			this.newPasswordOnChangeHandler.bind(this);
		this.currentPasswordOnChangeHandler =
			this.currentPasswordOnChangeHandler.bind(this);
		this.saveHandler = this.saveHandler.bind(this);
		this.logoutHandler = this.logoutHandler.bind(this);

		this.state = {
			newUsername: "",
			newUsernameErr: false,
			newUsernameErrMsg: "",
			newPassword: "",
			newPasswordErr: false,
			newPasswordErrMsg: "",
			currentPassword: "",
			currentPasswordErr: "",
			currentPasswordErrMsg: "",
			theme: false,
			username: "",
			picfilepath: "",
			points: 0,
			//This can be set to true because it should only be on pages when you are logged in
			isLoggedIn: true,
		};
	}

	newUsernameOnChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({
			newUsername: e.currentTarget.value,
		});
	}
	newPasswordOnChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({
			newPassword: e.currentTarget.value,
		});
	}
	currentPasswordOnChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({
			currentPassword: e.currentTarget.value,
		});
	}

	saveHandler() {
		//TODO add empty check for fields
		//TODO Fix input fields
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				newUsername: this.state.newUsername,
				newPassword: this.state.newPassword,
				currentPassword: this.state.currentPassword,
			}),
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
					this.setState({
						isLoggedIn: false,
					});
				}
			})

			.catch((error) => {
				console.error("There was an error!", error);
			});
	}
	loadInData(){
		fetch("http://localhost:3001/userPage")
		.then(async (response) => {
			const isJson = response.headers
				.get("content-type")
				?.includes("application/json");
			const data = isJson && (await response.json());
			console.log(data);
			this.setState({username: data.userdata.username});
			this.setState({picfilepath: data.userdata.picfilepath});
			this.setState({points: data.userdata.points});
		})
		.catch((error) => {
			console.error("There was an error!", error);
		});
	}
	componentDidMount(){
		this.loadInData()
	}
	render(): React.ReactNode {
		if (!this.state.isLoggedIn) {
			return <Navigate to="/login" replace={true} />;
		} else {
		return (
			//TODO Store dark theme option in a cookie
			<>
			<NavMenu username={this.state.username} picfilepath={this.state.picfilepath} logoutHandler={this.logoutHandler}/>
				<FormWrapper vhnum="89vh">
					<InputField
						type={{
							inputType: "Username",
							placeholder: "New username",
							value: this.state.newUsername,
							onChangeHandler: this.newUsernameOnChangeHandler,
						}}
						error={this.state.newUsernameErr}
						errorMessage={this.state.newUsernameErrMsg}
					/>
					<InputField
						type={{
							inputType: "Password",
							placeholder: "New password",
							value: this.state.newPassword,
							onChangeHandler: this.newPasswordOnChangeHandler,
						}}
						error={this.state.newPasswordErr}
						errorMessage={this.state.newPasswordErrMsg}
					/>
					<InputField
						type={{
							inputType: "Password",
							placeholder: "Current password",
							value: this.state.currentPassword,
							onChangeHandler: this.currentPasswordOnChangeHandler,
						}}
						error={this.state.newUsernameErr}
						errorMessage={this.state.newUsernameErrMsg}
					/>
					<FormSwitch label="Dark theme" />
					<FormSubmitButton
						type={{ inputType: "Save" }}
						onClickHandler={this.saveHandler}
					/>
				</FormWrapper>
			</>
		);
	}}
}

export default UserSettings;
