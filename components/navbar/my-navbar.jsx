import React from 'react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Tooltip } from '@mui/material';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'; // Icon for predictions
import HistoryIcon from '@mui/icons-material/History'; // Icon for history
export default function MyNavbar() {
    const router = useRouter()
    // Custom style for the Buy Me a Coffee button and text container
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
        display: 'none', // Hide text on smaller screens to save space
        marginLeft: '5px', // Adds space between the icon and the text
        '@media (min-width:600px)': {
            display: 'inline', // Show text on larger screens
        },
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
                        <LocalCafeIcon />
                        <Typography variant="body2" sx={textStyle}>
                            Support FooTixiFy
                        </Typography>
                    </Box>

                    {/* Icons with Tooltips for all screen sizes */}
                    <Tooltip title="Upcoming Matches Predictions">
                        <IconButton color="inherit" onClick={() => router.push('/predictions')}>
                            <SportsSoccerIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Predictions History">
                        <IconButton color="inherit" onClick={() => router.push('/results')}>
                            <HistoryIcon />
                        </IconButton>
                    </Tooltip>

                </Toolbar>
            </AppBar>
        </Box>
    );
}