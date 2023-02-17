import React from "react";
import "./Pages.css";
import NavMenu from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';

class RankPage extends React.Component<{}, any> {
	render(): React.ReactNode {
		return (
			<div key={"rankPage"}>
				<NavMenu/>
				<div className="text-center">
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
