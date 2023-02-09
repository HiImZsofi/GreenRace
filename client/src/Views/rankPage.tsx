import React from "react";
import "./Pages.css";
import NavMenu from "../components/navBar";

class RankPage extends React.Component<{}, any> {
	render(): React.ReactNode {
		return (
			<>
				<NavMenu></NavMenu>
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
			</>
		);
	}
}
export default RankPage;
