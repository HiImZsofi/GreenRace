import React from "react";
import FormSubmitButton from "./components/FormSubmitButton";
import InputField from "./components/InputField";

//HTTP GET request to backend
function loginHandler():void {
	let usernameFieldValue:string;
	let passwordFieldValue:string;
	alert('e4')
	
}

//LoginForm componenet
class LoginForm extends React.Component {
	render(): React.ReactNode {
		return (
			<React.StrictMode>
				<InputField inputType={"Username"} />
				<InputField inputType={"Password"} />
				<FormSubmitButton type={{inputType: 'Login'}} onClickHandler={loginHandler}/>
			</React.StrictMode>
		);
	}
}

export default LoginForm;
