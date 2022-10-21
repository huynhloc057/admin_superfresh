import { authConstants } from "../actions/constant";

const initState = {
  user: null,

  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
  message: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: null,
      };
      return state;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      return state;
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      return state;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      return state;
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      return state;
    default:
      state = {
        ...state,
      };
      return state;
  }
};

export { authReducer };
