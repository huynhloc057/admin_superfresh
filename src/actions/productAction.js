import axios from "../helpers/axios";
import { productConstants } from "./constant";

export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
    const res = await axios.post(`/product/getProducts`);
    if (res.status === 200) {
      const products = res.data;
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: products,
      });
    } else {
      dispatch({
        type: productConstants.GET_ALL_PRODUCTS_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getProductBySlug = (slug) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.GET_PRODUCT_BY_SLUG_REQUEST });

      const res = await axios.post(`/product/${slug}`);
      if (res.status === 200) {
        const product = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_BY_SLUG_SUCCESS,
          payload: product,
        });
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.GET_PRODUCT_BY_SLUG_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
      const res = await axios.post(`/product/add`, form);
      // console.log(res.status);
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
        //   dispatch(getProducts());
      } else {
        const { error } = res.data;
        dispatch({
          type: productConstants.ADD_PRODUCT_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
