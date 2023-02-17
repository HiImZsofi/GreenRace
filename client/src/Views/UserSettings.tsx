import React from "react";
import { Navbar } from "react-bootstrap";
import FormSubmitButton from "../components/FormSubmitButton";
import FormSwitch from "../components/FormSwitch";
import FormWrapper from "../components/FormWrapper";
import InputField from "../components/InputField";
import NavMenu from "../components/NavBar";
import { UserSettingsDto } from "../Interfaces";

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
	render(): React.ReactNode {
		return (
			<>
				<NavMenu />
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
	}
}

export default UserSettings;
