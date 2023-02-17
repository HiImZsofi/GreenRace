import { Form } from "react-bootstrap";

function FormSwitch(props: { label: string }) {
	return <Form.Check type="switch" id="custom-switch" label={props.label} />;
}

export default FormSwitch;
