import React, { useEffect, useState } from 'react';
import './userPage.css';

class UserPage extends React.Component<{}, any> {

    render(): React.ReactNode {
		return (
			<div>
				<div>
					<div id="menu">
						<img id="logo" src = {"greenRaceLogo.png"} />
  						<a href="#points">Pontjaim</a>
  						<a href="#ranks">Rangsor</a>
  						<a href="#friends">Barátok</a>
						<img id="profpic" src = {"npic.png"}/>
					</div>
					
				</div>
			</div>
		);
    }
}
export default UserPage;