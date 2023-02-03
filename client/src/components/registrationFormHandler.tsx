import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface FormProps {
    name: string;
    password: string;
    email: string;
    value: string;
}


class RegistrationFormHandler extends React.Component<{}, any>{ //TODO avoid using any

    //initialize the local state of the component
    constructor(props: FormProps) {
        super(props);       //the props will not end up undefined
        this.state = {
            name: '',
            password: '',
            email: '',
            value: ''
        };
    }

    //create an event object and pass it over on user input
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({[event.target.name]: event.target.value});
    }

    //handle the change that happened previously
    handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        fetch('http://localhost:3000/store-data', {   //hardcoded links <333
            method: 'POST',                           //httprequest method
            body: JSON.stringify(this.state)          //convert the react state into a json file
        }).then(function (response){
            console.log(response);
            return response.json;
        });
        event.preventDefault();      //if the event is cancelable nothing gonna happen
    }


    render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
                Name:
                <input type="text" value={this.state.value} name="name" onChange={this.handleChange} />
            </label>
            <label>
                Password:
                <input type="text" value={this.state.value} name="password" onChange={this.handleChange} />
            </label>
            <label>
                Email:
                <input type="text" value={this.state.value} name="email" onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        );
      }

    //import it to app.tsx
}

export default RegistrationFormHandler;