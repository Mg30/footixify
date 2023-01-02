
import Container from 'react-bootstrap/Container';
import NavBar from '../components/navbar/my-navbar'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

const columns = [
    {
        dataField: "matchDate",
        text: "date",
        sort: true
    },
    {
        dataField: "homeTeamName",
        text: "home team",
        sort: true
    },
    {
        dataField: "awayTeamName",
        text: "away team",
        sort: true
    },
    {
        dataField: "preds",
        text: "predictions",
        sort: true
    },

]
function Predictions({ predictions }) {

    return (
        <Container>
            <NavBar>
            </NavBar>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={predictions}
                columns={columns}
                pagination={paginationFactory({ sizePerPage: 10 })}
            />

        </Container>

    )
}

export async function getStaticProps() {
    const { Client } = require('pg')

    const client = new Client({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
    await client.connect()
    const { rows } = await client.query(`select
    cast("matchDate" as TEXT) || "homeTeamName" || "awayTeamName" as id,
    cast("matchDate" as TEXT) as "matchDate",
    "homeTeamName",
    "awayTeamName",
    preds 
    from predictions 
    order by "matchDate" DESC
    `)
    await client.end()
    return {
        props: {
            predictions: rows,
        }
    }
}

export default Predictions