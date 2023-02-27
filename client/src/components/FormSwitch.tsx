import { Form } from "react-bootstrap";

function FormSwitch(props: {
	label: string;
	value: boolean;
	onClickHandler: () => void;
}) {
	return (
		<Form.Check
			type="switch"
			id="custom-switch"
			label={props.label}
			checked={props.value}
			onChange={props.onClickHandler}
		/>
	);
}

export default FormSwitch;
