import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

const Footer = () => {
    const supportStyle = {
        display: 'flex', // Aligns the icon and text horizontally
        alignItems: 'center', // Centers them vertically
        flexWrap: 'wrap', // Allows the content to wrap on smaller screens
        color: '#FFD700', // Gold color for the icon and text
        backgroundColor: '#ffffff', // White background to make it pop
        padding: '5px 10px', // Adds some padding around the content
        borderRadius: '20px', // Rounded corners for the background
        textDecoration: 'none', // Removes underline from the text
        '&:hover': {
            backgroundColor: '#FFD700', // Gold background on hover
            color: '#000000', // Change icon and text color on hover for contrast
        },
        margin: '0 10px', // Adds some space around the button and text
        maxWidth: 'fit-content', // Ensures the box fits its content
    };

    // Adjust text size based on screen size for better responsiveness
    const textStyle = {
        marginLeft: '5px', // Adds space between the icon and the text
        '@media (min-width:600px)': {
            display: 'inline', // Show text on larger screens
        },
    };
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column', // Stack items vertically
                        alignItems: 'center', // Center items horizontally for all screen sizes
                        textAlign: 'center', // Ensure text is centered within its container
                    }}
                >
                    <Box component="a" sx={supportStyle} href="https://www.buymeacoffee.com/matgonzalep" target="_blank">
                        <LocalCafeIcon />
                        <Typography variant="body2" sx={textStyle}>
                            Support FooTixiFy
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            mt: 2, // Add some top margin between the two items
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                            Copyright ©2024 GonzaData
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
