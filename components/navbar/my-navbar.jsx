import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'


export default function MyNavbar() {
    return (
        <Container>
            <Row>
                <Navbar>
                    <Container>
                        <Navbar.Brand> FOOTiFY</Navbar.Brand>
                        <Nav className='me-auto'>
                            <Nav.Link href='/predictions'>
                                Predictions
                            </Nav.Link>
                            <Nav.Link href='/results'>
                                Results
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </Row>
        </Container>
    )
}