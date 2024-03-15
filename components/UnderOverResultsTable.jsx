import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'; // For the "winnings" icon
import { Box, Tooltip, } from '@mui/material';

function UnderOverResultsTable({ results }) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const columns = [
        ...(isSmallScreen ? [{
            field: "matchDetails",
            headerName: "Fixture",
            sortable: false,
            flex: 4,
            valueGetter: (params) => {
                const formattedDate = params.row.date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
                return `${formattedDate} - ${params.row.home_team} vs ${params.row.away_team}`;
            },
        }] : [
            {
                field: "date",
                headerName: "Date",
                sortable: true,
                flex: 1,
                renderCell: (params) => {
                    return params.value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                }
            },
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
            field: "pred_under_over_2_5",
            headerName: "Bet outcome",
            sortable: true,
            flex: isSmallScreen ? 3 : 1,
            renderCell: (params) => {
                // Assuming you have a way to determine if the prediction matches the result in your data
                const isCorrect = params.row.pred_under_over_2_5 === params.row.is_under_over_2_5;
                // Format the winnings as needed, assuming it's a numeric value
                const winningsFormatted = `${params.row.gain.toFixed(2)}`;

                return (

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: isCorrect ? '#0ffd93' : '#c07077', // Teal for wins, dark purple for losses
                            fontWeight: isCorrect ? 'bold' : 'normal',
                        }}
                    >
                        <span>{params.row.pred_under_over_2_5 === 'over_2_5' ? 'O-2.5' : 'U-2.5'} - {winningsFormatted}</span>
                        {isCorrect && <MonetizationOnIcon sx={{ color: '#ffd700', marginLeft: '5px' }} />}
                    </Box>
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

export default UnderOverResultsTable