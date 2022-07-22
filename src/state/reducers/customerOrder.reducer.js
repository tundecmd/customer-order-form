import { customerOrderConstants } from "../actions/constants";

const initState = {
    loading: false,
    error: null,
    message: "",
    customerOrder: {},
    customerOrderList: [],
};

export const customerOrderReducer = (state = initState, action) => {
    switch (action.type) {
        case customerOrderConstants.GET_CUSTOMER_ORDER_LIST_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });

        case customerOrderConstants.GET_CUSTOMER_ORDER_LIST_SUCCESS:
            // console.log('2 action', action)
            return (state = {
                ...state,
                loading: false,
                customerOrderList: action.payload.customerOrderList,
            });

        case customerOrderConstants.GET_CUSTOMER_ORDER_LIST_FAILURE:
            return (state = {
                ...state,
                loading: false,
                error: action.payload.error,
            });

        case customerOrderConstants.GET_CUSTOMER_ORDER_BY_ID_LIST_REQUEST:
            return (state = {
                ...state,
                loading: true,
            });

        case customerOrderConstants.GET_CUSTOMER_ORDER_BY_ID_LIST_SUCCESS:
            // console.log('action.payload.customerOrder', action.payload.customerOrder)
            return (state = {
                ...state,
                loading: false,
                customerOrder: action.payload.customerOrder,
            });

        case customerOrderConstants.GET_CUSTOMER_ORDER_BY_ID_LIST_FAILURE:
            return (state = {
                ...state,
                loading: false,
                error: action.payload.error,
            });

        default:
            return state;
    }
};
