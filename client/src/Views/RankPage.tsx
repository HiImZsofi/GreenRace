import React from "react";
import "./Pages.css";
import NavMenuLayout from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import NavMenu from "../components/NavBarLogic";

class RankPage extends React.Component<{}, any> {
	render(): React.ReactNode {
		return (
			<div key={"rankPage"}>
				<NavMenu username="" profilePicturePath="" />
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
