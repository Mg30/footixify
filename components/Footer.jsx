import React from 'react';
import { Box, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import LocalCafeIcon from '@mui/icons-material/LocalCafe'; // Assuming you are using
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // Importing a warning icon as an example
function Footer() {

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    // Styles
    const supportStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        // Add additional styling as needed
    };

    const textStyle = {
        ml: 1, // Add left margin to space out the icon from the text
        // Add additional text styling as needed
    };

    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isSmallScreen ? 'column' : 'row', // Stack items vertically on small screens, side by side on larger
                        alignItems: 'center', // Center items horizontally
                        justifyContent: 'center', // Center the items in the container
                        textAlign: 'center', // Ensure text is centered
                        gap: 2, // Add gap between items
                    }}
                >
                    {/* Logo and under 18 disclaimer as an icon */}
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {/* Assuming you're using an icon to represent the "Under 18 not allowed" message */}
                        <WarningAmberIcon sx={{ color: 'red', fontSize: 40 }} />
                        <Typography variant="caption" sx={{ mt: 1, color: 'red' }}>
                            Under 18 not allowed
                        </Typography>
                    </Box>

                    {/* Support message */}
                    <Box component="a" sx={supportStyle} href="https://www.buymeacoffee.com/matgonzalep" target="_blank">
                        <LocalCafeIcon />
                        <Typography variant="body2" sx={textStyle}>
                            Support FooTixiFy
                        </Typography>
                    </Box>

                    {/* Responsible gambling message */}
                    <Typography variant="caption" color="text.secondary">
                        Please Gamble Responsibly. Tips do not guarantee winning bets or profits.
                    </Typography>

                    {/* Copyright */}
                    <Box>
                        <Typography variant="caption" color="text.secondary">
                            Copyright ©2024 GonzaData
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
