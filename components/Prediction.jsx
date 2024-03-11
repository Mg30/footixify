// Import necessary libraries
import React from 'react';
import CardChart from './CardChart';
import { Box, Typography } from '@mui/material';
import Slider from 'react-slick'; // Import Slider component
const SoccerPrediction = ({ match }) => {
    // Destructure match data
    const { date, league, home_team, away_team, hw_proba, d_proba, aw_proba, bookmaker, potential_gain, computed_odd, under_2_5_proba, over_2_5_proba } = match;
    const maxProba = Math.max(aw_proba, hw_proba, aw_proba)
    const mostProbableOutcome = [
        { proba: aw_proba, text: `Away win - ${aw_proba.toFixed(2) * 100} %` },
        { proba: hw_proba, text: `Home win - ${hw_proba.toFixed(2) * 100} %` },
        { proba: d_proba, text: `Draw - ${d_proba.toFixed(2) * 100} %` }
    ].find(v => v.proba.toFixed(2) === maxProba.toFixed(2))
    const threeWayOptions = {
        title: {
            text: mostProbableOutcome.text,
            left: 'center',
            top: 'center',
            textStyle: {
                color: '#FFFFFF' // Ensure the title is visible on a dark theme
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {d}%' // Show tooltips with name and percentage
        },
        series: [
            {
                name: 'Proba',
                type: 'pie',
                radius: ['60%', '70%'], // Increase the inner radius
                avoidLabelOverlap: false,
                label: {
                    show: false, // Need to show labels to display percentages
                    formatter: '{b}: {d}%', // Format labels to show the name and percentage
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                        color: '#FFFFFF' // Ensure the label is visible on a dark theme
                    }
                },
                labelLine: {
                    show: true // Show label lines connecting labels to their pie pieces
                },
                color: ['#1E90FF', '#00BFFF', '#87CEEB'], // Colors for Home Win, Draw, Away Win
                data: [
                    { value: hw_proba, name: 'Home Win', itemStyle: { color: '#1E90FF' } }, // Dark blue
                    { value: d_proba, name: 'Draw', itemStyle: { color: '#00BFFF' } }, // Lighter blue
                    { value: aw_proba, name: 'Away Win', itemStyle: { color: '#87CEEB' } } // Even lighter blue
                ]
            }
        ]
    };

    const underOverOptions = {
        title: {
            text: under_2_5_proba > over_2_5_proba ? 'Under 2.5' : 'Over 2.5',
            left: 'center',
            top: 'center',
            textStyle: {
                color: '#FFFFFF' // Ensure the title is visible on a dark theme
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {d}%' // Show tooltips with name and percentage
        },
        series: [
            {
                name: 'Under/Over 2.5 Goals',
                type: 'pie',
                radius: ['60%', '70%'], // Maintain the ring style
                avoidLabelOverlap: false,
                label: {
                    show: false, // Keep labels hidden by default for a cleaner look
                    formatter: '{b}: {d}%', // Ready to display if you choose to show them
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold',
                        color: '#FFFFFF' // Ensure the label is visible on a dark theme
                    }
                },
                labelLine: {
                    show: true, // Show label lines if labels are enabled
                    lineStyle: {
                        color: '#FFFFFF' // Make sure the label lines are visible against a dark background
                    }
                },
                // Selecting colors that are visually appealing on a dark blue theme
                // and represent the 'under' and 'over' concepts
                color: ['#4F8A8B', '#F2A365'], // A cooler tone for 'under', warmer for 'over'
                data: [
                    { value: under_2_5_proba, name: 'Under', itemStyle: { color: '#4F8A8B' } },
                    { value: over_2_5_proba, name: 'Over', itemStyle: { color: '#F2A365' } }
                ]
            }
        ]
    };

    if (typeof under_2_5_proba === 'undefined' || under_2_5_proba === null || typeof over_2_5_proba === 'undefined' || over_2_5_proba === null) {
        underOverOptions.series[0].data = [{ value: 1, name: 'No Data Available', itemStyle: { color: '#708090' } }]; // A neutral color
        underOverOptions.title.text = 'No Data Available';
        // Adjust other options as needed for the "no data" scenario
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <Box className="-m-2 rounded-xl lg:-m-4 lg:rounded-2xl lg:p-4">
            <Typography component="div" sx={{ textAlign: 'center', my: 4 }}>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1, color: 'white' }}>
                    {home_team} vs {away_team}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'white' }}>
                    {league}
                </Typography>
                <Typography variant="subtitle2" sx={{ mt: 1, color: 'text.secondary' }}>
                    {new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(date))}
                </Typography>
            </Typography>
            <Slider {...settings}>
                <CardChart chartOptions={threeWayOptions} title="Three way" subHeader={`${bookmaker}: ${potential_gain.toFixed(2)} / FooTixiFy: ${computed_odd.toFixed(2)}`}>
                </CardChart>
                <CardChart chartOptions={underOverOptions} title="Under/Over 2.5">
                </CardChart>

            </Slider>

        </Box>
    );
};

export default SoccerPrediction;
