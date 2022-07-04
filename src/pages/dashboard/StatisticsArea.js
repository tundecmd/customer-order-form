import React from "react";
import PropTypes from "prop-types";
import { Grid, AccordionDetails, Button, Box } from "@mui/material";

import withTheme from '@mui/styles/withTheme';

const styles = (theme) => ({
  numberInput: {
    width: 110,
  },
  numberInputInput: {
    padding: "9px 34px 9px 14.5px",
  },
  dBlock: { display: "block" },
  listItemLeftPadding: {
    paddingRight: theme.spacing(3),
  },
  accordionDetails: {
    paddintTop: theme.spacing(0),
    display: "flex",
    justifyContent: "flex-end",
  },
});

function StatisticsArea(props) {
  const { theme, CardChart, data, classes } = props;
  return (
    CardChart &&
    data.profit.length >= 2 &&
    data.views.length >= 2 && (
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardChart
            data={data.profit}
            color={theme.palette.secondary.light}
            height="70px"
            title="Profit"
          />
          <AccordionDetails>
          <Box mr={1}>
            <Button
              // onClick={onSetDefault}
              // disabled={isSaveLoading || isDefaultLoading}
            >
              {/* Default {isDefaultLoading && <ButtonCircularProgress />} */}
              Default
            </Button>
          </Box>
          {/* <Button
            variant="contained"
            color="secondary"
            disabled={isSaveLoading || isDefaultLoading}
            onClick={onSubmit}
          >
            Save {isSaveLoading && <ButtonCircularProgress />}
            Save
          </Button> */}
          </AccordionDetails>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardChart
            data={data.views}
            color={theme.palette.primary.light}
            height="70px"
            title="Views"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardChart
            data={data.views}
            color={theme.palette.primary.light}
            height="70px"
            title="Received Vehicles"
          />
        </Grid>
      </Grid>
    )
  );
}

StatisticsArea.propTypes = {
  theme: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  CardChart: PropTypes.elementType
};

export default withTheme(StatisticsArea);
