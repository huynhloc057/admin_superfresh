import { userConstants } from "./constant";
import axios from "../helpers/axios";

export const getAllUsers = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_ALL_USER_REQUEST });
    const res = await axios.get(`/user/getUsers`);
    if (res.status === 200) {
      const users = res.data;
      dispatch({ type: userConstants.GET_ALL_USER_SUCCESS, payload: users });
    } else {
      dispatch({
        type: userConstants.GET_ALL_USER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getAllDisabledUsers = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_ALL_USER_DISABLED_REQUEST });
    const res = await axios.get(`/user/getDisable`);
    if (res.status === 200) {
      const users = res.data;
      dispatch({
        type: userConstants.GET_ALL_USER_DISABLED_SUCCESS,
        payload: users,
      });
    } else {
      dispatch({
        type: userConstants.GET_ALL_USER_DISABLED_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const activeUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.UN_DELETE_USER_REQUEST });
    const res = await axios.post(`/user/enabled`, user);
    if (res.status === 202) {
      dispatch({
        type: userConstants.UN_DELETE_USER_SUCCESS,
      });
    } else {
      dispatch({
        type: userConstants.UN_DELETE_USER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const disabledUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    const res = await axios.post(`/user/disabled`, user);
    if (res.status === 202) {
      dispatch({
        type: userConstants.DELETE_USER_SUCCESS,
      });
    } else {
      dispatch({
        type: userConstants.DELETE_USER_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
