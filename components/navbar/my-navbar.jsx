import React from 'react'
import { useRouter } from 'next/router'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Box } from '@mui/material';
export default function MyNavbar() {
    const router = useRouter()
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
                    <Button color="inherit" onClick={() => router.push('/predictions')} >Upcoming matches predictions</Button>
                    <Button color="inherit" onClick={() => router.push('/results')}>Predictions History</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}