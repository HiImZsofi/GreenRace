import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Offcanvas, Button} from 'react-bootstrap';
import '../Views/Pages.css';

interface MenuPoints {
  text: string;
  link: string;
  class: string;
} 
let NavMenuPoints: MenuPoints[] = [
  { text: "Pontjaim", link: "./userPage", class: "me-2"},
  { text: "Rangsor", link: "./rankPage", class: "me-2"},
  { text: "Barátok", link: "./friendPage", class: "me-auto"},];
const NavMenu = ()=> {
  const navigate = useNavigate();
    return (
        <>
        {[false].map((expand) => (
            <Navbar expand={expand} className="mb-3 color-nav" variant='dark'>
              <Container fluid>
            <Navbar.Brand>
            <img id="logo" alt="Green_Race_Logo" src="greenRaceLogo.png" width="50vh=" height="50vh="/>
            </Navbar.Brand>
            {NavMenuPoints.map((mp,i)=>(
              <Nav className={mp.class} key={i}>
                <Nav.Link href={mp.link} key={i}>{mp.text}</Nav.Link>
              </Nav>
            ))}
             <Navbar.Toggle id="profpicbut" aria-controls={`offcanvasNavbar-expand-${expand}`}><div className="profpicbor"><img id="profpic" alt="Profpic" src="npic.png" width="30vh=" height="30vh="/></div></Navbar.Toggle>
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
              <Button variant="danger" onClick={() => navigate("/login")}>Logout</Button>
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