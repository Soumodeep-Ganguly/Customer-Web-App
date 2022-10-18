import React from 'react'
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import { MdWidgets } from "react-icons/md";

export default function TopNav() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand href="#home"><MdWidgets /> Project Name</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <Nav.Link href="#deets">Customer Admin</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <Image src="https://media.geeksforgeeks.org/wp-content/uploads/20210425000233/test-300x297.png" roundedCircle height={30} style={{ marginRight: 10 }} />
                            User #01
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
