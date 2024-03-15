import React from 'react';
import { duckdbFactory } from '../database/duckdb'
import Layout from '../components/Layout'
import { Typography, Tabs, Tab, Box } from '@mui/material';
import ThreeWaysResultsTable from '../components/ThreeWaysResultsTable';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import TabPanel from '../components/TabPanel'
import UnderOverResultsTable from '../components/UnderOverResultsTable';

function Results({ results, underOverResults }) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
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
                <Typography variant={isSmallScreen ? 'h6' : 'h4'} style={{ margin: '20px 0', textAlign: 'center' }}>
                    Predictions History
                </Typography>
                <TabPanel value={value} index={0}>
                    <ThreeWaysResultsTable results={results}></ThreeWaysResultsTable>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <UnderOverResultsTable results={underOverResults}></UnderOverResultsTable>
                </TabPanel>
            </Box>



        </Layout>
    );
}

export async function getStaticProps() {
    const { execute } = await duckdbFactory()
    const data = await execute(`
    with source as (
        select * from read_parquet('s3://fbref-gold/results_history_latest_version/*.parquet')
        order by date DESC
    )
    
    select *,
    round(gain,2) as gain,
    row_number() OVER () as id,
    strftime(date, '%d/%m/%Y') as date
    from source
    `)

    const overUnderData = await execute(`
    with source as (
        select * from read_parquet('s3://fbref-gold/results_history_under_over_latest_version/*.parquet')
        order by date DESC
    )
    select
    round(gain,2) as gain,
    key as id,
    home_team,
    away_team,
    league,
    pred_under_over_2_5,
    is_under_over_2_5,
    gain,
    strftime(date, '%d/%m/%Y') as date
    from source
    `)
    return {
        props: {
            results: JSON.stringify(data),
            underOverResults: JSON.stringify(overUnderData)
        }
    }
}

export default Results 