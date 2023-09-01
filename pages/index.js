import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Grid, CardHeader, Card, CardContent, Typography, Select, MenuItem } from '@mui/material';
import { duckdbFactory } from '../database/duckdb'

export default function Home({ profits, profitsAllLeague }) {
  const data = JSON.parse(profits)
  const dataAllLeagues = JSON.parse(profitsAllLeague)
  const leagues = data.map(v => v.league)
  const uniqueLeague = Array.from(new Set(leagues))
  const [selectedLeague, setSelectedLeague] = useState('premier-league');

  const options = {

    xAxis: {
      type: 'category'
    },
    yAxis: {},
    series: [
      {
        name: 'cumulative profit',
        type: 'line',
        encode: {
          x: "date",
          y: "cumulative_profit"
        }

      },
      {
        name: 'profit',
        type: 'bar',
        encode: {
          x: "date",
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
        dimension: 0,
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


  const filteredData = selectedLeague === '' ? data : data.filter(v => v.league === selectedLeague);

  const perLeagues = {
    dataset: {
      source: filteredData
    },
    ...options
  }

  const allLeagues = {
    dataset: {
      source: dataAllLeagues
    },
    ...options
  }

  return (
    <React.Fragment>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <Card elevation={0} sx={{ minWidth: 275 }}>
            <CardHeader title="Model Performance " subheader={`For : ${selectedLeague}  value bet only`}>
            </CardHeader>
            <CardContent>
              <Select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                displayEmpty
                fullWidth
              >
                {uniqueLeague.map((league, idx) => (
                  <MenuItem key={idx} value={league}>
                    {league}
                  </MenuItem>
                ))}
              </Select>
              <ReactECharts option={perLeagues} />
            </CardContent>
            <Typography></Typography>

          </Card>
        </Grid>
        <Grid item>
          <Card elevation={0} sx={{ minWidth: 275 }}>
            <CardHeader title="Model Performance" subheader="For top 5 EU leagues value bet only">

            </CardHeader>
            <CardContent>
              <ReactECharts option={allLeagues} />
            </CardContent>

          </Card>
        </Grid>
      </Grid>

    </React.Fragment>

  )
}

export async function getStaticProps() {
  const { execute } = await duckdbFactory()
  const data = await execute(`
  with group_date as (select
  round(sum(gain),2) - count (*) as profit,
  league,
  date
  from read_parquet('s3://fbref-gold/results_history_latest_version/*.parquet')
  where was_value = 'true'
  group by date, league)

  select *, 
  sum(profit) over (partition by league ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_profit
  from group_date
  order by date
  `)


  const allLeagues = await execute(`
  with group_date as (select
    round(sum(gain),2) - count (*) as profit,
    date
    from read_parquet('s3://fbref-gold/results_history_latest_version/*.parquet')
    where was_value = 'true' and league in ('liga','ligue-1','premier-league','bundesliga','serie-a')
    group by date
    )
  
    select *, 
    sum(profit) over (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_profit
    from group_date
    order by date
  `)

  return {
    props: {
      profits: JSON.stringify(data),
      profitsAllLeague: JSON.stringify(allLeagues)
    }
  }
}