export interface UserLoginDto {
	username: string;
	password: string;
}

export interface InputTypeHandler {
	inputType: string;
	value?: string;
	onChangeHandler?: (e: any) => void;
}
