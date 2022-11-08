import { categoryConstants } from "../actions/constant";

const initState = {
  categories: [],
  categoryDetail: {},
  loading: false,
  error: null,
  success: false,
  successDelete: false,
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
    case categoryConstants.GET_ALL_CATE_DISABLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case categoryConstants.GET_ALL_CATE_DISABLE_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
        loading: false,
      };
      return state;
    case categoryConstants.GET_ALL_CATE_DISABLE_FAILURE:
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
    case categoryConstants.UPDATE_CATEGORIES_REQUEST:
      state = {
        ...initState,
        loading: true,
      };
      return state;
    case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
      state = {
        ...initState,
        loading: false,
        success: true,
      };
      return state;
    case categoryConstants.UPDATE_CATEGORIES_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.console.error,
      };
      return state;

    case categoryConstants.DELETE_CATEGORIES_REQUEST:
      state = {
        ...initState,
        loading: true,
      };
      return state;
    case categoryConstants.DELETE_CATEGORIES_SUCCESS:
      state = {
        ...initState,
        loading: false,
        successDelete: true,
      };
      return state;
    case categoryConstants.DELETE_CATEGORIES_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.console.error,
      };
      return state;

    case categoryConstants.ENABLE_CATEGORIES_REQUEST:
      state = {
        ...initState,
        loading: true,
      };
      return state;
    case categoryConstants.ENABLE_CATEGORIES_SUCCESS:
      state = {
        ...initState,
        loading: false,
        success: true,
      };
      return state;
    case categoryConstants.ENABLE_CATEGORIES_FAILURE:
      state = {
        ...initState,
        loading: false,
        error: action.payload.console.error,
      };
      return state;
    case categoryConstants.DELETE_CATEGORIES_RESET:
      state = { successDelete: false, success: false, error: "" };
      return state;
    default:
      return state;
  }
};
