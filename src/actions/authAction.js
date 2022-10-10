import { authConstants } from "./constant";
import axios from "../helpers/axios";

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstants.LOGIN_REQUEST });
      const res = await axios.post(`/auth/signin`, { ...user });
      if (res.status === 200) {
        const { accessToken, refreshToken, user } = res.data;
        if (user.role === "admin") {
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              accessToken,
              refreshToken,
              user,
            },
          });
        } else {
          dispatch({
            type: authConstants.LOGIN_FAILURE,
            payload: { error: "Username or password is incorrect" },
          });
        }
      }
    } catch (error) {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: error.response.data.error,
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axios.post(`/auth/signout`);
    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
    } else {
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};
