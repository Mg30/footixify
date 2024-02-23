import React from 'react'
import { Paper, Box, Container, Typography } from '@mui/material';
export default function MyFooter() {
    return (
        <Paper sx={{
            marginTop: 'auto', // Adjust as necessary
            position: 'sticky', // Changed from 'fixed' to 'sticky'
        }} component="footer" square variant="outlined">
            <Container maxWidth="lg">
                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        my: 1
                    }}
                >
                </Box>

                <Box
                    sx={{
                        flexGrow: 1,
                        justifyContent: "center",
                        display: "flex",
                        mb: 2,
                    }}
                >
                    <Typography variant="caption" color="initial">
                        Copyright ©2023. GonzaData
                    </Typography>
                </Box>
            </Container>
        </Paper>
    );
}