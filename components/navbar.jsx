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
import HistoryIcon from '@mui/icons-material/History';



export default function Navbar() {
    const router = useRouter()
    // Custom style for the Buy Me a Coffee button and text container
    return (
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
    )


}