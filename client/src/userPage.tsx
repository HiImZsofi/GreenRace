import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './userPage.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

class UserPage extends React.Component<{}, any> {
    render(): React.ReactNode {
		return (
			<>
			<div>
				{[false].map((expand) => (
        			<Navbar expand={expand} className="mb-3 color-nav" variant='dark'>
          			<Container fluid>
            		<Navbar.Brand>
					<img id="logo" alt="Green_Race_Logo" src="greenRaceLogo.png" width="30vh=" height="30vh="/>
					</Navbar.Brand>
					<Nav className='me-2'>
						<Nav.Link href="./userPage">Pontjaim</Nav.Link>		
					</Nav>
					<Nav className='me-2'>
            			<Nav.Link href="">Rangsor</Nav.Link>		
					</Nav>
					<Nav className='me-auto'>
            			<Nav.Link href="">Barátok</Nav.Link>		
					</Nav>
            	 	<Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}><img id="profpic" alt="Profpic" src="npic.png" width="30vh=" height="30vh="/></Navbar.Toggle>
					<Navbar.Offcanvas
              			id={`offcanvasNavbar-expand-${expand}`}
              			aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              			placement="end"
            		>
              		<Offcanvas.Header closeButton>
                	<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                	</Offcanvas.Title>
              		</Offcanvas.Header>
              		<Offcanvas.Body>
					  <Container className='text-center'>
					  <img id="profpic" alt="Profpic" src="npic.png" width="90vh=" height="90vh=" className='mb-3'/>
					  <p>Username.placeholder</p>
					  <p>Options.placeholder</p>
					  <p>Logout.placeholder</p>
					  </Container>		  
              		</Offcanvas.Body>
            		</Navbar.Offcanvas>
          			</Container>
        			</Navbar>
      			))}
				</div>
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