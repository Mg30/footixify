import Prediction from '../../components/Prediction';
import React from 'react';
import { duckdbFactory } from '../../database/duckdb'
import Layout from '../../components/Layout'
const PredictionDetailsPage = ({ match }) => {
    const matchData = JSON.parse(match)[0]
    return <Layout>
        <Prediction match={matchData} />
    </Layout>
};

export default PredictionDetailsPage;



// This function runs at build time in production
export async function getStaticPaths() {
    const { execute } = await duckdbFactory()
    const matches = await execute(`
    select key
    from read_parquet('s3://fbref-gold/predictions_history_latest_version/*.parquet')
    WHERE date BETWEEN current_date AND current_date + INTERVAL '5' DAY
    `)

    const paths = matches.map((match) => ({
        params: { key: match.key.toString() },
    }));

    return { paths, fallback: false }; // fallback: false means pages not found will result in a 404 page
}

// This function runs at build time in production and generates static props for the page
export async function getStaticProps({ params }) {
    const { execute } = await duckdbFactory()

    const matchData = await execute(`
    select three.*,
    under."%_under_2_5" as under_2_5_proba,
    under."%_over_2_5" as over_2_5_proba,
    under."%_both_teams_score" as btts_proba,

    from read_parquet('s3://fbref-gold/predictions_history_latest_version/*.parquet') as three
    left join  read_parquet('s3://fbref-gold/predictions_history_under_over_latest_version/*.parquet') as under
    on three.key = under.key
    where three.key  = ${parseInt(params.key)}
    and three.date BETWEEN current_date AND current_date + INTERVAL '5' DAY
    `)

    return {
        props: {
            match: JSON.stringify(matchData),
        },
    };
}