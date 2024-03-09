import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // For the "winnings" icon
import { Box, Tooltip, } from '@mui/material';

function ThreeWaysResultsTable({ results }) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

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
        // Combine "home_team" and "away_team" into a single column for small screens
        ...(isSmallScreen ? [{
            field: "match",
            headerName: "Match",
            sortable: false,
            flex: 3,
            valueGetter: (params) => `${params.row.home_team} vs ${params.row.away_team}`,
        }] : [
            {
                field: "home_team",
                headerName: "Home Team",
                sortable: false,
                flex: 1
            },
            {
                field: "away_team",
                headerName: "Away Team",
                sortable: false,
                flex: 1
            },
        ]),
        {
            field: "league",
            headerName: "League",
            sortable: true,
            flex: isSmallScreen ? 0 : 1, // Hide on small screens
            hide: isSmallScreen,
        },
        {
            field: "prediction",
            headerName: "Bet outcome",
            sortable: true,
            flex: 2,
            renderCell: (params) => {
                // Assuming you have a way to determine if the prediction matches the result in your data
                const isCorrect = params.row.prediction === params.row.result;
                // Format the winnings as needed, assuming it's a numeric value
                const winningsFormatted = `${params.row.gain.toFixed(2)}`;

                return (
                    <Tooltip title={`Result: ${params.row.result}, Value Bet: ${params.row.was_value ? 'Yes' : 'No'}`}>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: isCorrect ? 'green' : 'red' }}>
                            <span>{params.row.prediction.toUpperCase()} - {winningsFormatted}</span>
                            {isCorrect && <MonetizationOnIcon sx={{ marginLeft: '5px' }} />}
                        </Box>
                    </Tooltip>
                );
            }
        },

    ];

    const rows = JSON.parse(results);
    rows.forEach(item => {
        const [day, month, year] = item.date.split('/').map(Number);
        item.date = new Date(year, month - 1, day); // Note: month is 0-based in JavaScript
    });

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={isSmallScreen ? 10 : 15}
            autoHeight
            autoPageSize
        />
    );
}

export default ThreeWaysResultsTable