import React from "react";
import { Redirect } from "react-router-dom";
// import { Route, Navigate } from "react-router-dom";
import PropsRoute from "components/PropsRoute";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <PropsRoute
            {...rest}
            component={(props) => {
                const token = window.localStorage.getItem("token");
                if (token) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={"/signin"} />;
                }
            }}
        />
    );

    // const token = window.localStorage.getItem('token');
    // return token ? children : <Redirect to={'/signin'} />
};

export default PrivateRoute;
