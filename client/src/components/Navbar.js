import React from 'react';
import { Link } from 'react-router-dom';
// import { Navbar,Nav,NavDropdown, Container} from 'react-bootstrap'

export default function Navbar() {

    return (




        <nav className="Navbar">


            <Link to='/'>
                <button>Home</button>
            </Link>


            <button>Logout</button>



            <Link to='/signup'>
                <button>Signup</button>

            </Link>


            <Link to='/login'>
                <button>Login</button>
            </Link>


        </nav>


        //         <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        //   <Container>
        //   <Navbar.Brand to="/home">Home</Navbar.Brand>
        //   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        //   <Navbar.Collapse id="responsive-navbar-nav">
        //     <Nav className="me-auto">

        //       <Nav.Link href="#pricing">Pricing</Nav.Link>
        //       <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
        //         <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        //         <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        //         <NavDropdown.Divider />
        //         <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        //       </NavDropdown>
        //     </Nav>
        //     <Nav>
        //       <Nav.Link href="#deets">More deets</Nav.Link>
        //       <Nav.Link eventKey={2} href="#memes">
        //         Dank memes
        //       </Nav.Link>
        //     </Nav>
        //   </Navbar.Collapse>
        //   </Container>
        // </Navbar>

    )
}
