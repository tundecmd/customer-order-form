import React, { Fragment, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
    Typography,
    Box,
    Card,
    Grid,
    Accordion,
    AccordionSummary,
    Divider,
    FormControlLabel,
} from "@mui/material";
// import DashboardCard from "shared/components/DashboardCard";
// import StatisticsArea from "./StatisticsArea";
// import UserDataArea from "../dashboard/UserDataArea";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";

import Checkbox from "rc-checkbox";
import {
    getCustomerOrder,
    getCustomerOrderById,
    updateCustomerOrder,
} from "state/actions";
// import { getCustomerOrderById } from "state/actions";
import Select from "react-select";
// import { updateCustomerOrder } from "state/actions";
import { customerOrderReducer } from "state/reducers/customerOrder.reducer";
import "SignIn/SignIn.css";
import { useHistory, Redirect } from "react-router-dom";
// import SettingsArea from "./SettingsArea";
// import UserDataArea from "./UserDataArea";
// import AccountInformationArea from "./AccountInformationArea";
// import StatisticsArea from "./StatisticsArea";
// import DashboardCard from "../../../shared/components/DashboardCard";

const receptionTypeOptions = [
    { value: "Customer Bring-In", label: "Customer Bring-In" },
    { value: "Dealer Pick-Up", label: "Dealer Pick-Up" },
];
const courtesyVehicleOptions = [
    { value: "Need", label: "Need" },
    { value: "No Need", label: "No Need" },
];
const deliveryTypeOptions = [
    { value: "Customer Come-In", label: "Customer Come-In" },
    { value: "Dealer Delivery", label: "Dealer Delivery" },
];

const vehicleDrivenByOptions = [
    { value: "Owner", label: "Owner" },
    { value: "Family", label: "Family" },
    { value: "Other", label: "Other" },
];

const paymentOptions = [
    { value: "Credit Card", label: "Credit Card" },
    { value: "Other", label: "Other" },
];

//   const deliveryTypeOptions = [
//     { value: 'Customer Come-In', label: 'Customer Come-In' },
//     { value: 'Dealer Delivery', label: 'Dealer Delivery' }
// ];

function Estimation(props) {
    const {
        selectDashboard,
        classes,
        CardChart,
        statistics,
        pushMessageToSnackbar,
        targets,
        setTargets,
    } = props;

    useEffect(() => {
        const { formId } = props.match.params;

        dispatch(getCustomerOrder());
        dispatch(getCustomerOrderById(formId));
    }, []);

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

    console.log("props", props);
    const { formId } = props.match.params;
    const dispatch = useDispatch();
    const customerOrderList = useSelector(
        (state) => state.customerOrder.customerOrderList
    );

    filteredCustomerOrder = customerOrderList.find((customerOrder, index) => {
        return formId === customerOrder.No;
    });
    // useEffect(() => {
    //     filteredCustomerOrder = customerOrderList.find((customerOrder, index) => {
    //         return formId === customerOrder.No;
    //     });
    //     setCustomerOrder(customerOrder);
    // }, [])

    console.log("filteredCustomerOrder", filteredCustomerOrder);
    const state = useSelector((state) => state);
    const [customerOrder, setCustomerOrder] = useState(filteredCustomerOrder);
    useEffect(() => {
        async function aa(params) {
            const { formId } = props.match.params;

            dispatch(getCustomerOrder());
            const a = await dispatch(getCustomerOrderById(formId));
            console.log("a", a);

            console.log("state", state);
            setCustomerOrder(state.customerOrder.customerOrder);
        }
        aa();
        // abc()
    }, []);

    const [No, setNo] = useState();
    const [Reception_Date, setReception_Date] = useState("");
    const [Reception_Time, setReception_Time] = useState("");
    const [Staff_Name, setStaff_Name] = useState("");

    useEffect(selectDashboard, [selectDashboard]);

    //   const ReceptionTypeFetched = receptionTypeOptions.filter((receptionType) => {
    //     return customerOrder && (receptionType.label === customerOrder.Reception_Type)
    // });
    // const CourtesyVehicleFetched = courtesyVehicleOptions.filter((CourtesyVehicle) => {
    //     return customerOrder && (CourtesyVehicle.label === customerOrder.Courtesy_Vehicle)
    // });
    const DeliveryTypeFetched = deliveryTypeOptions.filter((DeliveryType) => {
        return (
            customerOrder && DeliveryType.label === customerOrder.Delivery_Type
        );
    });
    const Vehicle_Driven_By_Fetched = vehicleDrivenByOptions.filter(
        (DeliveryType) => {
            return (
                customerOrder &&
                DeliveryType.label === customerOrder.Vehicle_Driven_By
            );
        }
    );

    const PaymentOptionFetched = paymentOptions.filter((paymentOption) => {
        return (
            customerOrder &&
            paymentOption.label === customerOrder.Payment_Method
        );
    });
    const [selectedPayment_Method, setSelectedPayment_Method] = useState(
        customerOrder && PaymentOptionFetched
    );

    //   const DeliveryTypeFetched = deliveryTypeOptions.filter((DeliveryType) => {
    //     return customerOrder && (DeliveryType.label === customerOrder.Delivery_Type)
    // });
    // const [selectedDeliveryType, setSelectedDeliveryType] = useState(customerOrder && DeliveryTypeFetched);

    // console.log('customerOrder', customerOrder);

    // const [selectedReceptionType, setSelectedReceptionType] = useState(customerOrder && ReceptionTypeFetched);
    // const [selectedCourtesyVehicle, setSelectedCourtesyVehicle] = useState(customerOrder && CourtesyVehicleFetched);
    const [selectedDeliveryType, setSelectedDeliveryType] = useState(
        customerOrder && DeliveryTypeFetched
    );
    const [selectedVehicle_Driven_By, setSelectedVehicle_Driven_By] = useState(
        customerOrder && Vehicle_Driven_By_Fetched
    );
    // const [Service_History, setService_History] = useState(customerOrder && customerOrder.Service_History);

    console.log("customerOrder", customerOrder);
    const [form, setForm] = useState({
        No: customerOrder ? customerOrder.No : "",
        Reception_Date: customerOrder ? customerOrder.Reception_Date : "",
        Reception_Time: customerOrder ? customerOrder.Reception_Time : "",
        Customer_Name: customerOrder ? customerOrder.Customer_Name : "",
        Telephone_No: customerOrder ? customerOrder.Telephone_No : "",
        Address: customerOrder ? customerOrder.Address : "",
        // Reception_Type: customerOrder ? selectedReceptionType[0].value : null,
        // Courtesy_Vehicle: customerOrder ? selectedCourtesyVehicle[0].value : null,
        // Delivery_Type: customerOrder ? selectedDeliveryType[0].value : null,
        // Payment_Method: customerOrder ? selectedPayment_Method[0].value : null,
        Vehicle_Registration_No: customerOrder
            ? customerOrder.Vehicle_Registration_No
            : "",
        Vehicle_Registered_Date: customerOrder
            ? customerOrder.Vehicle_Registratered_Date
            : "",
        Model_Year: customerOrder ? customerOrder.Model_Year : "",
        Model_Name: customerOrder ? customerOrder.Model_Name : "",
        Odometer_At_Appointment: customerOrder
            ? customerOrder.Odometer_At_Appointment
            : "",
        Frame_No_VIN: customerOrder ? customerOrder.Frame_No_VIN : "",
        Available_Time_From: customerOrder
            ? customerOrder.Available_Time_From
            : "",
        Available_Time_To: customerOrder ? customerOrder.Available_Time_To : "",
        Engine_No: customerOrder ? customerOrder.Engine_No : "",
        Vehicle_Driven_By: customerOrder ? customerOrder.Vehicle_Driven_By : "",
        SA: customerOrder ? customerOrder.SA : "",
        Service_History: customerOrder ? customerOrder.Service_History : false,
        Job_Type2: customerOrder ? customerOrder.Job_Type2 : false,
    });

    const onUpdateField = (e) => {
        const field = e.target.name;
        const nextFormState = {
            ...form,
            [field]: e.target.value,
        };
        setForm(nextFormState);
        console.log("form", form);
    };

    const onSubmitForm = (e) => {
        e.preventDefault();
        // const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        // if (!isValid) return;
        console.log("form", form);
        dispatch(updateCustomerOrder(form.No, form));
        // alert(JSON.stringify(form, null, 2));
    };

    const history = useHistory();
    // const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCustomerOrderById(form.No));
        console.log("form.No", form.No);
    }, []);

    // useEffect(() => {
    //     const alertUser = e => {
    //         dispatch(getCustomerOrderById(form.No))
    //         e.preventDefault()
    //         e.returnValue = ''
    //         dispatch(getCustomerOrderById(form.No))
    //         dispatch(getCustomerOrder())
    //         history && history.push('/estimations')
    //     }
    //   window.addEventListener('beforeunload', alertUser)
    //   window.addEventListener('unload', handleEndConcert)
    //   return () => {
    //     window.removeEventListener('beforeunload', alertUser)
    //     window.removeEventListener('unload', handleEndConcert)

    //   }

    // }, [])

    // return (

    //     <Prompt
    //       when={isPrompt()}
    //       message={() => 'Are you sure you want to leave this page?'}
    //     />

    // )

    // const history = useHistory()

    let initialRender = useRef(true);
    let orderID = form.No;
    let Order = customerOrder;

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            const ans = window.confirm("Are you sure you want to refresh?");

            history && history.push("/estimations");
        }

        // if (ans) {
        //     history && history.push('/estimations')
        // } else {

        // }
    }, [performance.navigation.type]);

    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        } else {
            const ans = (window.onbeforeunload = function (e) {
                return "Don't leave";
                if (ans) {
                    console.log("llllllllllllkkkkkkkkkjjjjjjjjjjjjjjj");
                    history.push("/estimations");
                    return <Redirect to={`/estimations`} />;
                } else {
                }
            });
        }
    }, []);

    return (
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Card>
                        <Box
                            width="100%"
                            px={2}
                            py={2}
                            sx={{ backgroundColor: "#fff" }}
                        >
                            <Typography
                                variant="h5"
                                // className={classes.brandText}
                                display="inline"
                                color="primary"
                            >
                                Estimation
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
                            <form className="form" onSubmit={onSubmitForm}>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Customer Order Form No
                                    </label>
                                    <input
                                        type="text"
                                        name="No"
                                        value={form.No}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Customer Name
                                    </label>
                                    <input
                                        type="text"
                                        name="Customer_Name"
                                        value={form.Customer_Name}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="Date"
                                        value={form.Date}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Address
                                    </label>
                                    <textarea
                                        rows={4}
                                        name="Address"
                                        type="text"
                                        value={form.Address}
                                        onChange={onUpdateField}
                                        className="formField"
                                    ></textarea>
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Telephone No
                                    </label>
                                    <input
                                        type="text"
                                        name="Telephone_No"
                                        value={form.Telephone_No}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Invoice No
                                    </label>
                                    <input
                                        type="text"
                                        name="Invoice_No"
                                        value={form.Invoice_No}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Company Name
                                    </label>
                                    <input
                                        type="text"
                                        name="Company_Name"
                                        value={form.Company_Name}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        SA
                                    </label>
                                    <input
                                        type="text"
                                        name="SA"
                                        value={form.SA}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>

                                <button type="submit" className="formSubmitBtn">
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
                            <form className="form" onSubmit={onSubmitForm}>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Model Name
                                    </label>
                                    <input
                                        type="text"
                                        name="Model_Name"
                                        value={form.Model_Name}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        VIN
                                    </label>
                                    <input
                                        type="text"
                                        name="Frame_No_VIN"
                                        value={form.Frame_No_VIN}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Vehicle Registration No
                                    </label>
                                    <input
                                        type="text"
                                        name="Vehicle_Registration_No"
                                        value={form.Vehicle_Registration_No}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Vehicle Registered Date
                                    </label>
                                    <input
                                        type="date"
                                        name="Vehicle_Registratered_Date"
                                        value={form.Vehicle_Registratered_Date}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Total Price
                                    </label>
                                    <input
                                        type="text"
                                        name="Total_Price"
                                        value={form.Total_Price}
                                        onChange={onUpdateField}
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Information
                                    </label>
                                    <textarea
                                        rows={4}
                                        name="Information"
                                        type="text"
                                        value={form.Information}
                                        onChange={onUpdateField}
                                        className="formField"
                                    ></textarea>
                                </div>

                                <button type="submit" className="formSubmitBtn">
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
                                <Typography>Delivery Payment</Typography>
                            </AccordionSummary>
                            <form className="form" onSubmit={onSubmitForm}>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Delivery Date
                                    </label>
                                    <input
                                        type="date"
                                        name="Vehicle_Registratered_Date"
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Delivery Time
                                    </label>
                                    <input
                                        type="time"
                                        name="Delivery_Time"
                                        className="formField"
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Payment Method
                                    </label>
                                    <Select
                                        value={selectedPayment_Method}
                                        onChange={(e) =>
                                            setSelectedPayment_Method(e.value)
                                        }
                                        options={paymentOptions}
                                        placeholder=""
                                    />
                                </div>
                                <div className="formGroup">
                                    <label
                                        htmlFor="label"
                                        className="formLabel"
                                    >
                                        Delivery Type
                                    </label>
                                    <Select
                                        value={selectedDeliveryType}
                                        onChange={(e) =>
                                            setSelectedDeliveryType(e.value)
                                        }
                                        options={deliveryTypeOptions}
                                        placeholder=""
                                    />
                                </div>
                                <button type="submit" className="formSubmitBtn">
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

Estimation.propTypes = {
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

export default Estimation;
