import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormProps {
    name: string;
    password: string;
    email: string;
    value: string;
}


class RegistrationFormHandler extends React.Component{ //TODO avoid using any

    //initialize the local state of the component
    constructor(props: FormProps) {
        super(props);       //the props will not end up undefined
        this.state = {
            name: '',
            password: '',
            email: '',
        };
    }

    //create an event object and pass it over on user input
    // handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     this.setState({[event.target.name]: event.target.value});
    // }

    


    render() {
        return (
          <form action='http://localhost:3001/register' method='POST'>    
            <label>
                Name:
                <input type="text" defaultValue="" name="username" id='username' />  
            </label>
            <label>
                Password:   
                <input type="password" defaultValue="" name="password" id='password' />
            </label>
            <label>
                Email:
                <input type="email" defaultValue="" name="email" id='email' />
            </label>
            <button type="submit">Submit</button>
          </form>
        );
      }

}

export default RegistrationFormHandler;