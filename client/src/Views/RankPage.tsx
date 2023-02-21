import React from "react";
import "./Pages.css";
import NavMenu from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';
import { UserPageDto } from "../Interfaces";

class RankPage extends React.Component<{}, UserPageDto> {
	constructor(props: any) {
		super(props);

		//Initalize state variables
		this.state = {
			username: "",
			picfilepath: "",
			points: 0,
		};
	}
	render(): React.ReactNode {
		return (
			<div key={"rankPage"}>
				<NavMenu username={this.state.username} picfilepath={this.state.picfilepath}/>
				<div className="text-center mt-3">
					<div>
						<h1>Rang Lista:</h1>
						<ul>
							<li>USername: 1000pont</li>
							<li>USername: 1000pont</li>
							<li>USername: 1000pont</li>
							<li>USername: 1000pont</li>
							<li>USername: 1000pont</li>
							<li>USername: 1000pont</li>
							<li>USername: 1000pont</li>
							<li>USername: 1000pont</li>
							<li>USername: 1000pont</li>
							<li>USername: 1000pont</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
export default RankPage;
