import React from "react";
import InputField from "./components/InputField";

class LoginForm extends React.Component {
	render(): React.ReactNode {
		return (
			<React.StrictMode>
				<InputField type={"Username"} />
				<InputField type={"Password"} />
			</React.StrictMode>
		);
	}
}

export default LoginForm;
