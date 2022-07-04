import { partsStockConfirmationConstants } from "../actions/constants";

const initState = {
  authenticate: false,
  loading: false,
  error: null,
  message: '',
  partsStock: {},
  partsStockList: []
};

export const partsStockReducer = (state = initState, action) => {
  switch (action.type) {
    case partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_LIST_REQUEST:
      return state = {
        ...state,
        loading: true
      };

    case partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_LIST_SUCCESS:
      // console.log('2 action', action)
      return state = {
        ...state,
        loading: false,
        partsStockList: action.payload.partsStockList
      };
    
    case partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_LIST_FAILURE:
      return state = {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_BY_ID_REQUEST:
      return state = {
        ...state,
        loading: true,
      };
      
    case partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_BY_ID_SUCCESS:
      return state = {
        ...state,
        loading: false,
        partsStock: action.payload.partsStock
      };

    case partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_BY_ID_FAILURE:
      return state = {
        ...state,
        loading: false,
        error: action.payload.error
      };
  
    default:
      return state;
  }
};
