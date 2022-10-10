import axios from "../helpers/axios";
import { categoryConstants } from "./constant";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const res = await axios.get(`/category/getCategories`);
    if (res.status === 200) {
      const categories = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
        payload: categories,
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getCategoryDetail = (_id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_CATEGORY_BY_ID_REQUEST });
    const res = await axios.post("/category/getCateById", { _id });
    if (res.status === 200) {
      dispatch({
        type: categoryConstants.GET_CATEGORY_BY_ID_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: categoryConstants.GET_CATEGORY_BY_ID_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
    try {
      const res = await axios.post(`/category/add`, form);
      if (res.status === 201) {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          // payload: { category: res.data.category },
        });
      } else {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
