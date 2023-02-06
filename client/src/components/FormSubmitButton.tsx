import { Button } from "@mui/material";
import { InputTypeHandler } from "../Interfaces";

function FormSubmitButton(props: {
	type: InputTypeHandler;
	onClickHandler: () => void;
}) {
	return (
		<div>
			<Button
				variant="contained"
				color="success"
				onClick={props.onClickHandler}
			>
				{props.type.inputType}
			</Button>
		</div>
	);
}

export default FormSubmitButton;
