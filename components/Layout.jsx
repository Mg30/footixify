import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Footer from './Footer'
import NavBar from './Navbar'
import AgeDisclaimerModal from './AgeDisclaimer';

const Layout = ({ children }) => {

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <NavBar />
            <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {children}
            </Container>
            <Footer />
        </Box>
    );
};


export default Layout;