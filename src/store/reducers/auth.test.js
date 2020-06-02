import React from "react";
import reducer from "./auth";
import * as types from "../actions/actionTypes";

const initState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authRedirectPath: "/",
};

describe("auth reducer", () => {
  it("should return initial state", () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it("should store token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          loading: false,
          error: null,
          authRedirectPath: "/",
        },
        {
          type: types.AUTH_SUCCESS,
          payload: { token: "some-token", userId: "some-user-id" },
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-user-id",
      loading: false,
      error: null,
      authRedirectPath: "/",
    });
  });
});
