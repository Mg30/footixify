import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: 2, // Adjust the gap between elements inside the modal
};

const AgeDisclaimerModal = ({ isOpen, handleConfirm }) => {
    return (
        <Modal
            open={isOpen}
            aria-labelledby="age-disclaimer-title"
            aria-describedby="age-disclaimer-description"
        >
            <Box sx={style}>
                <Typography id="age-disclaimer-title" variant="h6" component="h2">
                    Age Verification
                </Typography>
                <Typography id="age-disclaimer-description" sx={{ mt: 2 }}>
                    You must be 18 years of age or older to use this application. Please confirm your age to continue.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleConfirm(true)}
                >
                    I am over 18
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleConfirm(false)}
                >
                    I am under 18
                </Button>
            </Box>
        </Modal>
    );
};

export default AgeDisclaimerModal;
