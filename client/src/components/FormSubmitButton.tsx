import { Button } from "@mui/material";
import { InputTypeHandler } from "../Interfaces";

function FormSubmitButton(type: InputTypeHandler) {
	return (
		<div>
			<Button variant="contained" color="success">
				{type.inputType}
			</Button>
		</div>
	);
}

export default FormSubmitButton;
