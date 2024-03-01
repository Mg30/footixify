import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Footer from './Footer'
import NavBar from './Navbar'
import AgeDisclaimerModal from './AgeDisclaimer';

const Layout = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);

    useEffect(() => {
        // Check localStorage or your state management to decide whether to show the modal
        const ageConfirmed = localStorage.getItem('ageConfirmed');
        if (ageConfirmed) {
            setIsAgeConfirmed(true);
        } else {
            setIsModalOpen(true);
        }
    }, []);

    const handleConfirm = (confirmed) => {
        setIsModalOpen(false);
        if (confirmed) {
            localStorage.setItem('ageConfirmed', 'true');
            setIsAgeConfirmed(true);
        } else {
            // Handle the case where the user is under 18, e.g., redirect or show a message
            alert('You must be over 18 to use this app.');
        }
    };

    return (
        <div>
            {!isAgeConfirmed && (
                <AgeDisclaimerModal isOpen={isModalOpen} handleConfirm={handleConfirm} />
            )}
            {isAgeConfirmed && (
                <Box display="flex" flexDirection="column" minHeight="100vh">
                    <NavBar />
                    <Container component="main" sx={{ mt: 4, mb: 4, flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {children}
                    </Container>
                    <Footer />
                </Box>
            )}
        </div>

    );
};


export default Layout;