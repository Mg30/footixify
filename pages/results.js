import NavBar from '../components/navbar/my-navbar'
import pgFactory from '../database/pg'
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import Footer from '../components/footers/my-footer'

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
        flex: 1
    },
    {
        field: "awayTeamName",
        headerName: "away team",
        sortable: false,
        flex: 1
    },

    {
        field: "prediction",
        headerName: "predictions",
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
        field: "winnings",
        headerName: "winnings",
        sortable: false,
        flex: 1
    },

]


function Results({ results }) {
    return (
        <React.Fragment>
            <NavBar></NavBar>

            <div style={{ height: 400, width: '100%' }}>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={results}
                            columns={columns}
                            pageSize={10}
                            autoHeight
                        />
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </React.Fragment>
    )
}

export async function getStaticProps() {
    const client = pgFactory()
    await client.connect()
    const { rows } = await client.query(`select * from expo_results`)
    await client.end()
    return {
        props: {
            results: rows,
        }
    }
}

export default Results 