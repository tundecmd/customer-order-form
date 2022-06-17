import { userConstants, authConstants } from "../actions/constants";

const initState = {
  token: '',
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: '',
  user: {
    firstName: '',
    lastName: '',
    email: '',
    picture: ''
  }
};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
      case userConstants.USER_REGISTER_REQUEST:
        return state = {
          ...state,
          loading: true
        };

      case userConstants.USER_REGISTER_SUCCESS:
        return state = {
          ...state,
          loading: false,
          message: action.payload.message
        };

      case userConstants.USER_REGISTER_FAILURE:
        return state = {
          ...state,
          loading: false,
          message: action.payload.message
        };

      case authConstants.LOGIN_REQUEST:
          return state = {
            ...state,
            authenticating: true,
          };
        
      case authConstants.LOGIN_SUCCESS:
          return state = {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            authenticate: true,
            authenticating: false
          };
      case authConstants.LOGOUT_REQUEST:
          return state = {
            ...state,
            loading: true
          };
      case authConstants.LOGOUT_SUCCESS:
          return state = {
              ...initState
          };
      case authConstants.LOGOUT_FAILURE:
          return state = {
              ...state,
              error: action.payload.error,
              loading: false
          };
      default:
        return state;
    }
};