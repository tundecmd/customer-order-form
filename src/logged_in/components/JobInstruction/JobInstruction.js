import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Card, Grid, Accordion, AccordionSummary, Divider, FormControlLabel } from "@mui/material";
// import DashboardCard from "shared/components/DashboardCard";
// import StatisticsArea from "./StatisticsArea";
// import UserDataArea from "../dashboard/UserDataArea";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";

import Checkbox from 'rc-checkbox';
import { getCustomerOrder } from "actions";
import { getCustomerOrderById } from "actions";
import Select from 'react-select';
import { updateCustomerOrder } from "actions";
import { customerOrderReducer } from "reducers/customerOrder.reducer";
import "../../../SignIn/SignIn.css";
// import SettingsArea from "./SettingsArea";
// import UserDataArea from "./UserDataArea";
// import AccountInformationArea from "./AccountInformationArea";
// import StatisticsArea from "./StatisticsArea";
// import DashboardCard from "../../../shared/components/DashboardCard";




const receptionTypeOptions = [
    { value: 'Customer Bring-In', label: 'Customer Bring-In' },
    { value: 'Dealer Pick-Up', label: 'Dealer Pick-Up' }
];
const courtesyVehicleOptions = [
    { value: 'Need', label: 'Need' },
    { value: 'No Need', label: 'No Need' }
];
const deliveryTypeOptions = [
    { value: 'Customer Come-In', label: 'Customer Come-In' },
    { value: 'Dealer Delivery', label: 'Dealer Delivery' }
];

const vehicleDrivenByOptions = [
    { value: 'Owner', label: 'Owner' },
    { value: 'Family', label: 'Family' },
    { value: 'Other', label: 'Other' }
];

function JobInstruction(props) {
  const {
    selectDashboard,
    classes,
    CardChart,
    statistics,
    pushMessageToSnackbar,
    targets,
    setTargets
  } = props;

  useEffect(() => {
    const { formId } = props.match.params;

    dispatch(getCustomerOrder())
    dispatch(getCustomerOrderById(formId))
  }, [])

  
  let filteredCustomerOrder;
  
//   useEffect(() => {
//     const { productId } = props.match.params;
//     console.log(props);
//     const payload = {
//       params: {
//         productId
//       }
//     }
//     dispatch(getProductDetailsById(payload));
//   }, []);

  console.log('props', props)
  const { formId } = props.match.params;
  const dispatch = useDispatch();
  const customerOrderList = useSelector(state => state.customerOrder.customerOrderList);
 

    filteredCustomerOrder = customerOrderList.find((customerOrder, index) => {
        return formId === customerOrder.No;
    });
    // useEffect(() => {
    //     filteredCustomerOrder = customerOrderList.find((customerOrder, index) => {
    //         return formId === customerOrder.No;
    //     });
    //     setCustomerOrder(customerOrder);
    // }, [])
    
    console.log('filteredCustomerOrder', filteredCustomerOrder)
    const state = useSelector(state => state);
    const [customerOrder, setCustomerOrder] = useState(filteredCustomerOrder);
    useEffect(() => {
        async function aa(params) {
            const { formId } = props.match.params;
    
            dispatch(getCustomerOrder())
            const a = await dispatch(getCustomerOrderById(formId))
            console.log('a', a);
            
            console.log('state', state)
            setCustomerOrder(state.customerOrder.customerOrder)
        }
        aa()
        // abc()
      }, []);
    

  const [No, setNo] = useState();
  const [Reception_Date, setReception_Date] = useState("");
  const [Reception_Time, setReception_Time] = useState("");
  const [Staff_Name, setStaff_Name] = useState("");


  useEffect(selectDashboard, [selectDashboard]);

const [Service_History, setService_History] = useState(customerOrder && customerOrder.Service_History);

console.log('customerOrder', customerOrder)
  const [form, setForm] = useState({
    No: customerOrder ? customerOrder.No : "",
    Reception_Date: customerOrder ? customerOrder.Reception_Date : "",
    Reception_Time: customerOrder ? customerOrder.Reception_Time : "",
    Customer_Name: customerOrder ? customerOrder.Customer_Name : "",
    Telephone_No: customerOrder ? customerOrder.Telephone_No : "",
    Address: customerOrder ? customerOrder.Address : "",
    Key_Assigned_No: customerOrder ? customerOrder.Key_Assigned_No : "",
    Vehicle_Registration_No: customerOrder ? customerOrder.Vehicle_Registration_No : "",
    Vehicle_Registered_Date: customerOrder ? customerOrder.Vehicle_Registration_Date : "",
    Model_Year: customerOrder ? customerOrder.Model_Year : "",
    Model_Name: customerOrder ? customerOrder.Model_Name : "",
    Odometer_At_Appointment: customerOrder ? customerOrder.Odometer_At_Appointment : "",
    Frame_No_VIN: customerOrder ? customerOrder.Frame_No_VIN : "",
    Available_Time_From: customerOrder ? customerOrder.Available_Time_From : "",
    Available_Time_To: customerOrder ? customerOrder.Available_Time_To : "",
    Engine_No: customerOrder ? customerOrder.Engine_No : "",
    // Vehicle_Driven_By: customerOrder ? customerOrder.Vehicle_Driven_By : "",
    Service_History: customerOrder ? customerOrder.Service_History : false,
    Job_Type2: customerOrder ? customerOrder.Job_Type2 : false,
    Job_Start_Date: customerOrder ? customerOrder.Job_Start_Date : "",
    Job_Start_Time: customerOrder ? customerOrder.Job_Start_Time : "",
    
  });

  const onUpdateField = e => {
    const field = e.target.name;
    const nextFormState = {
        ...form,
        [field]: e.target.value,
    };
    setForm(nextFormState);
    console.log('form', form)
  };

    const onSubmitForm = e => {
        e.preventDefault();
        // const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        // if (!isValid) return;
        console.log('form', form)
        dispatch(updateCustomerOrder(form.No, form));
        // alert(JSON.stringify(form, null, 2));
    };

  return (
    <Fragment>
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
            <Card>
      <Box width="100%" px={2} py={2} sx={{ backgroundColor: "#fff" }}>
      <Typography
        variant="h5"
        // className={classes.brandText}
        display="inline"
        color="primary"
      >
        Job Instruction
      </Typography>
      </Box>
      </Card>
      <Divider />
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Customer Information</Typography>
                        </AccordionSummary>
                        <form className='form' onSubmit={onSubmitForm}>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Customer Order Form No</label>
                                <input type="text" name="No" value={form.No} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Customer Name</label>
                                <input type="text" name="Customer_Name" value={form.Customer_Name} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Date</label>
                                <input type="date" name="Date" value={form.Date} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Address</label>
                                <textarea rows={4} name="Address" type="text" value={form.Address} onChange={onUpdateField} className='formField'></textarea>
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Email</label>
                                <input type="text" name="Email" className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Telephone No</label>
                                <input type="text" name="Telephone_No" value={form.Telephone_No} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Key Assigned No</label>
                                <input type="text" name="Key_Assigned_No" value={form.Key_Assigned_No} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Company Name</label>
                                <input type="text" name="Company_Name" value={form.Company_Name} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">SA</label>
                                <input type="text" name="SA" value={form.SA} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Staff Name</label>
                                <input type="text" name="Company_Name" className='formField' />
                            </div>    
                            <button type='submit' className='formSubmitBtn'>
                                Submit
                            </button>
                        </form>
                    </Accordion>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Vehicle Infomation</Typography>
                        </AccordionSummary>
                        <form className='form' onSubmit={onSubmitForm}>
                        <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Model Name</label>
                                <input type="text" name="Model_Name" value={form.Model_Name} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">VIN</label>
                                <input type="text" name="Frame_No_VIN" value={form.Frame_No_VIN} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Model No</label>
                                <input type="text" name="Model_No" value={form.Model_No} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Company Name</label>
                                <input type="text" name="Company_Name" value={form.Company_Name} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Vehicle Registration No</label>
                                <input type="text" name="Vehicle_Registration_No" value={form.Vehicle_Registration_No} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Vehicle Registration Date</label>
                                <input type="date" name="Vehicle_Registration_Date" value={form.Vehicle_Registration_Date} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Estimated Completion Date</label>
                                <input type="date" name="Vehicle_Registration_Date" value={form.Vehicle_Registration_Date} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Estimated Completion Time</label>
                                <input type="date" name="Vehicle_Registration_Date" value={form.Vehicle_Registration_Date} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Delivery Date</label>
                                <input type="date" name="Vehicle_Registration_Date" className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Delivery Time</label>
                                <input type="date" name="Vehicle_Registration_Date" className='formField' />
                            </div>
                            <button type='submit' className='formSubmitBtn'>
                                Submit
                            </button>
                        </form>
                    </Accordion>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Job Details</Typography>
                        </AccordionSummary>
                        <form className='form' onSubmit={onSubmitForm}>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Completion Changed Date</label>
                                <input type="date" name="Vehicle_Registration_Date" value={form.Vehicle_Registration_Date} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Completion Changed Time</label>
                                <input type="date" name="Vehicle_Registration_Date" value={form.Vehicle_Registration_Date} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Delivery Changed Date</label>
                                <input type="date" name="Vehicle_Registration_Date" className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Delivery Changed Time</label>
                                <input type="date" name="Vehicle_Registration_Date" className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Staff Name</label>
                                <input type="text" name="Staff_Name" value={form.Staff_Name} onChange={onUpdateField} className='formField' />
                            </div>
                            <button type='submit' className='formSubmitBtn'>
                                Submit
                            </button>
                        </form>
                    </Accordion>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Job Time</Typography>
                        </AccordionSummary>
                        <form className='form' onSubmit={onSubmitForm}>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Job Start Date</label>
                                <input type="date" name="Job_Start_Date" value={form.Job_Start_Date} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Job Start Time</label>
                                <input type="time" name="Job_Start_Time" value={form.Job_Start_Time} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Job Completion Date</label>
                                <input type="date" name="" className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Job Completion Time</label>
                                <input type="time" name="" className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Technician Name</label>
                                <input type="text" name="Technician_Name" value={form.Technician_Name} onChange={onUpdateField} className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Quality Control Staff Name</label>
                                <input type="text" name="" className='formField' />
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Other Findings / Advice</label>
                                <textarea rows={4} name="Other_Findings_Advice" type="text" value={form.Other_Findings_Advice} onChange={onUpdateField} className='formField'></textarea>
                            </div>
                            <div className="formGroup">
                                <label htmlFor="label" className="formLabel">Memo</label>
                                <textarea rows={4} name="Memo" type="text" value={form.Memo} onChange={onUpdateField} className='formField'></textarea>
                            </div>
                            <button type='submit' className='formSubmitBtn'>
                                Submit
                            </button>
                        </form>
                    </Accordion>
                </Box>
            </Grid>
        </Grid>
    </Fragment>
  );
}

JobInstruction.propTypes = {
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

export default JobInstruction;