//Imports
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import {
	Navbar,
	Container,
	Nav,
	Offcanvas,
	Button,
	Row,
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
	{ text: "Pontjaim", link: "./userPage", class: "me-2" },
	{ text: "Rangsor", link: "./rankPage", class: "me-2" },
	{ text: "Barátok", link: "./friendPage", class: "me-auto" },
];

//Navbar
const NavMenu = (props: {
	username: string;
	picfilepath: string;
	logoutHandler: () => void;
}) => {
	const navigate = useNavigate();
	return (
		<>
			{[false].map((expand) => (	
				<Navbar
					expand={expand}
					className="color-nav"
					variant="dark"
					key={"navbar"}
					style={{ minHeight: "11vh" }}
				>
					<Container fluid>
						<Navbar.Brand>
							<img
								id="logo"
								alt="Green_Race_Logo"
								src="greenRaceLogo.png"
								width="50vh="
								height="50vh="
							/>
						</Navbar.Brand>
						{NavMenuPoints.map((mp, i) => (
							<Nav className={mp.class} key={i}>
								<Nav.Link href={mp.link}>{mp.text}</Nav.Link>
							</Nav>
						))}
						<Navbar.Toggle
							id="profpicbut"
							aria-controls={`offcanvasNavbar-expand-${expand}`}
						>
							<div className="profpicbor">
								<img
									id="profpic"
									alt="Profpic"
									src={
										props.picfilepath !== "" ? props.picfilepath : "npic.png"
									}
									width="40vh="
									height="40vh="
								/>
							</div>
						</Navbar.Toggle>
						<Navbar.Offcanvas
							id={`offcanvasNavbar-expand-${expand}`}
							aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
							placement="end"
							className="w-auto"
						>
							<Offcanvas.Header closeButton>
								<Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`} />
							</Offcanvas.Header>
							<Offcanvas.Body>
								<Container className="text-center">
									<img
										id="profpic"
										alt="Profpic"
										src={
											props.picfilepath !== "" ? props.picfilepath : "npic.png"
										}
										width="90vh="
										height="90vh="
										className="mb-3"
									/>
									<Row>
										<p>
											{props.username !== ""
												? props.username
												: "username_placeholder"}
										</p>
									</Row>
									<Row>
										<Button
											variant="success"
											className="mb-1"
											onClick={() => navigate("/settings")}
										>
											Options
										</Button>
									</Row>
									<Row>
										<Button variant="danger" onClick={props.logoutHandler}>
											Logout
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
export default NavMenu;
