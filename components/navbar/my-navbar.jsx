import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function MyNavbar() {
    const router = useRouter()
    return (
        <Container>
            <Row>
                <Navbar>
                    <Container>
                        <Navbar.Brand>FooTixiFy</Navbar.Brand>
                        SOCCER PREDICTIONS
                        <Nav>
                            <Nav.Link onClick={() => router.push('/')}>
                                Home
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => router.push('/predictions')}>
                                Upcomming matches Predictions
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => router.push('/results')}>
                                Prediction History
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </Row>
        </Container>
    )
}