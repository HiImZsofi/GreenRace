//Imports
import TextField from "@mui/material/TextField";
import React from "react";
import { InputTypeHandler } from "../Interfaces";

//InputField function component
function InputField(props: {
	type: InputTypeHandler;
	error: boolean;
	errorMessage: string;
}) {
	//If else that decides which type of field to return
	if (props.type.inputType == "Username") {
		return (
			<div>
				<TextField
					type={"text"}
					placeholder={props.type.placeholder}
					value={props.type.value}
					onChange={props.type.onChangeHandler}
					error={props.error}
					helperText={props.errorMessage}
					required
				/>
			</div>
		);
	} else if (props.type.inputType == "Password") {
		return (
			<div>
				<TextField
					type={"Password"}
					placeholder={props.type.placeholder}
					value={props.type.value}
					onChange={props.type.onChangeHandler}
					error={props.error}
					helperText={props.errorMessage}
					required
				/>
			</div>
		);
	} else if (props.type.inputType === "Email") {
		return (
			<div>
				<TextField
					type={"email"}
					placeholder={props.type.inputType}
					value={props.type.value}
					onChange={props.type.onChangeHandler}
					error={props.error}
					helperText={props.errorMessage}
					required
				/>
			</div>
		);
	} else {
		return (
			<div>
				<TextField
					type={"text"}
					placeholder={props.type.inputType}
					value={props.type.value}
					onChange={props.type.onChangeHandler}
					helperText={props.errorMessage}
					required
				/>
			</div>
		);
	}
}

export default InputField;