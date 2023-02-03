import { Button } from "@mui/material";
import { InputTypeHandler } from "../Interfaces";

function FormSubmitButton(type: InputTypeHandler, onClickHandler: () => void) {
	return (
		<div>
			<Button variant="contained" color="success" onClick={onClickHandler}>
				{type.inputType}
			</Button>
		</div>
	);
}

export default FormSubmitButton;
