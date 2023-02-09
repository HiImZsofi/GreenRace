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
}

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
