import React, { memo } from "react";
import PropTypes from "prop-types";
import { Switch } from "react-router-dom";
import withStyles from "@mui/styles/withStyles";
import Dashboard from "./dashboard/Dashboard";
import Posts from "./posts/Posts";
import Subscription from "./subscription/Subscription";
import PropsRoute from "../../shared/components/PropsRoute";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";
import ExpectedVehicles from "./ExpectedVehicles/ExpectedVehicles";
import SignIn from "SignIn/SignIn";
import SignUp from "Signup/Signup";
import ReceivedVehicles from "./ReceivedVehicles/ReceivedVehicles";
import CustomerOrderForm from "./CustomerOrderForm/CustomerOrderForm";
import CustomerOrders from "./CustomerOrderForm/CustomerOrders";
import { Route } from "react-router-dom";
import CustomerOrdersInvoice from "pages/Invoice/CustomersOrdersInvoice";
import CustomerOrdersJobInstruction from "./JobInstruction/CustomerOrdersJobInstruction";
import Invoice from "./Invoice/Invoice";
import JobInstruction from "./JobInstruction/JobInstruction";
// import CustomerOrdersEstimation from "./Estimation/CustomerOrdersEstimation";
import Estimation from "./Estimation/Estimation";
import CustomerOrdersEstimation from "./Estimation/CustomerOrdersEstimation";
import CustomerOrdersQuestionnaire from "./Questionnaire/CustomerOrdersQuestionnaire";
import Questionnaire from "./Questionnaire/Questionnaire";

const styles = (theme) => ({
    wrapper: {
        margin: theme.spacing(1),
        width: "auto",
        [theme.breakpoints.up("xs")]: {
            width: "95%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        [theme.breakpoints.up("sm")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("md")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "82.5%",
            marginLeft: "auto",
            marginRight: "auto",
        },
        [theme.breakpoints.up("lg")]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            width: "70%",
            marginLeft: "auto",
            marginRight: "auto",
        },
    },
});

function Routing(props) {
    const {
        classes,
        EmojiTextArea,
        ImageCropper,
        Dropzone,
        DateTimePicker,
        pushMessageToSnackbar,
        posts,
        transactions,
        toggleAccountActivation,
        CardChart,
        statistics,
        targets,
        setTargets,
        setPosts,
        isAccountActivated,
        selectDashboard,
        selectPosts,
        selectSubscription,
        openAddBalanceDialog,
    } = props;
    useLocationBlocker();
    return (
        <div className={classes.wrapper}>
            <Switch>
                <PropsRoute
                    path="/c/posts"
                    component={Posts}
                    EmojiTextArea={EmojiTextArea}
                    ImageCropper={ImageCropper}
                    Dropzone={Dropzone}
                    DateTimePicker={DateTimePicker}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    posts={posts}
                    setPosts={setPosts}
                    selectPosts={selectPosts}
                />
                <PropsRoute
                    path="/c/subscription"
                    component={Subscription}
                    transactions={transactions}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    selectSubscription={selectSubscription}
                    openAddBalanceDialog={openAddBalanceDialog}
                />
                <PropsRoute
                    path="/expected-vehicles"
                    component={ExpectedVehicles}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/received-vehicles"
                    component={ReceivedVehicles}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/estimations"
                    component={CustomerOrdersEstimation}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/estimation/:formId"
                    component={Estimation}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/invoices"
                    component={CustomerOrdersInvoice}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/invoice/:formId"
                    component={Invoice}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/job-instructions"
                    component={CustomerOrdersJobInstruction}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/job-instruction/:formId"
                    component={JobInstruction}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/questionnaires"
                    component={CustomerOrdersQuestionnaire}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/questionnaire/:formId"
                    component={Questionnaire}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/customer-orders"
                    component={CustomerOrders}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path="/customer-order/:formId"
                    component={CustomerOrderForm}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />

                <Route
                    path="/signin"
                    component={SignIn}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <Route
                    path="/signup"
                    component={SignUp}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
                <PropsRoute
                    path=""
                    component={Dashboard}
                    toggleAccountActivation={toggleAccountActivation}
                    pushMessageToSnackbar={pushMessageToSnackbar}
                    CardChart={CardChart}
                    statistics={statistics}
                    targets={targets}
                    setTargets={setTargets}
                    isAccountActivated={isAccountActivated}
                    selectDashboard={selectDashboard}
                />
            </Switch>
        </div>
    );
}

Routing.propTypes = {
    classes: PropTypes.object.isRequired,
    EmojiTextArea: PropTypes.elementType,
    ImageCropper: PropTypes.elementType,
    Dropzone: PropTypes.elementType,
    DateTimePicker: PropTypes.elementType,
    pushMessageToSnackbar: PropTypes.func,
    setTargets: PropTypes.func.isRequired,
    setPosts: PropTypes.func.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleAccountActivation: PropTypes.func,
    CardChart: PropTypes.elementType,
    statistics: PropTypes.object.isRequired,
    targets: PropTypes.arrayOf(PropTypes.object).isRequired,
    isAccountActivated: PropTypes.bool.isRequired,
    selectDashboard: PropTypes.func.isRequired,
    selectPosts: PropTypes.func.isRequired,
    selectSubscription: PropTypes.func.isRequired,
    openAddBalanceDialog: PropTypes.func.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Routing));
