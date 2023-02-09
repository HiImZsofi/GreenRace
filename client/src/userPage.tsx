import React, {  } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Pages.css';
import NavMenu from './navBar';

class UserPage extends React.Component<{}, any> {
    render(): React.ReactNode {
		return (
			<>
			<NavMenu></NavMenu>
				<div className='text-center'>
					<div>
						<h1>10000 <span id='pont'>Zöldpont</span>-od van</h1>
						<p>Ez 1000 szenezésnek felel meg</p>
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
			</>
		);
    }
}
export default UserPage;