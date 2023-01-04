import NavBar from '../components/navbar/my-navbar'
import { Container } from 'react-bootstrap'
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import pgFactory from '../database/pg'


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
        dataField: "prediction",
        text: "predictions",
        sort: true
    },
    {
        dataField: "result",
        text: "result",
        sort: true
    },
    {
        dataField: "winnings",
        text: "winnings",
        sort: true
    },

]


function Results({ results }) {
    return (
        <Container>
            <NavBar>
            </NavBar>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={results}
                columns={columns}
                pagination={paginationFactory({ sizePerPage: 15 })}
            />
        </Container>
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