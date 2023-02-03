import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class RegistrationForm extends React.Component<any, any>{
    //initialize the local state of the component
    constructor(props: any){
        super(props);       //the props will not end up undefined
        this.state = { name: '' };
    }

    //create an event object and pass it over on user input
    handleChange = (event : any) => {
        this.setState({[event.target.name]: event.target.value});
    }

    //handle the change that happened previously
    handleSubmit = (event : any) => {
        fetch('http://localhost:3000/store-data', {   //hardcoded links <333
            method: 'POST',                           //httprequest method
            body: JSON.stringify(this.state)          //convert the react state into a json file
        }).then(function (response){
            console.log(response);
            return response.json;
        });
        event.preventDefault();      //if the event is cancelable nothing gonna happen
    }



    //create the form in another file
    //import it to app.tsx
}

export default RegistrationForm;