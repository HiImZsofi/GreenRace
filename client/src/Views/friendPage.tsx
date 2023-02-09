import React, {  } from 'react';
import './Pages.css';
import NavMenu from '../navBar';

class FriendPage extends React.Component<{}, any> {
    render(): React.ReactNode {
		return (
			<>
			<NavMenu></NavMenu>
				<div className='text-center'>
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
			</>
		);
    }
}
export default FriendPage;