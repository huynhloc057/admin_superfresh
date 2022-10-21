import { categoryConstants } from "../actions/constant";

const initState = {
  categories: [],
  categoryDetail: {},
  loading: false,
  error: null,
  success: false,
};

export const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
      return state;
    case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      return state;
    case categoryConstants.GET_CATEGORY_BY_ID_SUCCESS:
      state = {
        ...state,
        categoryDetail: action.payload,
      };
      return state;
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
        success: true,
      };

      return state;
    case categoryConstants.ADD_NEW_CATEGORY_RESET:
      state = {};

      return state;
    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.console.error,
      };
      return state;
    default:
      return state;
  }
};
