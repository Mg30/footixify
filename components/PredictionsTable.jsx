import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography, Tooltip, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Link from 'next/link';

function PredictionsTable({ predictions }) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const columns = [
        ...(isSmallScreen ? [{
            field: "matchDetails",
            headerName: "Match Details",
            sortable: false,
            flex: 6,
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
            field: "predictionDetails",
            headerName: "Prediction",
            sortable: false,
            flex: isSmallScreen ? 3 : 1,
            renderCell: (params) => {
                const predictionStyle = {
                    color: params.row.is_value ? '#0ffd93' : '#729cbd',
                };
                const predictionUnderStyle = {
                    color: params.row.is_under_value ? '#0ffd93' : '#729cbd',
                };

                // Fallback for falsy computed_odd or computed_under_odds values
                const computedOddPercentage = params.row.computed_odd ? ((1 / params.row.computed_odd) * 100).toFixed(2) : "N/A";
                const computedUnderOddsPercentage = params.row.computed_under_odds ? ((1 / params.row.computed_under_odds) * 100).toFixed(2) : "N/A";
                const tooltipTitle = `${computedOddPercentage}% / ${computedUnderOddsPercentage}%`;

                // Fallback for falsy pred_under_over_2_5 values
                let predUnderOverText;
                if (params.row.pred_under_over_2_5 === 'over_2_5') {
                    predUnderOverText = 'O-2.5';
                } else if (params.row.pred_under_over_2_5 === 'under_2_5') {
                    predUnderOverText = 'U-2.5';
                } else {
                    // Fallback text or handling for when pred_under_over_2_5 is falsy
                    predUnderOverText = 'N/A'; // Adjust this based on your needs
                }

                return (
                    <Tooltip title={tooltipTitle}>

                        <span>
                            <span style={predictionStyle}>{params.row.prediction.toUpperCase()}</span>
                            {' - '}
                            <span style={predictionUnderStyle}>{predUnderOverText}</span>
                        </span>
                    </Tooltip>
                );
            }
        },
        {
            field: "details",
            headerName: "",
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
        item.date = new Date(year, month - 1, day);
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