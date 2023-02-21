import React, {  } from 'react';
import './Pages.css';
import NavMenu from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import { UserPageDto } from '../Interfaces';


class UserPage extends React.Component<{}, UserPageDto> {
	constructor(props: any) {
		super(props);

		//Initalize state variables
		this.state = {
			username: "",
			picfilepath: "",
			points: 0,
		};
	}
	dataLoadIn(){
		const requestUserData = {
			method:"GET",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: this.state.username,
				picfilepath: this.state.picfilepath,
				points: this.state.points,
			}),
		};
		fetch("http://localhost:3001/userpage", requestUserData)
		.then (async (response) => {
			const isJson = response.headers
			.get("content-type")
			?.includes("application/json");
			const data = isJson && (await response.json());
			console.log(data);
		})

	};
    render(): React.ReactNode {
		return (
			<div key={"userPage"}>
			<NavMenu username={this.state.username} picfilepath={this.state.picfilepath}/>
				<div className='text-center mt-3'>
					<div>
						<h1>{this.state.points} <span id='pont'>Zöldpont</span>-od van</h1>
						<p>Ez 1000 szenyezésnek felel meg</p>
					</div>
					<div>
						<h6>Elért eredmények:</h6>
						<img alt="Achivements" src="achivement_placeholder.jpg" height="300vh=" width="400vh=" className='mb-3'/>
					</div>
					<div>
						<h6>Statisztikáid:</h6>
						<img alt="Graph" src="graph-placeholder.jpg" className='mb-3'/>
					</div>
				</div>
			</div>
		);
    }
}
export default UserPage;

function dataLoadIn() {
	throw new Error('Function not implemented.');
}
