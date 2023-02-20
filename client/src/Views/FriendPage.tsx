import React, {  } from 'react';
import './Pages.css';
import NavMenu from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.css';

class FriendPage extends React.Component<{}, any> {
    render(): React.ReactNode {
		return (
			<div key={"friendPage"}>
			<NavMenu username={this.state.username} picfilepath={this.state.picfilepath}/>
				<div className='text-center mt-3'>
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