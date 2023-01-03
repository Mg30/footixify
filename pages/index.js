import NavBar from '../components/navbar/my-navbar'
import { Container, Card, Row } from 'react-bootstrap'
import React from 'react';
import ReactECharts from 'echarts-for-react';
import pgFactory from '../database/pg'

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
    <Container>
      <NavBar>
      </NavBar>
      <Row>
        <Card >
          <Card.Header>
            <Card.Title>Model performance</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
            ML bets only : 1€ bet on every match.
            </Card.Text>
            <ReactECharts option={options} />
          </Card.Body>
        </Card>
      </Row>

    </Container>
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