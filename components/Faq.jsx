import React from 'react';
import { Typography, Box, Grid, Divider } from '@mui/material';

// Assuming you have an array of faqs similar to this:
const faqs = [
    {
        id: 1,
        question: 'How does it work?',
        answer: 'Our platform uses advanced machine learning algorithms trained on data from seven seasons across each covered league. This vast dataset includes team performances, player statistics, and match outcomes to generate accurate predictions for soccer matches.',
        href: "#"
    },

    {
        id: 2,
        question: 'Can I trust the prediction model?',
        answer: 'Our model provides insights based on extensive data analysis and is designed to predict the most probable outcomes. However, as with any prediction model, there is always a margin of error. We encourage users to use our predictions as a guide alongside their judgment and knowledge.',
        href: "#"
    },
    {
        id: 4,
        question: 'How often are predictions updated?',
        answer: 'Predictions are updated regularly, incorporating the latest data to ensure you have the most current insights for each match.',
        href: "#"
    },
];

function FAQSection() {
    return (
        <Box mt={32} mx="auto" maxWidth={{ xs: '2xl', lg: '7xl' }} px={{ xs: 6, lg: 8 }} pb={{ xs: 8, sm: 24 }} pt={{ sm: 12, lg: 32 }}
            sx={{
                '& .MuiDivider-root': { borderColor: 'rgba(0, 0, 0, 0.1)' }, // Adjust divider color for light/dark mode
            }}>
            <Typography id="faq" variant="h2" component="h2" fontWeight="bold" sx={{
                fontSize: '1.5rem', // text-2xl
                lineHeight: '2.5rem', // leading-10
                color: 'text.primary',
                mb: 2.5, // margin-bottom for the title
            }}>
                Frequently asked questions
            </Typography>
            <Box mt={10}>
                {faqs.map((faq, index) => (
                    <React.Fragment key={faq.id}>
                        {index > 0 && <Divider sx={{ my: 4 }} />} {/* Add divider between FAQs except before the first item */}
                        <Box pt={2} sx={{ display: 'grid', gridTemplateColumns: { lg: '5fr 7fr' }, gap: 8 }}>
                            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'text.primary' }}>
                                {faq.question}
                            </Typography>
                            <Typography mt={{ xs: 2, lg: 0 }} sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                                {faq.answer}
                            </Typography>
                        </Box>
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
}

export default FAQSection;
