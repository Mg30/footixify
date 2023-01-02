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
        type: 'line',
        encode: {
          x: "matchDate",
          y: "cumulative_profit"
        }

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
            <Card.Title>Cumulative profit of the Model</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              The hypothesis taken here is to bet one euro on each matches.
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