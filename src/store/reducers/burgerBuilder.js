import * as types from "../actions/actionTypes";
import {} from "../utility";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.3,
};

const initState = {
  ingredients: null,
  totalPrice: 4,
  purchasable: false,
  error: false,
  building: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case types.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        purchasable: true,
        building: true,
      };
    case types.REMOVE_INGREDIENT:
      let purchasable = false;
      for (let key in state.ingredients) {
        if (key !== action.ingredientName && state.ingredients[key] > 0) {
          purchasable = true;
          break;
        }
      }
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        purchasable:
          state.ingredients[action.ingredientName] - 1 > 0 ? true : purchasable,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
      };
    case types.SET_INGREDIENT:
      return {
        ...state,
        ingredients: {
          salad: action.payload.salad,
          bacon: action.payload.salad,
          cheese: action.payload.cheese,
          meat: action.payload.meat,
        },
        totalPrice: 4,
        purchasable: false,
        error: false,
        building: false,
      };
    case types.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
}
