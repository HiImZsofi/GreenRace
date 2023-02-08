import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export class RegistrationFormHandler extends React.Component<{}, any>{ 

    //initialize the local state of the component
    constructor(props: any) {

        super(props);

        //bind the states so they are usable
        this.handleChange = this.handleChange.bind(this);
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
		this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);

        //basic creditentals
        this.state = {
            username: '',
            password: '',
            email: '',
        };
    }


    //set state if input is changing
    usernameChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ username: e.currentTarget.value });
	}

    passwordChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
		this.setState({ password: e.currentTarget.value });
	}

    emailChangeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
        this.setState({ email: e.currentTarget.value });
    }


    //set values on change
    handleChange = ({ target } : {target: any}) => {
        this.setState({ [target.name]: target.value });
     };


     //if the event does not get explicitly handled its default action should not be taken as it normally would be
     handleSubmit = (event: any) => {
        event.preventDefault();
      };
    
    
    //http request information
    submitHandler() {
        const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }),
    };
    fetch("http://localhost:3000/register", requestOptions)
			.then(async (response) => {    
				const isJson = response.headers
					.get("content-type")
					?.includes("application/json");
				const data = isJson && (await response.json());  //if response headers include json then await response

				//Check for server response
				if (response.status == 200) {
					//TODO reroute to main page
				} else if (response.status == 401) {
					//
				} else {
					// get error message from body or default to response status
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}

			})
			.catch((error) => {
				this.setState({ errorMessage: error.toString() });
				console.error("There was an error!", error);
			});
    }
    
    

    render() {
        return (
          <form action='http://localhost:3001/register' method='POST'>    
            <label>
                Name:
                <input type="text" name="username" id='username' value={this.state.username} onChange={this.usernameChangeHandler} />  
            </label>
            <label>
                Password:   
                <input type="password" name="password" id='password' value={this.state.password} onChange={this.passwordChangeHandler} />
            </label>
            <label>
                Email:
                <input type="email" name="email" id='email' value={this.state.email} onChange={this.emailChangeHandler}/>
            </label>
            <button type="submit" onClick={this.submitHandler} >Submit</button>
          </form>
        );
      }

}

export default RegistrationFormHandler;