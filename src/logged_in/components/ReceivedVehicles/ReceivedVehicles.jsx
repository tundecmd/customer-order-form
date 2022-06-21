import React, { Fragment, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, Grid, DialogContent, Dialog, IconButton, Button } from "@mui/material";
// import SettingsArea from "./SettingsArea";
// import UserDataArea from "./UserDataArea";
// import AccountInformationArea from "./AccountInformationArea";
// import StatisticsArea from "./StatisticsArea";
import DashboardCard from "../../../shared/components/DashboardCard";
import DataTable from "./DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrder, updateCustomerOrder } from "../../../actions";
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FirstTab from "./RecieveVehicleDialog";
import ColorfulChip from "shared/components/ColorfulChip";
import theme from "theme";

function ReceivedVehicles(props) {
  const {
    selectDashboard,
    CardChart,
    statistics,
    toggleAccountActivation,
    pushMessageToSnackbar,
    targets,
    setTargets,
    isAccountActivated,
    classes
  } = props;


  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [customerOrder, setCustomerOrder] = useState({});

  const handleOpenReceivedVehicleModal = useCallback((rowData) => {
    console.log('rowData', rowData)
    setCustomerOrder(rowData);
    setOpenFirstModal(true);
    console.log('customerOrder', customerOrder)
}, [setOpenFirstModal]);

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

    function FilterVehiclesCheckedInToday() {
      const customerOrdersExpectedToday = customerOrderList.filter((customerOrder) => {
      return (customerOrder.Reception_Date === dateParser() && customerOrder.Checked_In === true && customerOrder.Received_In === false);
      });
      return customerOrdersExpectedToday;
    }
    const VehiclesCheckedInToday = FilterVehiclesCheckedInToday();
    console.log('VehiclesCheckedInToday', VehiclesCheckedInToday)

    function FilterVehiclesReceivedToday() {
      const customerOrdersExpectedToday = targets.filter((customerOrder) => {
        return (customerOrder.Reception_Date === dateParser() && customerOrder.Checked_In === true && customerOrder.Received_In === true);
      });
      return customerOrdersExpectedToday;
    }
    const VehiclesReceivedInToday = FilterVehiclesReceivedToday();
    console.log('VehiclesReceivedInToday', VehiclesReceivedInToday);

  

  useEffect(() => {
    dispatch(getCustomerOrder());  
    FilterVehiclesCheckedInToday() 
}, [state && state.customerOrder && state.customerOrder.customerOrder && state.customerOrder.customerOrder.Checked_In])

//   console.log('targets::>', targets);

const [selectedOption, setSelectedOption] = useState("");
const [openOtherDetails1, setOpenOtherDetails1] = useState(false);
const [openOtherDetails2, setOpenOtherDetails2] = useState(false);

const receiveVehicle = () => {

  setOpenFirstModal(false);
  setOpenOtherDetails1(true);

};

const onReceivedVehicle = () => {
  setOpenFirstModal(false);
  setOpenOtherDetails1(true);
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

let handleReceiveVehicleSubmitCallBack = (modelObject) => {      
  const formObject = {
    ...modelObject,
    Received_In: true
  };

  dispatch(updateCustomerOrder(customerOrder.No, formObject)); 
    
  if (dispatch(updateCustomerOrder(customerOrder.No, formObject))) {
    
    setOpenFirstModal(false);

    setOpenOtherDetails1(false)
  }
};

  return (
    <Fragment>
        <DataTable
          pushMessageToSnackbar={pushMessageToSnackbar}
          targets={VehiclesCheckedInToday}
          title="Checked-In Vehicles"
          setTargets={setTargets}
          selectRowCheckedIn={handleOpenReceivedVehicleModal}
          selectRowReceivedIn={handleOpenReceivedVehicleModal}
          customerOrder={customerOrder}
          emptyLineNotification="No Vehicle(s) is/are expected today"
        />

        {/* Beginning of first dialog */}
                        
                          <Dialog
                            fullWidth
                            fullScreen
                            maxWidth="lg"
                            open={openFirstModal}
                            onClose={() => setOpenFirstModal(false)}
                            aria-labelledby="responsive-dialog-title"
                            sx={{ borderRadius: "1px", display: "flex", justifyContent: "center"}}
                            // scroll="body"
                          >
                            <DialogContent>
                              
                            <Grid height="100%" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ p: 5 }}>
                                <Grid item xs={6} p={2}>
                                  Appointment Details
                                </Grid>
                                <Grid item xs={6} p={0} m={0}>
                                <ColorfulChip label={`${customerOrder.Stage}`} color={theme.palette.secondary.main} />
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography pb={1} sx={{ fontSize: 14 }} >Car Details</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>VIN Number</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Model Number</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Model Name</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Engine Number</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Vehicles Reg No.</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Previous Services</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Service History</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>{ customerOrder.Frame_No_VIN }</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>{ customerOrder.Model_Number }</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>{ customerOrder.Model_Name }</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>{ customerOrder.Engine_No }</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>MUS657GT</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}></Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>KJA 111 KJ</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography pb={1} sx={{ fontSize: 14 }} >Customer  Details</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Name</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Email</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Address</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Phone Number</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                <Typography pb={1} sx={{ fontSize: 14 }}>1234544553</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}></Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}></Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}></Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography pb={1} sx={{ fontSize: 14 }} >Appintment Details</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Service Type</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Appointment Date</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Appointment Time</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Check In Time</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>Checked In By</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>General Workshop</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>2022-03-03</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>09:32:40.157</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>14:03:38</Typography>
                                  <Typography pb={1} sx={{ fontSize: 14 }}>seun@gmail.com</Typography>
                                </Grid> 
                                {/* <Grid item xs={6}></Grid> */}
                                <Grid item xs={12} display="flex" justifyContent="center">
                                  {
                                     customerOrder.Received_In === false
                                     ?
                                     <Button onClick={receiveVehicle} variant="contained" size="medium">
                                     Receive Vehicle
                                   </Button>
                                   : 
                                   <Button onClick={onReceivedVehicle} variant="contained" size="medium">
                                     Receive Vehicle
                                   </Button>
                                  }
                                </Grid>
                              </Grid>                       
                            </DialogContent>
                          </Dialog>

        {/* End of first dialog */}

        {/* Beginning of second Dialog */}

                            <Dialog
                              fullWidth={true}
                              fullScreen
                              maxWidth="lg"
                              open={openOtherDetails1}
                              onClose={() => setOpenOtherDetails1(false)}
                              aria-labelledby="responsive-dialog-title"
                            >
                            <DialogContent>
                            
                            {/* <FullWidthTabs /> */}
                            <FirstTab 
                              customerOrder={customerOrder} 
                              openOtherDetails1={openOtherDetails1} 
                              setOpenOtherDetails1={setOpenOtherDetails1} 
                              receiveVehicleSubmitParentCallBack={handleReceiveVehicleSubmitCallBack}
                            />
                            </DialogContent>
                          </Dialog>

        {/* End of second Dialog */}
    </Fragment>
  );
}

ReceivedVehicles.propTypes = {
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired,
};

export default ReceivedVehicles;