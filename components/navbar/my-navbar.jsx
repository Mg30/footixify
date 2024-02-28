import React from 'react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Box } from '@mui/material';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

export default function MyNavbar() {
    // Custom style for the Buy Me a Coffee button and text
    const supportStyle = {
        display: 'flex', // Aligns the icon and text horizontally
        alignItems: 'center', // Centers them vertically
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
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => router.push('/')}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        FooTixiFy
                    </Typography>

                    <Box component="a" sx={supportStyle} href="https://www.buymeacoffee.com/matgonzalep" target="_blank">
                        <LocalCafeIcon sx={{ marginRight: '5px' }} /> {/* Adds a little space between the icon and the text */}
                        Support FooTixiFy
                    </Box>

                    <Button color="inherit" onClick={() => router.push('/predictions')}>Upcoming matches predictions</Button>
                    <Button color="inherit" onClick={() => router.push('/results')}>Predictions History</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}