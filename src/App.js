import React, { Fragment, Suspense, lazy, useEffect } from "react";
import {
    ThemeProvider,
    StyledEngineProvider,
    CssBaseline,
} from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "components/Pace";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "state/actions/auth.actions";
import PrivateRoute from "utils/PrivateRoute";
import "./index.css";
import Dashboard from "pages/dashboard/Dashboard";
import { useHistory } from "react-router-dom";

const LoggedInComponent = lazy(() => import("./Main"));

// const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const history = useHistory();

    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn());
        }
    }, [auth.authenticate]);

    useEffect(() => {
        if (auth.authenticate === false) {
            history && history.push("/signin");
        }
    }, [auth.authenticate]);

    return (
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalStyles />
                    <Pace color={theme.palette.primary.light} />
                    <Suspense fallback={<Fragment />}>
                        <Switch>
                            <PrivateRoute>
                                <LoggedInComponent />
                            </PrivateRoute>
                            {/* <Route> 
                <LoggedOutComponent />
              </Route> 
              {/* <Route path="/" exact component={Dashboard} /> */}
                        </Switch>
                    </Suspense>
                </ThemeProvider>
            </StyledEngineProvider>
        </BrowserRouter>
    );
}

export default App;
