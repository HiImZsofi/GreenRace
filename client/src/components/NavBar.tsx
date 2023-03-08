//Imports
import { NavLink, Navigate, useNavigate, Link } from "react-router-dom";
import {
	Navbar,
	Container,
	Nav,
	Offcanvas,
	Button,
	Row,
	DropdownButton,
	Dropdown,
	NavDropdown,
	ButtonGroup,
} from "react-bootstrap";
import React from "react";
import "../Views/Pages.css";

//Navigation Links Data
interface MenuPoints {
	text: string;
	link: string;
	class: string;
}
let NavMenuPoints: MenuPoints[] = [
	{ text: "Pontjaim", link: "/userPage", class: "me-2" },
	{ text: "Rangsor", link: "/rankPage", class: "me-2" },
	{ text: "Barátok", link: "/friendPage", class: "me-auto" },
];




//Navbar
const NavMenuLayout = (props: {
	username: string;
	picfilepath: string;
	logoutHandler: () => void;
}) => {
	let dark = localStorage.getItem('darkmode');
	const navigate = useNavigate();

	const UnCollapse = NavMenuPoints.map((mp, i) => (<Nav className={mp.class} key={i}><Nav.Link as={Link} to={mp.link} replace>{mp.text}</Nav.Link></Nav> ));

	const Collapse = <div className="mb-2">
		<DropdownButton
		  as={ButtonGroup}
		  key='down-centered'
		  id='dropdown-button-drop-down-centered'
		  drop={'down-centered'}
		  variant={dark == "false" ? "dark" : "success" }
		  title='Menu'
		>
		{NavMenuPoints.map((mp, i) => (
		<div key={i}>
		  <Nav.Link as={Link} to={mp.link} replace className="ms-1">{mp.text}</Nav.Link>
		  <Dropdown.Divider />
		  </div>
		))}
		</DropdownButton>
  </div>;

  const Brand = <Navbar.Brand>
						<img id="logo" alt="Green_Race_Logo" src="greenRaceLogo.png" width="50vh=" height="50vh="/>
					</Navbar.Brand>;

	return (
		<>
			{[false].map((expand) => (	
				<Navbar
					expand={expand}
					className={dark == "false" ? "color-nav-dark" : "color-nav-light"}
					variant="dark"
					key={"navbar"}
					style={{ minHeight: "11vh" }}
				>
					<Container fluid>
					
						{window.innerWidth > 400 && Brand}
						{window.innerWidth < 400 ? Collapse : UnCollapse }			
						<Navbar.Toggle
							id={dark == "false" ? "profpictoggle-dark": "profpictoggle-light"}
							aria-controls={`offcanvasNavbar-expand-${expand}`}
						>
							<div className="profpicbor">
								<img
									id="profpic"
									alt="Profpic"
									src={
										props.picfilepath !== null ? props.picfilepath : "npic.png"
									}
									width="40vh="
									height="40vh="
								/>
							</div>
						</Navbar.Toggle>
						{/*Navbar Offscreen part*/}
						<Navbar.Offcanvas
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="end"
							className="w-auto"
						>
							<Offcanvas.Header closeButton className={dark == "false" ? "offcanvas-dark" : "offcanvas-light"}>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} />
							</Offcanvas.Header>
							<Offcanvas.Body className={dark == "false" ? "offcanvas-dark" : "offcanvas-light"}>
								<Container className="text-center">
									<button
											className="mb-2"
											id={dark == "false" ? "profpicbut-dark": "profpicbut-light"}
											onClick={() => navigate("/profpicsetter")}
										>
										<div>
										<img src="edit.png" width="90vh=" height="90vh=" className="editicon"/>
										<img
										id="profpic"
										alt="Profpic"
										src={
											props.picfilepath !== null ? props.picfilepath : "npic.png"
										}
										width="100vh="
										height="100vh="
									/></div>
									</button>
									<Row>
										<h4 className="mb-3">
											{props.username !== ""
												? props.username
												: "username_placeholder"}
										</h4>
									</Row>
									<Row>
										<Button
											variant="success"
											className="mb-1"
											onClick={() => navigate("/settings")}
										>
											Beállítások
										</Button>
									</Row>
									<Row>
										<Button variant="danger" onClick={props.logoutHandler}>
											Kijelentkezés
										</Button>{" "}
									</Row>
								</Container>
							</Offcanvas.Body>
						</Navbar.Offcanvas>
					</Container>
				</Navbar>
			))}
		</>
	);
};
export default NavMenuLayout;
