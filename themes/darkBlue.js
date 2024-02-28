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
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Default Material UI font family
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
            color: '#ffffff',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
            color: '#ccd6f6',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
            color: '#ccd6f6',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#ccd6f6',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#8892b0',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 500,
            color: '#8892b0',
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 400,
            color: '#ccd6f6',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#ccd6f6',
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            color: '#ccd6f6',
        },
        button: {
            textTransform: 'none', // To keep the button text in normal case
            fontWeight: 500,
            color: '#ffffff',
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 400,
            color: '#8892b0',
        },
        overline: {
            fontSize: '0.625rem',
            fontWeight: 400,
            color: '#8892b0',
            textTransform: 'uppercase',
        },
    },
    // Additional theme customization can go here
});

export default darkTheme;