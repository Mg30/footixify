
import NavBar from '../components/navbar/my-navbar'
import pgFactory from '../database/pg'
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
const columns = [
    {
        field: "matchDate",
        headerName: "date",
        sortable: true,
        flex: 1,
    },
    {
        field: "homeTeamName",
        headerName: "home team",
        sortable: false,
        flex: 1,
    },
    {
        field: "awayTeamName",
        headerName: "away team",
        sortable: false,
        flex: 1,
    },
    {
        field: "preds",
        headerName: "predictions",
        sortable: true,
        flex: 1,
    },

]
function Predictions({ predictions }) {

    return (
        <React.Fragment>
            <NavBar></NavBar>

            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={predictions}
                            columns={columns}
                            pageSize={10}
                            autoHeight
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>

    )
}

export async function getStaticProps() {
    const client = pgFactory()
    await client.connect()
    const { rows } = await client.query(`select * from expo_preds`)
    await client.end()
    return {
        props: {
            predictions: rows,
        }
    }
}

export default Predictions