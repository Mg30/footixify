import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#673ab7', // Deep violet
        },
        secondary: {
            main: '#3f51b5', // Vivid blue
        },
        background: {
            default: '#0a1929', // Very dark blue
            paper: '#112240',
        },
        text: {
            primary: '#ccd6f6', // Light blue for text
            secondary: '#8892b0', // Slightly darker shade for secondary text
        },
    },
    typography: {
        // Customize typography settings as needed
    },
    typography: {
        // You can customize your typography here
    },
    // You can add more customization for components here
});

export default darkTheme;