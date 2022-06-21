import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, Grid } from "@mui/material";
// import SettingsArea from "./SettingsArea";
// import UserDataArea from "./UserDataArea";
// import AccountInformationArea from "./AccountInformationArea";
// import StatisticsArea from "./StatisticsArea";
import DashboardCard from "../../../shared/components/DashboardCard";
import DataTable from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrder } from "../../../actions";

function CustomerOrdersJobInstruction(props) {
  const {
    selectDashboard,
    CardChart,
    statistics,
    toggleAccountActivation,
    pushMessageToSnackbar,
    targets,
    setTargets,
    isAccountActivated,
    classes,
    title
  } = props;

  useEffect(selectDashboard, [selectDashboard]);
  const customerOrderList = useSelector(state => state.customerOrder.customerOrderList);
  const state = useSelector(state => state);

  const dispatch = useDispatch();

  function dateParserwithArgument (date) {
    let today = new Date(date);
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
  
    today = yyyy + '-' + mm + '-' + dd;
      return today;
  }
  
  function dateParserWithoutArgument () {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
  
    today = yyyy + '-' + mm + '-' + dd;
      return today;
  }
  
  function dateParser (date) {
    return date ? dateParserwithArgument(date) : dateParserWithoutArgument();
  }
  
  function FilterExpectedVehiclesToday() {
    const customerOrdersExpectedToday = customerOrderList.filter((customerOrder) => {
      return (customerOrder.Reception_Date === dateParser() && customerOrder.Checked_In === false);
    });
    return customerOrdersExpectedToday;
  }

  const ExpectedVehiclesToday = FilterExpectedVehiclesToday();
  console.log('ExpectedVehiclesToday', ExpectedVehiclesToday)

  const selectRow = row => {
    console.log('row:>', row);
    
  };
  

  useEffect(() => {
    dispatch(getCustomerOrder());  
    FilterExpectedVehiclesToday();
}, [state && state.customerOrder && state.customerOrder.customerOrder && state.customerOrder.customerOrder.Checked_In])

//   console.log('targets::>', targets);


  return (
    <Fragment>
      <DataTable
        pushMessageToSnackbar={pushMessageToSnackbar}
        targets={ExpectedVehiclesToday}
        title="Job Instruction"
        setTargets={setTargets}
        selectRow={selectRow}
        emptyLineNotification="No Vehicle(s) is/are expected today"
      />
    </Fragment>
  );
}

CustomerOrdersJobInstruction.propTypes = {
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired,
};

export default CustomerOrdersJobInstruction;