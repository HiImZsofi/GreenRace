import { BlobOptions } from "buffer";

//Interface used to handle state in the RegisterForm component
export interface UserRegisterDto {
	username: string;
	password: string;
	email: string;
	usernameErr: boolean;
	passwordErr: boolean;
	emailErr: boolean;
	usernameErrMsg: string;
	passwordErrMsg: string;
	emailErrMsg: string;
	registerSuccess: boolean;
}

export interface UserLoginDto {
	email: string;
	password: string;
	emailErr: boolean;
	passwordErr: boolean;
	emailErrMsg: string;
	passwordErrMsg: string;
	loginSuccess: boolean;
}

export interface UserPageDto {
	username: string;
	picfilepath: string;
	points: number;
}

export interface UserSettingsDto {
	newUsername: string;
	newUsernameErr: boolean;
	newUsernameErrMsg: string;
	newPassword: string;
	newPasswordErr: boolean;
	newPasswordErrMsg: string;
	currentPassword: string;
	currentPasswordErr: string;
	currentPasswordErrMsg: string;
	theme: boolean;
}

//Helps handle props when generating input fields
export interface InputTypeHandler {
	inputType: string;
	placeholder?: string;
	value?: string;
	onChangeHandler?: (e: any) => void;
}

export interface NavMenuProps {
	username: string;
	profilePicturePath: string;
}

export interface NavMenuState {
	username: string;
	profilePicturePath: string;
	isLoggedIn: boolean;
}
