import {
    customerOrderConstants,
    partsStockConfirmationConstants,
} from "./constants";
import axiosInstance from "utils/axios";
import React, { useEffect, useState } from "react";

export const getPartsStockConfirmationById = (orderFormId) => {
    // console.log('orderFormId', orderFormId)
    return async (dispatch) => {
        // console.log('a1')
        dispatch({
            type: partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_BY_ID_REQUEST,
        });
        // console.log("12345")
        const res = await axiosInstance.get(
            `/parts-stock-confirmation/${orderFormId}`
        );
        // console.log("56789")
        // console.log('res.data', res.data);
        if (res.status === 200) {
            const value = res.data;
            dispatch({
                type: partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_BY_ID_SUCCESS,
                payload: {
                    customerOrder: res.data,
                },
            });
        } else {
            if (res.status === 400) {
                dispatch({
                    type: partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_LIST_FAILURE,
                    payload: {
                        message: res.data.error,
                    },
                });
            }
        }
    };
};

export const getPartsStockConfirmation = () => {
    return async (dispatch) => {
        dispatch({
            type: partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_LIST_REQUEST,
        });
        const res = await axiosInstance.get(`/parts-stock-confirmation`);

        if (res.status === 200) {
            const value = res.data;
            dispatch({
                type: partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_LIST_SUCCESS,
                payload: {
                    partsStockList: value.value,
                },
            });
        } else {
            if (res.status === 400) {
                dispatch({
                    type: partsStockConfirmationConstants.GET_PARTS_STOCK_CONFIRMATION_LIST_FAILURE,
                    payload: {
                        message: res.data.error,
                    },
                });
            }
        }
    };
};

export const updateCustomerOrder = (orderFormId, payload) => {
    // console.log('orderFormId', orderFormId)
    // console.log('payload', payload)

    return async (dispatch) => {
        dispatch({
            type: customerOrderConstants.UPDATE_CUSTOMER_ORDER_STAGE_REQUEST,
        });
        try {
            const res = await axiosInstance.put(
                `/customer-order-form/${orderFormId}`,
                payload
            );
            // console.log('res.status', res.status)
            if (res.status === 200) {
                dispatch({
                    type: customerOrderConstants.GET_CUSTOMER_ORDER_BY_ID_LIST_SUCCESS,
                    payload: {
                        message: res.data,
                    },
                });
                dispatch(getPartsStockConfirmationById(orderFormId));
                dispatch(dispatch(getPartsStockConfirmation()));
            } else {
                const { error } = res.data;
                dispatch({
                    type: customerOrderConstants.UPDATE_CUSTOMER_ORDER_STAGE_FAILURE,
                    payload: { error },
                });
            }
        } catch (error) {
            console.log("error", error);
        }
    };
};
