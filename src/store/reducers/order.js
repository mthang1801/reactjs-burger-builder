import * as types from "../actions/actionTypes";

const initState = {
  orders: [],
  loading: false,
  purchased: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case types.PURCHASE_INIT:
      return {
        ...state,
        purchased: false,
      };
    case types.PURCHASE_BURGER_START:
    case types.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true,
      };
    case types.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        loading: false,
        purchased: true,
      };
    case types.PURCHASE_BURGER_FAILED:
    case types.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
      };
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
