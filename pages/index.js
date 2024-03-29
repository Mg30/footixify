import React from 'react';

import { duckdbFactory } from '../database/duckdb'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { Typography, Button, Box, Container } from '@mui/material';
import FAQSection from '../components/Faq';
import * as echarts from 'echarts';
import Slider from 'react-slick'; // Import Slider component
import CardChart from '../components/CardChart';


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

export default function Home({ profitsAllLeague, profitsUnderOver }) {
  const router = useRouter()
  const dataAllLeagues = JSON.parse(profitsAllLeague);
  const dataUnderOver = JSON.parse(profitsUnderOver);

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
            { offset: 0, color: 'violet' }, // Start of gradient
            { offset: 1, color: 'blue' } // End of gradient
          ])
        },
      },
    ],
  };
  const underOverOptions = {
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
        data: dataUnderOver.map(item => [item.date, item.cumulative_profit]),
        // Ensure your data is mapped correctly; `item.date` should be a time value (timestamp or date string)
        areaStyle: {},
        emphasis: {
          focus: 'series',
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'violet' }, // Start of gradient
            { offset: 1, color: 'blue' } // End of gradient
          ])
        },
      },
    ],
  };
  return (
    <Layout>
      <Box py={{ xs: 24, sm: 32 }}>
        <Container maxWidth="xl" px={{ xs: 6, lg: 8 }}>
          <Box mb={{ lg: 18 }} mx="auto" maxWidth="md" textAlign="center">
            <Typography variant="h1" component="h1" sx={{
              fontSize: { xs: '2.25rem', sm: '3.75rem' }, // Adjust font sizes as needed
              fontWeight: 'bold',
              color: 'text.primary',
              fontStyle: 'italic'
            }}>
              Soccer Predictions
            </Typography>
            <Typography mt={6} mx="auto" maxWidth="2xl" sx={{
              fontSize: '1.125rem',
              lineHeight: 1.5,
              color: 'text.secondary'
            }}>
              Soccer Insights with AI for <strong>Top European Leagues</strong> & Beyond
            </Typography>
            <Box mt={10} display="flex" justifyContent="center" gap={2}>
              <Button
                variant="outlined"
                onClick={() => router.push('/predictions')}
                sx={{
                  px: 3.5,
                  py: 2.5,
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                  color: 'text.primary',
                  borderColor: 'grey.300',
                  '&:hover': {
                    borderColor: 'yellow.300', // Adjust hover color as needed
                  },
                  boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
                }}
              >
                Get Started →
              </Button>
            </Box>
          </Box>
          <Box mt={{ xs: 14, sm: 14 }} className="flow-root">
            <Slider {...settings}>
              <Box className="-m-2 rounded-xl lg:-m-4 lg:rounded-2xl lg:p-4">
                <CardChart chartOptions={allLeaguesOptions} title="Model performance" subHeader="Three way 1$ per bet."></CardChart>
              </Box>
              <Box className="-m-2 rounded-xl lg:-m-4 lg:rounded-2xl lg:p-4">
                <CardChart chartOptions={underOverOptions} title="Model performance" subHeader="Under/Over 2.5 1$ per bet."></CardChart>
              </Box>
            </Slider>

          </Box>
          <FAQSection />
        </Container>
      </Box>


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

  const underOver = await execute(`
  with group_date as (select
    round(sum(gain),2) - count (*) as profit,
    date,
    from read_parquet('s3://fbref-gold/results_history_under_over_latest_version/*.parquet')
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
      profitsUnderOver: JSON.stringify(underOver),
    }
  }
}