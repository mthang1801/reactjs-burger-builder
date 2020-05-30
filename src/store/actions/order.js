import * as types from "./actionTypes";
import axios from "../../axios-orders";
export const orderBurger = (orderData) => async (dispatch) => {
  try {
    //loading before fetch
    dispatch({
      type: types.PURCHASE_BURGER_START,
    });
    const res = await axios.post("/orders.json", orderData);
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

export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: types.FETCH_ORDERS_START,
    });
    const res = await axios.get("/orders.json");
    let fetchData = [];
    for (let key in res.data) {
      fetchData.push({
        id: key,
        ...res.data[key],
      });
    }

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
