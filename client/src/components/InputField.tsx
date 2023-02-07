import TextField from "@mui/material/TextField";
import { InputTypeHandler } from "../Interfaces";

function InputField(props: { type: InputTypeHandler }) {
	if (props.type.inputType == "Username") {
		return (
			<div>
				<TextField
					type={"text"}
					placeholder={props.type.inputType}
					value={props.type.value}
					onChange={props.type.onChangeHandler}
					required
				/>
			</div>
		);
	} else {
		return (
			<div>
				<TextField
					type={"Password"}
					placeholder={props.type.inputType}
					value={props.type.value}
					onChange={props.type.onChangeHandler}
					required
				/>
			</div>
		);
	}
}

export default InputField;
