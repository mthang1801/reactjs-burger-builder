import * as types from "./actionTypes";
import axios from "axios";

export const auth = (email, password, isSignup) => async (dispatch) => {
  try {
    dispatch({
      type: types.AUTH_START,
    });
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url;

    if (isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAUp4l7022nOd1VTGnQy3E7IbcxgTZcgtA";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAUp4l7022nOd1VTGnQy3E7IbcxgTZcgtA";
    }

    const res = await axios.post(url, authData);
    const expirationDate = new Date(Date.now() + res.data.expiresIn * 1000);
    localStorage.setItem("token", res.data.idToken);
    localStorage.setItem("expirationTime", expirationDate);
    localStorage.setItem("userId", res.data.localId);
    dispatch({
      type: types.AUTH_SUCCESS,
      payload: { token: res.data.idToken, userId: res.data.localId },
    });
  } catch (error) {
    dispatch({
      type: types.AUTH_FAIL,
      payload: {
        message: error.response.data.error.message,
        status: error.response.status,
      },
    });
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: types.AUTH_LOGOUT,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: types.SETH_AUTH_REDIRECT_PATH,
    payload: path,
  };
};

export const authCheckState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const expirationTime = localStorage.getItem("expirationTime");
  if (!token || new Date() > new Date(expirationTime)) {
    dispatch(logout());
    return;
  }
  const userId = localStorage.getItem("userId");
  dispatch({
    type: types.AUTH_SUCCESS,
    payload: { token, userId },
  });
};
