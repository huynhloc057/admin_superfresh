import axios from "../helpers/axios";
import { categoryConstants } from "./constant";
import { deleteProductByCate, enableProductByCate } from "./productAction";

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

export const getAllDisableCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATE_DISABLE_REQUEST });
    const res = await axios.get(`/category/getDisableCategories`);
    if (res.status === 200) {
      const categories = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATE_DISABLE_SUCCESS,
        payload: categories,
      });
    } else {
      dispatch({
        type: categoryConstants.GET_ALL_CATE_DISABLE_FAILURE,
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

export const updateCategory = (_id, name) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORIES_REQUEST });
    try {
      const res = await axios.post(`/category/update`, { _id, name });
      if (res.status === 202) {
        dispatch({
          type: categoryConstants.UPDATE_CATEGORIES_SUCCESS,
        });
      } else {
        dispatch({
          type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const deleteCategory = (_id) => {
  console.log(_id);
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST });
    try {
      const res = await axios.post(`/category/delete`, _id);
      if (res.status === 202) {
        await dispatch({
          type: categoryConstants.DELETE_CATEGORIES_SUCCESS,
        });
        await dispatch(deleteProductByCate(_id));
      } else {
        dispatch({
          type: categoryConstants.DELETE_CATEGORIES_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};

export const enableCategory = (_id) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ENABLE_CATEGORIES_REQUEST });
    try {
      const res = await axios.post(`/category/enable`, _id);
      if (res.status === 202) {
        await dispatch({
          type: categoryConstants.ENABLE_CATEGORIES_SUCCESS,
        });
        await dispatch(enableProductByCate(_id));
      } else {
        dispatch({
          type: categoryConstants.ENABLE_CATEGORIES_FAILURE,
          payload: res.data.error,
        });
      }
    } catch (error) {
      console.log(error.response);
    }
  };
};
