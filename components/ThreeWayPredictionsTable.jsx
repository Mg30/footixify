import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography, Tooltip } from '@mui/material';


function ThreeWayPredictionsTable({ predictions }) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    // Dynamically adjust columns based on screen size
    const columns = [
        {
            field: "date",
            headerName: "Date",
            sortable: true,
            flex: isSmallScreen ? 2 : 1,
            renderCell: (params) => {
                // Assuming params.value is a Date object. If it's a string, you may need to parse it first
                // Example for a Date object: const date = params.value;
                // Example for a string: const date = new Date(params.value);
                const date = params.value instanceof Date ? params.value : new Date(params.value);
                // Format the date to a more readable form, e.g., "Mar 01, 2024"
                // You can adjust the 'en-US' and the options to fit your needs
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            }
        },
        ...(isSmallScreen ? [{
            field: "match",
            headerName: "Match",
            sortable: false,
            flex: 3,
            valueGetter: (params) => `${params.row.home_team} vs 
            \n${params.row.away_team}`,
        }] : [
            {
                field: "home_team",
                headerName: "Home Team",
                sortable: false,
                flex: 1,
            },
            {
                field: "away_team",
                headerName: "Away Team",
                sortable: false,
                flex: 1,
            },
        ]),
        {
            field: "league",
            headerName: "League",
            sortable: true,
            flex: isSmallScreen ? 0 : 1,
            hide: isSmallScreen,
        },
        {
            field: "prediction",
            headerName: "Prediction",
            sortable: true,
            flex: 2,
            renderCell: (params) => {
                // Mapping prediction codes to readable format
                const predictionMapping = {
                    hw: "HW",
                    d: "D",
                    aw: "AW",
                };

                // Function to determine color based on probability
                // Adjust the ranges and colors as needed
                const getColorFromProbability = (probability) => {
                    if (probability < 0.45) return 'orange';
                    return 'green'; // Simple binary color for demonstration
                    // For a more granular color range, consider implementing a gradient or using a library
                };

                // Formatting probability to include "%" and rounding if needed
                const pourcentage = params.row.outcome_probability * 100
                const probabilityFormatted = `${pourcentage.toFixed(2)}%`;

                return (
                    <Tooltip title={`Value Bet: ${params.row.is_value ? 'Yes' : 'No'}`}>
                        <span style={{ color: getColorFromProbability(params.row.outcome_probability) }}>
                            {predictionMapping[params.value]} - {probabilityFormatted}
                        </span>
                    </Tooltip>
                );
            }
        },
    ];

    const rows = JSON.parse(predictions);
    rows.forEach(item => {
        const [day, month, year] = item.date.split('/').map(Number);
        item.date = new Date(year, month - 1, day); // Adjusting for JavaScript's 0-based months
    });

    return (
        <>
            <Typography variant={isSmallScreen ? 'h6' : 'h4'} style={{ margin: '20px 0', textAlign: 'center' }}>
                Predictions for Upcoming Matches
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={isSmallScreen ? 10 : 20}
                autoHeight
            />
        </>
    );
}

export default ThreeWayPredictionsTable