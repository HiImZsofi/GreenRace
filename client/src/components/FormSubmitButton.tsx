import { Button } from "@mui/material";
import React from "react";
import { InputTypeHandler } from "../Interfaces";

function FormSubmitButton(props: {
	type: InputTypeHandler;
	onClickHandler: () => void;
}) {
	return (
		<div className="mt-2">
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
