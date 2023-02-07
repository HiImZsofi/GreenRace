export interface UserLoginDto {
	username: string;
	password: string;
}

//Helps handle props when generating input fields
export interface InputTypeHandler {
	inputType: string;
	value?: string;
	onChangeHandler?: (e: any) => void;
}
