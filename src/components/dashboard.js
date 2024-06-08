import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Highcharts from 'highcharts';

const Dashboard = ({ candidates }) => {
  useEffect(() => {
    if (candidates.length > 0) {
      const skillsData = candidates.map(candidate => ({
        name: candidate.name,
        skillsCount: candidate.skills.split(',').length
      }));

      const options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Skills Count per Candidate'
        },
        xAxis: {
          categories: skillsData.map(candidate => candidate.name)
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Skills Count'
          }
        },
        series: [{
          name: 'Skills Count',
          data: skillsData.map(candidate => candidate.skillsCount)
        }]
      };

      Highcharts.chart('chart-container', options);
    }
  }, [candidates]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Box boxShadow={3} p={2} bgcolor="background.paper" borderRadius={8}>
        <div id="chart-container"></div>
      </Box>
    </Box>
  );
};

export default Dashboard;
