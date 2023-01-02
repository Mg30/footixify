
import Container from 'react-bootstrap/Container';
import NavBar from '../components/navbar/my-navbar'
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
            title= "Upcomming Matches"
                keyField="id"
                data={predictions}
                columns={columns}
                pagination={paginationFactory({ sizePerPage: 15 })}
            />

        </Container>

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