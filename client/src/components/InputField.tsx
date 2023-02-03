import React from "react";
import { InputTypeHandler, UserLoginDto } from "../Interfaces";
import TextField from "@mui/material/TextField";
import { JsxElement } from "typescript";

function InputField(type: InputTypeHandler) {
	if (type.inputType == "Username") {
		return (
			<div>
				<TextField type={"text"} placeholder={type.inputType} required />
			</div>
		);
	} else if (type.inputType == "Password") {
		return (
			<div>
				<TextField type={"password"} placeholder={type.inputType} required />
			</div>
		);
	}
	return <TextField type={"text"} />;
}

export default InputField;
