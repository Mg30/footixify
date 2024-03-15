
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
    const data = await execute(`select 
    three.*,
    strftime(three.date, '%d/%m/%Y') as date,
    three.key as id,
    under."%_under_2_5" as under_2_5_proba,
    under."%_over_2_5" as over_2_5_proba,
    under."%_both_teams_score" as btts_proba,
    case
        when under.pred_under_over_2_5 = 'over_2_5' and (1/(under."%_over_2_5"/100)) < under.oddsOver Then true
        when under.pred_under_over_2_5 = 'under_2_5' and (1/(under."%_under_2_5"/100)) < under.oddsUnder Then true
    else false
    end as is_under_value,
    under.oddsOver,
    under.oddsUnder,
    case
        when under.pred_under_over_2_5 = 'over_2_5' then  1/(under."%_over_2_5"/100)
        else  1/(under."%_under_2_5"/100)
    end as computed_under_odds,
    pred_under_over_2_5
    from read_parquet('s3://fbref-gold/predictions_history_latest_version/*.parquet') as three
    left join  read_parquet('s3://fbref-gold/predictions_history_under_over_latest_version/*.parquet') as under
    on three.key = under.key
    WHERE three.date BETWEEN current_date AND current_date + INTERVAL '5' DAY
    order by three.date ASC, under.time ASC;
    `)

    return {
        props: {
            predictions: JSON.stringify(data),
        }
    }
}

export default Predictions