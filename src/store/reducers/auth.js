import * as types from "../actions/actionTypes";

const initState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectPath: "/",
};

export default function (state = initState, action) {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        loading: false,
        error: null,
      };
    case types.AUTH_LOGOUT:
      return {
        token: null,
        userId: null,
        loading: false,
        error: null,
      };
    case types.SETH_AUTH_REDIRECT_PATH:
      return {
        ...state,
        authRedirectPath: action.payload,
      };
    case types.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
