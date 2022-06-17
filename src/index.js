import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
