import React from "react";
import "./Pages.css";
import NavMenuLayout from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import { UserPageDto } from "../Interfaces";
import NavMenu from "../components/NavBarLogic";
import { Navigate } from "react-router-dom";
import { Console } from "console";

class UserPage extends React.Component<{}, UserPageDto> {
	constructor(props: any) {
		super(props);

		//Initalize state variables
		this.state = {
			username: "",
			picfilepath: "",
			points: 0,
			isLoggedIn: true,
		};
	}

	async authenticationHandler() {
		const token = localStorage.getItem("key");
		const requestOptions = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
			withCredentials: true,
		};
		fetch("http://localhost:3001/userPage", requestOptions).then(
			async (response) => {
				const isJson = response.headers
					.get("content-type")
					?.includes("application/json");
				const data = isJson && (await response.json());
				if (response.status !== 200) {
					this.setState({ isLoggedIn: false });
				}
			}
		);
	}

	componentDidMount(): void {
		this.authenticationHandler();
	}

	render(): React.ReactNode {
		if (this.state.isLoggedIn) {
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
		} else {
			return <Navigate to="/login" replace={true} />;
		}
	}
}
export default UserPage;
