import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography, Tooltip, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

function PredictionsTable({ predictions }) {
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
            field: "details",
            headerName: "Details",
            sortable: false,
            flex: 1,
            renderCell: (params) => (
                <Tooltip title="Show Details">
                    <IconButton color="primary" component="span">
                        <Link href={`/prediction/${params.row.key}`} passHref>
                            <VisibilityIcon />
                        </Link>
                    </IconButton>
                </Tooltip>
            ),
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

export default PredictionsTable