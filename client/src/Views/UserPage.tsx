import React, {  } from 'react';
import './Pages.css';
import NavMenuLayout from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import { UserPageDto } from "../Interfaces";
import NavMenu from "../components/NavBarLogic";

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
	render(): React.ReactNode {
		return (
			<div key={"userPage"}>
				<NavMenu username="" profilePicturePath="" />
				<div className="text-center mt-3">
					<div>
						<h1>
							10000 <span id="pont">Zöldpont</span>-od van
						</h1>
						<p>Ez 1000 szenyezésnek felel meg</p>
					</div>
					<div>
						<h6>Elért eredmények:</h6>
						<img
							alt="Achivements"
							src="achivement_placeholder.jpg"
							height="300vh="
							width="400vh="
							className="mb-3"
						/>
					</div>
					<div>
						<h6>Statisztikáid:</h6>
						<img alt="Graph" src="graph-placeholder.jpg" className="mb-3" />
					</div>
				</div>
			</div>
		);
	}
}
export default UserPage;