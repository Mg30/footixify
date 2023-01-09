import NavBar from '../components/navbar/my-navbar'
import Footer from '../components/footers/my-footer'
import React from 'react';
import ReactECharts from 'echarts-for-react';
import pgFactory from '../database/pg'
import { Grid, CardHeader, Card, CardContent, Typography, Paper } from '@mui/material';

export default function Home({ profits }) {
  const options = {
    dataset: {
      source: profits
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {},
    series: [
      {
        name: 'cumulative profit',
        type: 'line',
        encode: {
          x: "matchDate",
          y: "cumulative_profit"
        }

      },
      {
        name: 'profit',
        type: 'bar',
        encode: {
          x: "matchDate",
          y: "profit"
        }

      },
    ],
    visualMap: [
      {
        show: false,
        min: 0,
        max: 1,
        seriesIndex: 1,
        dimension: 3,
        inRange: {
          color: ['red', 'green']
        },
      },
      {
        show: false,
        min: 0,
        max: 1,
        seriesIndex: 0,
        inRange: {
          color: ['red', 'green']
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <Grid container>
        <Grid xs={12}>
          <Card elevation={0} sx={{ minWidth: 275 }}>
            <CardHeader title="Model Performance" subheader="From start of the season for the top 5 EU league (Premier League , Liga, Serie A, Bundesliga, Ligue 1).">
            </CardHeader>
            <CardContent>
              <ReactECharts option={options} />

              <Typography variant="body2" color="text.secondary">
                Assumptions : 1€ bet on every predictions.
              </Typography>
            </CardContent>

          </Card>
        </Grid>
      </Grid>
      <Footer></Footer>

    </React.Fragment>

  )
}

export async function getStaticProps() {
  const client = pgFactory()
  await client.connect()
  const { rows } = await client.query(`select * from expo_profits`)
  await client.end()
  return {
    props: {
      profits: rows,
    }
  }
}