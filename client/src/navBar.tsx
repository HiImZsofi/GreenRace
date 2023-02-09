import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Pages.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NavMenu = ()=> {
    return (
        <div>
        {[false].map((expand) => (
            <Navbar expand={expand} className="mb-3 color-nav" variant='dark'>
              <Container fluid>
            <Navbar.Brand>
            <img id="logo" alt="Green_Race_Logo" src="greenRaceLogo.png" width="50vh=" height="50vh="/>
            </Navbar.Brand>
            <Nav className='me-2'>
                <Nav.Link href="./userPage">Pontjaim</Nav.Link>		
            </Nav>
            <Nav className='me-2'>
                <Nav.Link href="./rankPage">Rangsor</Nav.Link>		
            </Nav>
            <Nav className='me-auto'>
                <Nav.Link href="./friendPage">Barátok</Nav.Link>		
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
    );
}
export default NavMenu;