import React from "react";
import Aux from "../../hoc/Aux";
import Burger from "../Burger/Burger";
import BuildControls from "../Burger/BuildControls/BuildControls";
import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import OrderSummary from "../Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.3,
};
class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing : false 
  };

  updatePurchaseState = (ingredients) => {   
    let totalIngredients = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
     
    this.setState({ purchaseable: totalIngredients > 0 });
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngradient = { ...this.state.ingredients };
    updatedIngradient[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngradient, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngradient);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount > 0) {
      const updatedCount = oldCount - 1;
      const updatedIngradient = { ...this.state.ingredients };
      updatedIngradient[type] = updatedCount;
      const priceRemoving = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceRemoving;
      this.setState({ ingredients: updatedIngradient, totalPrice: newPrice });
      this.updatePurchaseState(updatedIngradient);
    }
  };

  purchaseHandler = () => {
    this.setState({purchasing:true });
  }

  purchaseCancelHandler = () => {   
    this.setState({purchasing:false });
  }

  purchaseContinueHandler = () => {
    alert("OK");
  }

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }
   
    return (
      <Aux>
        <Modal show={this.state.purchasing} close={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients} purchaseCancel={this.purchaseCancelHandler} purchaseContinue={this.purchaseContinueHandler}/>
        </Modal>       
        <Burger ingredients={this.state.ingredients} />
        <BuildControls         
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disabledInfo}
          totalPrice={this.state.totalPrice}          
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
