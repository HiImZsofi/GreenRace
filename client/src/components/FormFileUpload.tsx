import { Form } from "react-bootstrap";

function FormFileInput(props: {
	path: string;
	onInputHandler: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}) {
	return (
		<div>
			<Form.Label>Profile picture upload</Form.Label>
			<Form.Control
				type="file"
				value={props.path}
				onInput={props.onInputHandler}
			/>
		</div>
	);
}

export default FormFileInput;
