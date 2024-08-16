import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChartComponent = () => {
  // Data for the donut chart
  const data = {
    labels: ["Group A", "Group B", "Group C", "Group D"],
    datasets: [
      {
        data: [400, 300, 300, 200],
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
        hoverBackgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
      },
    ],
  };

  // Options to customize the chart, including cutout for donut effect
  const options = {
    cutout: "50%", // This creates the donut hole
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.restore();
        const fontSize = (height / 100).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = "middle";

        const text = "Center Text";
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  };

  // Top two legends manually
  const topTwoLegends = data.labels.slice(0, 2).map((label, index) => ({
    label,
    color: data.datasets[0].backgroundColor[index],
  }));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box sx={{ width: 300, height: 300 }}>
        <Doughnut data={data} options={options} />
      </Box>
      <List>
        {topTwoLegends.map((legend, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Box sx={{ width: 20, height: 20, backgroundColor: legend.color }} />
            </ListItemIcon>
            <ListItemText primary={legend.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DonutChartComponent;
