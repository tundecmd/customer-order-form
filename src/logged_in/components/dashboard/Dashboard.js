import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, Grid } from "@mui/material";
import DashboardCard from "shared/components/DashboardCard";
import StatisticsArea from "./StatisticsArea";
import { useSelector } from "react-redux";
import SignIn from "SignIn/SignIn";
// import SettingsArea from "./SettingsArea";
// import UserDataArea from "./UserDataArea";
// import AccountInformationArea from "./AccountInformationArea";
// import StatisticsArea from "./StatisticsArea";
// import DashboardCard from "../../../shared/components/DashboardCard";

function Dashboard(props) {
  const {
    selectDashboard,
    CardChart,
    statistics
  } = props;

  useEffect(selectDashboard, [selectDashboard]);
  const auth = useSelector(state => state.auth);

  console.log('targets::>')

  return (
    <Fragment>
      <Fragment>
        
      {/* <StatisticsArea CardChart={CardChart} data={statistics} /> */}
      {/* <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Your Account
        </Typography>
      </Box>
      <AccountInformationArea
        isAccountActivated={isAccountActivated}
        toggleAccountActivation={toggleAccountActivation}
      />
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Settings
        </Typography>
      </Box> */}
      {/* <SettingsArea pushMessageToSnackbar={pushMessageToSnackbar} /> */}
      {
        auth.authenticate === true ? 

        <Grid container spacing={1}> 
        <Grid item xs={12} md={6}>
          <DashboardCard
            title="Expected Vehicles"
            numberOfVehicles={2}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardCard 
            title="Checked-In Vehicles"
            numberOfVehicles={2}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <DashboardCard 
            title="Received Vehicles"
            numberOfVehicles={2}
          />
        </Grid>
      </Grid>

        : 

        <SignIn />
      }
      


      {/* <UserDataArea
        pushMessageToSnackbar={pushMessageToSnackbar}
        targets={targets}
        setTargets={setTargets}
      /> */}
      </Fragment>
    </Fragment>
  );
}

Dashboard.propTypes = {
  // CardChart: PropTypes.elementType,
  // statistics: PropTypes.object.isRequired,
  // toggleAccountActivation: PropTypes.func,
  // pushMessageToSnackbar: PropTypes.func,
  // targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  // setTargets: PropTypes.func.isRequired,
  // isAccountActivated: PropTypes.bool.isRequired,
  // selectDashboard: PropTypes.func.isRequired,
  // numberOfVehicles: PropTypes.number
};

export default Dashboard;
