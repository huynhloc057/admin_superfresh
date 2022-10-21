import { orderConstants } from "./constant";
import axios from "../helpers/axios";

export const updateOrderStatus = (payload) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST });

      const res = await axios.post(`/order/updateType`, payload);
      if (res.status === 202) {
        dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS });
        dispatch(getCustomerOrders());
      } else {
        dispatch({
          type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCustomerOrders = () => {
  return async (dispatch) => {
    dispatch({ type: orderConstants.GET_ALL_ORDERS_REQUEST });
    try {
      const res = await axios.post("/order/getCustomerOrders");
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: orderConstants.GET_ALL_ORDERS_SUCCESS,
          payload: { orders },
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: orderConstants.GET_ALL_ORDERS_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
