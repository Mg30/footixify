
import React from 'react';

import { duckdbFactory } from '../database/duckdb'
import { Box } from '@mui/material';
import Layout from '../components/Layout'
import PredictionsTable from '../components/PredictionsTable';
function Predictions({ predictions, }) {

    return (
        <Layout>
            <Box sx={{ width: '100%' }}>

                <PredictionsTable predictions={predictions} ></PredictionsTable>

            </Box>

        </Layout>
    );
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
    WHERE date BETWEEN current_date AND current_date + INTERVAL '5' DAY
    order by date ASC;
    `)

    return {
        props: {
            predictions: JSON.stringify(data),
        }
    }
}

export default Predictions