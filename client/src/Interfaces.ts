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

//TODO Implement this interface in the Login component
export interface UserLoginDto {
	username: string;
	password: string;
	usernameErr: boolean;
	passwordErr: boolean;
	usernameErrMsg: string;
	passwordErrMsg: string;
}

//Helps handle props when generating input fields
export interface InputTypeHandler {
	inputType: string;
	value?: string;
	onChangeHandler?: (e: any) => void;
}
