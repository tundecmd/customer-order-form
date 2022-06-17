import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import format from "date-fns/format";
import { Card, CardContent, Typography, IconButton, Menu, MenuItem, Box, Button } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import MoreVertIcon from "@mui/icons-material/MoreVert";

const styles = (theme) => ({
  cardContentInner: {
    marginTop: theme.spacing(-4),
  },
});

function labelFormatter(label) {
  return format(new Date(label * 1000), "MMMM d, p yyyy");
}

function calculateMin(data, yKey, factor) {
  let max = Number.POSITIVE_INFINITY;
  data.forEach((element) => {
    if (max > element[yKey]) {
      max = element[yKey];
    }
  });
  return Math.round(max - max * factor);
}

const itemHeight = 216;
const options = ["1 Week", "1 Month", "6 Months"];

function DashboardCard(props) {
  const { color, data, title, classes, theme, height, numberOfVehicles } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("1 Month");

  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const formatter = useCallback(
    (value) => {
      return [value, title];
    },
    [title]
  );

  const getSubtitle = useCallback(() => {
    switch (selectedOption) {
      case "1 Week":
        return "Last week";
      case "1 Month":
        return "Last month";
      case "6 Months":
        return "Last 6 months";
      default:
        throw new Error("No branch selected in switch-statement");
    }
  }, [selectedOption]);

  const processData = useCallback(() => {
    let seconds;
    switch (selectedOption) {
      case "1 Week":
        seconds = 60 * 60 * 24 * 7;
        break;
      case "1 Month":
        seconds = 60 * 60 * 24 * 31;
        break;
      case "6 Months":
        seconds = 60 * 60 * 24 * 31 * 6;
        break;
      default:
        throw new Error("No branch selected in switch-statement");
    }
    const minSeconds = new Date() / 1000 - seconds;
    const arr = [];
    for (let i = 0; i < data.length; i += 1) {
      if (minSeconds < data[i].timestamp) {
        arr.unshift(data[i]);
      }
    }
    return arr;
  }, [data, selectedOption]);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const selectOption = useCallback(
    (selectedOption) => {
      setSelectedOption(selectedOption);
      handleClose();
    },
    [setSelectedOption, handleClose]
  );

  const isOpen = Boolean(anchorEl);
  return (
    <Card mx={2} sx={{ marginX: 2, marginY: 1 }}>
      <Box mx={2} mb={1} pt={2} px={4}>
        <Box display="flex" justifyContent="center">
          <div>
            <Typography variant="subtitle1">
                {title}
            </Typography>
          </div>
        </Box>
      </Box>
      <CardContent display="flex" justifycontent="center" align="center">
        <Box className={classes.cardContentInner} height={height}>
            <Typography pb={2} pt={2} variant="h1" align="center">
                { numberOfVehicles }
            </Typography>
            <Button mx={2}
            >
              View Details
            </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// CardChart.propTypes = {
//   color: PropTypes.string.isRequired,
//   data: PropTypes.array.isRequired,
//   title: PropTypes.string.isRequired,
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
//   height: PropTypes.string.isRequired,
//   numberOfVehicles: PropTypes.string.isRequired
// };

export default withStyles(styles, { withTheme: true })(DashboardCard);