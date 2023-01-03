import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Link from 'next/link'

export default function MyNavbar() {
    return (
        <Container>
            <Row>
                <Navbar>
                    <Container>
                        <Navbar.Brand>FooTixiFy</Navbar.Brand>
                        SOCCER PREDICTIONS
                        <Nav>
                            <Nav.Item>
                                <Link href="/">Home</Link>
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <Nav.Item>
                                <Link href="/predictions">Today Predictions</Link>
                            </Nav.Item>
                        </Nav>
                        <Nav>
                            <Nav.Item>
                                <Link href="/results">Historics Results</Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Navbar>
            </Row>
        </Container>
    )
}