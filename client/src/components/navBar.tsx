//Imports
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas, Button, Row} from 'react-bootstrap';
import React from "react";
import '../Views/Pages.css';

//Navigation Links Data
interface MenuPoints {
  text: string;
  link: string;
  class: string;
} 
let NavMenuPoints: MenuPoints[] = [
  { text: "Pontjaim", link: "./userPage", class: "me-2"},
  { text: "Rangsor", link: "./rankPage", class: "me-2"},
  { text: "Barátok", link: "./friendPage", class: "me-auto"},];

//Navbar
const NavMenu = ()=> {
  const [id, setId] = React.useState(0);
  const [username, setUserName] = React.useState("");
  const [picfilepath, setPicfilepath] = React.useState("");
  React.useEffect(() => {
    const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      //TODO add fetch source 
      const res = await fetch("", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " + token,
          },
        });
        if (res.ok) {
          const json = await res.json();

          const id = json.id;
          setId(id);
          localStorage.setItem("id", id);

          const username = json.username;
          setUserName(username);
          localStorage.setItem("username", username);

          const picfilepath = json.picfilepath;
          setPicfilepath(picfilepath);
          localStorage.setItem("picfilepath", picfilepath);

        } else {
          console.log("Invalid token")
        }
    } catch (error) {
      console.log("User adataitt nem sikerült lekérni")
      console.log(error);
    }
  };
    fetchData();
  });
  const navigate = useNavigate();
    return (
        <>
        {[false].map((expand) => (
            <Navbar expand={expand} className="color-nav" variant='dark' key={"navbar"} style={{minHeight: "11vh"}}>
              <Container fluid>
                <Navbar.Brand>
                  <img id="logo" alt="Green_Race_Logo" src="greenRaceLogo.png" width="50vh=" height="50vh="/>
                </Navbar.Brand>
                {NavMenuPoints.map((mp,i)=>(
                  <Nav className={mp.class} key={i}>
                    <Nav.Link href={mp.link}>{mp.text}</Nav.Link>
                  </Nav>
                ))}
                <Navbar.Toggle id="profpicbut" aria-controls={`offcanvasNavbar-expand-${expand}`}>
                  <div className="profpicbor">
                    <img id="profpic" alt="Profpic" src={picfilepath !== "" ? picfilepath : "npic.png"} width="40vh=" height="40vh="/>
                  </div>
                </Navbar.Toggle>
                <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end" className="w-auto">
                    <Offcanvas.Header closeButton>
                      <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}/>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      <Container className='text-center'>
                        <img id="profpic" alt="Profpic" src={picfilepath !== "" ? picfilepath : "npic.png"} width="90vh=" height="90vh=" className='mb-3'/>
                        <Row><p>{username !== "" ? username : "username_placeholder"}</p></Row>
                        <Row><Button variant="success" className="mb-1" onClick={() => navigate("/settings")}>Options</Button></Row>
                        <Row><Button variant="danger" onClick={() => navigate("/login")}>Logout</Button>  </Row>          
                      </Container>	
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
    );
}
export default NavMenu;