import { orderConstants } from "../actions/constant";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderConstants.GET_ALL_ORDERS_SUCCESS:
      state = {
        ...state,
        loading: false,
        orders: action.payload.orders,
      };
      return state;
    case orderConstants.GET_ALL_ORDERS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case orderConstants.GET_ALL_ORDERS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      return state;

    case orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;

    case orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      return state;
    case orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    default:
      return state;
  }
};
