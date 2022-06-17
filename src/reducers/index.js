// import { customerOrderReducer } from "./customerOrder.reducers";
// import { partsStockReducer } from "./partsStockConfirmation.reducers";

import { authReducer } from "./auth.reducers";
import { customerOrderReducer } from "./customerOrder.reducer";

const { combineReducers } = require("redux");
// const { authReducer } = require("./auth.reducer");

const rootReducer = combineReducers({
  auth: authReducer,
  customerOrder: customerOrderReducer,
  // partsStock: partsStockReducer
});

export default rootReducer;