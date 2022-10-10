import { userConstants } from "../actions/constant";

const initState = {
  users: [],
  disabledUser: [],
  userDetail: {},
  successActive: false,
  successDelete: false,
  loading: false,
  error: null,
  message: "",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case userConstants.GET_ALL_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case userConstants.GET_ALL_USER_SUCCESS:
      state = {
        ...state,
        users: action.payload.users,
        loading: false,
      };
      return state;
    case userConstants.GET_ALL_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;

    case userConstants.GET_ALL_USER_DISABLED_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case userConstants.GET_ALL_USER_DISABLED_SUCCESS:
      state = {
        ...state,
        disabledUser: action.payload.users,
        loading: false,
      };
      return state;
    case userConstants.GET_ALL_USER_DISABLED_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;

    case userConstants.UN_DELETE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case userConstants.UN_DELETE_USER_SUCCESS:
      state = {
        ...state,
        successActive: true,
        loading: false,
      };
      return state;
    case userConstants.UN_DELETE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;
    case userConstants.UN_DELETE_USER_RESET:
      return {};
    case userConstants.DELETE_USER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case userConstants.DELETE_USER_SUCCESS:
      state = {
        ...state,
        successDelete: true,
        loading: false,
      };
      return state;
    case userConstants.DELETE_USER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      return state;

    default:
      state = {
        ...state,
      };
  }
  return state;
};

export { userReducer };
