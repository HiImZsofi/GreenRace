import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './userPage.css';

class UserPage extends React.Component<{}, any> {

    render(): React.ReactNode {
		return (
			<>		
				<Navbar className="color-nav" variant="dark">
					<Container>
						<Col xs={2} className="text-center">
							<Navbar.Brand>
							  <img id="logo" alt="Green_Race_Logo" src="greenRaceLogo.png" width="90vh=" height="90vh="/>
							</Navbar.Brand>
						</Col>
						<Col xs={10} className="text-center">
							<Nav className="me-auto">
							<Nav.Link href="">Pontjaim</Nav.Link>
            				<Nav.Link href="">Rangsor</Nav.Link>
            				<Nav.Link href="">Barátok</Nav.Link>							
							</Nav>
						</Col>
						<Col xs={2} className="text-center">
							<img id="profpic" alt="Profpic" src="npic.png" width="90vh=" height="90vh="/>
						</Col>
					</Container>
				</Navbar>
			</>
		);
    }
}
export default UserPage;