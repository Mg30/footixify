import React from 'react';
import { Paper, Container, Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
            <Container maxWidth="lg">
                <Box
                    sx={{
                        justifyContent: "center",
                        display: "flex",
                        my: 0.5 // Adjusted vertical margin for tighter spacing
                    }}
                >
                    {/* Additional content or links can go here */}
                </Box>

                <Box
                    sx={{
                        justifyContent: "center",
                        display: "flex",
                        mb: 1, // Reduced bottom margin for a tighter footer
                    }}
                >
                    <Typography variant="caption" color="text.secondary">
                        Copyright ©2024 GonzaData
                    </Typography>
                </Box>
            </Container>
        </Box>
    )
};

export default Footer;
