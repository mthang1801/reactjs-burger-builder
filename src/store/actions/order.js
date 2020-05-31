import * as types from "./actionTypes";
import axios from "../../axios-orders";
export const orderBurger = (orderData, token) => async (dispatch) => {
  try {
    //loading before fetch
    dispatch({
      type: types.PURCHASE_BURGER_START,
    });
    const res = await axios.post(`/orders.json?auth=${token}`, orderData);
    dispatch({
      type: types.PURCHASE_BURGER_SUCCESS,
      payload: { id: res.data.name, orderData },
    });
  } catch (error) {
    dispatch({
      type: types.PURCHASE_BURGER_FAILED,
    });
  }
};

export const purchaseInit = () => {
  return {
    type: types.PURCHASE_INIT,
  };
};

export const fetchOrders = (token, userId) => async (dispatch) => {
  try {
    dispatch({
      type: types.FETCH_ORDERS_START,
    });
    console.log(userId);
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    const res = await axios.get("/orders.json" + queryParams);
    let fetchData = [];
    for (let key in res.data) {
      fetchData.push({
        id: key,
        ...res.data[key],
      });
    }
    console.log(res);
    dispatch({
      type: types.FETCH_ORDERS_SUCCESS,
      payload: { orders: fetchData },
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_ORDERS_FAIL,
    });
  }
};
