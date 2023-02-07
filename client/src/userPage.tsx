import React, { useEffect, useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';
import './userPage.css';

class UserPage extends React.Component<{}, any> {

    render(): React.ReactNode {
		return (
			<>
				<Navbar className='color-nav' bg='dark' variant='dark'>
					<Container>
						<Navbar.Brand>
							<img src="/greenRaceLogo.png" width="30" height="30" className="d-inline-block align-top" alt="Green Race Logo"/>
						</Navbar.Brand>
						<Nav className="me-auto">
        					<Nav.Link href="">Pontjaim</Nav.Link>
           	 				<Nav.Link href="">Rangsor</Nav.Link>
							<Nav.Link href="">Barátok</Nav.Link>
          				</Nav>
						<img src="/npic.png" width="30" height="30" className="d-inline-block align-top" alt="User Profile Pic"/>
					</Container>			
				</Navbar>
			</>
		);
    }
}
export default UserPage;