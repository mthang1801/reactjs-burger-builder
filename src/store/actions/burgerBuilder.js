import * as types from "./actionTypes";
import axios from "../../axios-orders";
export const addIngredient = (ingredientName) => {
  return {
    type: types.ADD_INGREDIENT,
    ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: types.REMOVE_INGREDIENT,
    ingredientName,
  };
};

export const initBurgerBuilder = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://react-burger-5671d.firebaseio.com/ingredients.json"
    );
    dispatch({
      type: types.SET_INGREDIENT,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: types.FETCH_INGREDIENTS_FAILED,
    });
  }
};
