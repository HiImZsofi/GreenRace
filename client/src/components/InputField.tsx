import React from "react";
import { InputType, UserLoginDto } from "../Interfaces";
import TextField from "@mui/material/TextField";
import { JsxElement } from "typescript";

function InputField(type: InputType) {
	if (type.type == "Username") {
		return (
			<div>
				<TextField type={"text"} placeholder={"Username"} required />
			</div>
		);
	} else if (type.type == "Password") {
		return (
			<div>
				<TextField type={"password"} placeholder={type.type} required />
			</div>
		);
	}
	return <TextField type={"text"} />;
}

export default InputField;
