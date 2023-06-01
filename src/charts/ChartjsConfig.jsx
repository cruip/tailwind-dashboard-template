// Import Chart.js
import { Chart, Tooltip } from 'chart.js';
// Import Tailwind config
import { tailwindConfig, hexToRGB } from '../utils/Utils';

Chart.register(Tooltip);

// Define Chart.js default settings
Chart.defaults.font.family = '"Inter", sans-serif';
Chart.defaults.font.weight = '500';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.displayColors = false;
Chart.defaults.plugins.tooltip.mode = 'nearest';
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.position = 'nearest';
Chart.defaults.plugins.tooltip.caretSize = 0;
Chart.defaults.plugins.tooltip.caretPadding = 20;
Chart.defaults.plugins.tooltip.cornerRadius = 4;
Chart.defaults.plugins.tooltip.padding = 8;

// Register Chart.js plugin to add a bg option for chart area
Chart.register({
  id: 'chartAreaPlugin',
  // eslint-disable-next-line object-shorthand
  beforeDraw: (chart) => {
    if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
      const ctx = chart.canvas.getContext('2d');
      const { chartArea } = chart;
      ctx.save();
      ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
      // eslint-disable-next-line max-len
      ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
      ctx.restore();
    }
  },
});

export const chartColors = {
  textColor: {
    light: tailwindConfig().theme.colors.slate[400],
    dark: tailwindConfig().theme.colors.slate[500],
  },
  gridColor: {
    light: tailwindConfig().theme.colors.slate[100],
    dark: tailwindConfig().theme.colors.slate[700],
  },
  backdropColor: {
    light: tailwindConfig().theme.colors.white,
    dark: tailwindConfig().theme.colors.slate[800],
  },
  tooltipTitleColor: {
    light: tailwindConfig().theme.colors.slate[800],
    dark: tailwindConfig().theme.colors.slate[100],
  },
  tooltipBodyColor: {
    light: tailwindConfig().theme.colors.slate[800],
    dark: tailwindConfig().theme.colors.slate[100],
  },
  tooltipBgColor: {
    light: tailwindConfig().theme.colors.white,
    dark: tailwindConfig().theme.colors.slate[700],
  },
  tooltipBorderColor: {
    light: tailwindConfig().theme.colors.slate[200],
    dark: tailwindConfig().theme.colors.slate[600],
  },
  chartAreaBg: {
    light: tailwindConfig().theme.colors.slate[50],
    dark: `rgba(${hexToRGB(tailwindConfig().theme.colors.slate[900])}, 0.24)`,
  },
};
