import { Button } from "@mui/material";
import { InputTypeHandler } from "../Interfaces";

function FormSubmitButton(type: InputTypeHandler) {
	return (
		<div>
			<Button variant="outlined">{type.inputType}</Button>
		</div>
	);
}

export default FormSubmitButton;
