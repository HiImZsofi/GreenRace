import React from "react";
import FormSubmitButton from "./components/FormSubmitButton";
import InputField from "./components/InputField";

class LoginForm extends React.Component {
	render(): React.ReactNode {
		return (
			<React.StrictMode>
				<InputField inputType={"Username"} />
				<InputField inputType={"Password"} />
				<FormSubmitButton inputType={"Login"} />
			</React.StrictMode>
		);
	}
}

export default LoginForm;
