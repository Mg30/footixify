
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
        flex: 1,
    },
    {
        field: "away_team",
        headerName: "away team",
        sortable: false,
        flex: 1,
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
        flex: 1,
    },
    {
        field: "outcome_probability",
        headerName: "outcome probability",
        sortable: true,
        flex: 1,
    },
    {
        field: "is_value",
        headerName: "value bet",
        sortable: true,
        flex: 1,
    },

]
function Predictions({ predictions }) {

    return (

        <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <div style={{ flexGrow: 1 }}>
                    <DataGrid
                        rows={JSON.parse(predictions)}
                        columns={columns}
                        pageSize={10}
                        autoHeight
                    />
                </div>
            </div>
        </div>


    )
}

export async function getStaticProps() {
    const { execute } = await duckdbFactory()
    const data = await execute(`select *, 
    row_number() OVER () as id,
    strftime(date, '%d/%m/%Y') as date,
    case 
    when prediction = 'hw' then round(hw_proba,2)
    when prediction = 'aw' then round(aw_proba,2)
    when prediction = 'd' then round(d_proba,2)
    end as outcome_probability
    from read_parquet('s3://fbref-gold/predictions_history_latest_version/*.parquet')
    where date >= current_date()
    order by date ASC;
    `)
    return {
        props: {
            predictions: JSON.stringify(data),
        }
    }
}

export default Predictions