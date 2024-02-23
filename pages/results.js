import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { duckdbFactory } from '../database/duckdb'

const columns = [
    {
        field: "date",
        headerName: "date",
        sortable: true,
        flex: 1,
    },
    {
        field: "home_team",
        headerName: "home team",
        sortable: false,
        flex: 1
    },
    {
        field: "away_team",
        headerName: "away team",
        sortable: false,
        flex: 1
    },
    {
        field: "league",
        headerName: "league",
        sortable: true,
        flex: 1,
    },
    {
        field: "prediction",
        headerName: "prediction",
        sortable: true,
        flex: 1
    },
    {
        field: "result",
        headerName: "result",
        sortable: true,
        flex: 1
    },
    {
        field: "gain",
        headerName: "winnings",
        sortable: false,
        flex: 1
    },
    {
        field: "was_value",
        headerName: "value bet",
        sortable: false,
        flex: 1
    },

]


function Results({ results }) {
    const rows = JSON.parse(results)
    rows.forEach(item => {
        const [day, month, year] = item.date.split('/').map(Number);
        item.date = new Date(year, month - 1, day);  // Note: month is 0-based in JavaScript
    });
    return (
        <React.Fragment>
            <div style={{ width: '100%' }}> {/* Removed fixed height */}
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={8}
                            autoHeight
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export async function getStaticProps() {
    const { execute } = await duckdbFactory()
    const data = await execute(`select *,
    round(gain,2) as gain,
    row_number() OVER () as id,
    strftime(date, '%d/%m/%Y') as date
    from read_parquet('s3://fbref-gold/results_history_latest_version/*.parquet')
    `)
    return {
        props: {
            results: JSON.stringify(data),
        }
    }
}

export default Results 