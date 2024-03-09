
import React from 'react';

import { duckdbFactory } from '../database/duckdb'
import { Tabs, Tab, Box } from '@mui/material';
import Layout from '../components/Layout'
import TabPanel from '../components/TabPanel'
import ThreeWayPredictionsTable from '../components/ThreeWayPredictionsTable';
import UnderOverPredictionsTable from '../components/UnderOverPredictionsTable';
import { useState } from 'react';
function Predictions({ predictions, overUnderPredictions }) {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <Box sx={{ width: '100%' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab label="Three way" />
                    <Tab label="Under/Over" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <ThreeWayPredictionsTable predictions={predictions} ></ThreeWayPredictionsTable>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UnderOverPredictionsTable predictions={overUnderPredictions}></UnderOverPredictionsTable>
                </TabPanel>
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
    where date >= current_date()
    order by date ASC;
    `)

    const underOverPredictions = await execute(`select *,
    key as id,
    strftime(date, '%d/%m/%Y') as date,
    from read_parquet('s3://fbref-gold/predictions_history_under_over_latest_version/*.parquet')
    where date >= current_date()
    order by date ASC;
    `)
    return {
        props: {
            predictions: JSON.stringify(data),
            overUnderPredictions: JSON.stringify(underOverPredictions)
        }
    }
}

export default Predictions