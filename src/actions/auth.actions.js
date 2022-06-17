import { authConstants, userConstants } from "./constants";
import axiosInstance from "../utils/axios";

export const signup = user => {
  // console.log(user);
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await axiosInstance.post(`/signup`, {
      ...user
    });
    if (res.status === 201) {
      const message = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: {
          message
        }
      })
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: {
            error: res.data.error
          }
        })
      }
    }
  }
};

export const signin = user => {
  return async (dispatch) => {

    dispatch({ type: authConstants.LOGIN_REQUEST });
    const res = await axiosInstance.post(`/signin`, {
      ...user
    });
    if (res.status === 200) {
      const { token, date } = res.data;
      console.log('token', token)
      console.log('user', user)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token, user
        }
      });
    } else {
        if (res.status === 400) {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: res.data.error
          });
        }
    }

  }
};

export const isUserLoggedIn = () => {
  return async dispatch => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token, user
        }
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          error: "Failed to login"
        }
      });
    }
  }
};

export const Signout = () => {
  return async (dispatch) => {

    dispatch({
      type: authConstants.LOGOUT_REQUEST
    });
    const res = await axiosInstance.post(`/signout`);


   
    // dispatch({ type: cartConstants.RESET_CART })

    if (res.status === 200) {
      localStorage.clear();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      // dispatch({ type: authConstants.LOGOUT_SUCCESS });
      dispatch({
        type: authConstants.LOGOUT_SUCCESS
      });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: {
            error: res.data.error
        }
      })
    }
  }
};