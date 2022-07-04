import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, Grid } from "@mui/material";
import DashboardCard from "components/DashboardCard";
import StatisticsArea from "./StatisticsArea";
import { useSelector, useDispatch } from "react-redux";
import SignIn from "SignIn/SignIn";
import { getCustomerOrder } from "state/actions";
// import SettingsArea from "./SettingsArea";
// import UserDataArea from "./UserDataArea";
// import AccountInformationArea from "./AccountInformationArea";
// import StatisticsArea from "./StatisticsArea";
// import DashboardCard from "../../../shared/components/DashboardCard";

function Dashboard(props) {
    const { selectDashboard, CardChart, statistics } = props;

    useEffect(selectDashboard, [selectDashboard]);
    const auth = useSelector((state) => state.auth);

    console.log("targets::>");

    const customerOrderList = useSelector(
        (state) => state.customerOrder.customerOrderList
    );
    const state = useSelector((state) => state);

    const dispatch = useDispatch();

    function dateParserwithArgument(date) {
        let today = new Date(date);
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        return today;
    }

    function dateParserWithoutArgument() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, "0");
        let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        let yyyy = today.getFullYear();

        today = yyyy + "-" + mm + "-" + dd;
        return today;
    }

    function dateParser(date) {
        return date
            ? dateParserwithArgument(date)
            : dateParserWithoutArgument();
    }

    function FilterExpectedVehiclesToday() {
        const customerOrdersExpectedToday = customerOrderList.filter(
            (customerOrder) => {
                return (
                    customerOrder.Reception_Date === dateParser() &&
                    customerOrder.Checked_In === false
                );
            }
        );
        return customerOrdersExpectedToday;
    }

    const ExpectedVehiclesToday = FilterExpectedVehiclesToday();
    console.log("ExpectedVehiclesToday", ExpectedVehiclesToday);

    function FilterVehiclesCheckedInToday() {
        const customerOrdersExpectedToday = customerOrderList.filter(
            (customerOrder) => {
                return (
                    customerOrder.Reception_Date === dateParser() &&
                    customerOrder.Checked_In === true &&
                    customerOrder.Received_In === false
                );
            }
        );
        return customerOrdersExpectedToday;
    }
    const VehiclesCheckedInToday = FilterVehiclesCheckedInToday();
    console.log("VehiclesCheckedInToday", VehiclesCheckedInToday);

    function FilterVehiclesReceivedToday() {
        const customerOrdersExpectedToday = customerOrderList.filter(
            (customerOrder) => {
                return (
                    customerOrder.Reception_Date === dateParser() &&
                    customerOrder.Checked_In === true &&
                    customerOrder.Received_In === true
                );
            }
        );
        return customerOrdersExpectedToday;
    }
    const VehiclesReceivedInToday = FilterVehiclesReceivedToday();
    console.log("VehiclesReceivedInToday", VehiclesReceivedInToday);

    useEffect(() => {
        dispatch(getCustomerOrder());
        FilterExpectedVehiclesToday();
        FilterVehiclesCheckedInToday();
        FilterVehiclesReceivedToday();
    }, [
        state &&
            state.customerOrder &&
            state.customerOrder.customerOrder &&
            state.customerOrder.customerOrder.Checked_In,
    ]);

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
                {auth.authenticate === true ? (
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={4}>
                            <DashboardCard
                                title="Expected Vehicles"
                                numberOfVehicles={ExpectedVehiclesToday.length}
                                url="expected-vehicles"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DashboardCard
                                title="Checked-In Vehicles"
                                numberOfVehicles={VehiclesCheckedInToday.length}
                                url="received-vehicles"
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <DashboardCard
                                title="Received Vehicles"
                                numberOfVehicles={
                                    VehiclesReceivedInToday.length
                                }
                                url="received-vehicles"
                            />
                        </Grid>
                    </Grid>
                ) : (
                    <SignIn />
                )}

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
