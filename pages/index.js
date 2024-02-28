import React from 'react';
import ReactECharts from 'echarts-for-react';

import { duckdbFactory } from '../database/duckdb'
import Layout from '../components/layout'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as echarts from 'echarts';
import CardHeader from '@mui/material/CardHeader';
export default function Home({ profitsAllLeague }) {
  const dataAllLeagues = JSON.parse(profitsAllLeague);

  const allLeaguesOptions = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Cumulative Profit',
        type: 'line',
        data: dataAllLeagues.map(item => [item.date, item.cumulative_profit]),
        // Ensure your data is mapped correctly; `item.date` should be a time value (timestamp or date string)
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'green' }, // Start of gradient
            { offset: 1, color: 'orange' } // End of gradient
          ])
        },
      },
    ],
  };
  return (
    <Layout>
      <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CardHeader title="Cumulative Profit Across All Leagues" subheader="1$ per bet" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} /> {/* Card Header with title */}
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <ReactECharts
            option={allLeaguesOptions}
            style={{ height: 500, width: '100%' }} // Make sure ReactECharts takes the full height and width
          />
        </CardContent>
      </Card>
    </Layout>

  );
}

export async function getStaticProps() {
  const { execute } = await duckdbFactory()

  const allLeagues = await execute(`
  with group_date as (select
    round(sum(gain),2) - count (*) as profit,
    date,
    from read_parquet('s3://fbref-gold/results_history_latest_version/*.parquet')
    group by date
    )
  
    select *, 
    sum(profit) over (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_profit
    from group_date
    order by date
  `)


  return {
    props: {
      profitsAllLeague: JSON.stringify(allLeagues),
    }
  }
}