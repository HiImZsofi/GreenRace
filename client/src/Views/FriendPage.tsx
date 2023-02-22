import React, {  } from 'react';
import './Pages.css';
import NavMenu from "../components/NavBarLogic";
import 'bootstrap/dist/css/bootstrap.css';
import { UserPageDto } from '../Interfaces';

class FriendPage extends React.Component<{}, UserPageDto> {
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
			<div key={"friendPage"}>
				<NavMenu username="" profilePicturePath='' />
				<div className="text-center mt-3">
					<div>
						<h1>Barátok:</h1>
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
export default FriendPage;