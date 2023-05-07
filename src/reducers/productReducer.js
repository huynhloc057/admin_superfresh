import { productConstants } from "../actions/constant";

const initState = {
  products: [],
  product: {},
  loading: false,
  error: null,
  success: false,
  successDelete: false,
  successEnable: false,
};

export const productReducer = (state = initState, action) => {
  switch (action.type) {
    case productConstants.GET_ALL_PRODUCTS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case productConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        loading: false,
      };
      return state;
    case productConstants.GET_ALL_PRODUCTS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    case productConstants.GET_ALL_PRODUCTS_DISABLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case productConstants.GET_ALL_PRODUCTS_DISABLE_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
        loading: false,
      };
      return state;
    case productConstants.GET_ALL_PRODUCTS_DISABLE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    case productConstants.GET_PRODUCT_BY_SLUG_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case productConstants.GET_PRODUCT_BY_SLUG_SUCCESS:
      state = {
        ...state,
        product: action.payload.product,
        loading: false,
      };
      return state;
    case productConstants.GET_PRODUCT_BY_SLUG_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    case productConstants.ADD_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case productConstants.ADD_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
      };
      return state;
    case productConstants.ADD_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    case productConstants.UPDATE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case productConstants.UPDATE_PRODUCT_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
      };
      return state;
    case productConstants.UPDATE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    case productConstants.DELETE_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case productConstants.DELETE_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        successDelete: true,
        loading: false,
      };
      return state;
    case productConstants.UPDATE_DISCOUNT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case productConstants.UPDATE_DISCOUNT_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
      };
      return state;
    case productConstants.UPDATE_DISCOUNT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    case productConstants.DELETE_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    case productConstants.ENABLE_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case productConstants.ENABLE_PRODUCT_SUCCESS:
      state = {
        ...state,
        successEnable: true,
        loading: false,
      };
      return state;
    case productConstants.ENABLE_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    case productConstants.ADD_PRODUCT_RESET:
      state = {
        ...state,
        success: false,
        successDelete: false,
        successEnable: false,
      };
      return state;
    default:
      return state;
  }
};
