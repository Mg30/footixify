import React from 'react';
import ReactECharts from 'echarts-for-react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const CardChart = ({ title, subHeader, chartOptions }) => {

    return (
        <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>

            <CardHeader title={title} subheader={subHeader} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} /> {/* Card Header with title */}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <ReactECharts
                    option={chartOptions}
                    style={{ height: 500, width: '100%' }} // Make sure ReactECharts takes the full height and width
                />
            </CardContent>
        </Card>
    )

}

export default CardChart
