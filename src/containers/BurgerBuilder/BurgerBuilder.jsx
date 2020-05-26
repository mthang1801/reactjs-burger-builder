import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.3,
};
class BurgerBuilder extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error : false 
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
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({loading : true});
    const order = {
      ingredirents: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "mvt",
        address: {
          street: "Street 1",
          zipCode: "72000",
          country: "VN",
        },
        email: "mvt@email.com",
      },
      deliveryMethod: "fastest",
    };

    axios
      .post("/order.json", order)
      .then((response) => {
        this.setState({loading : false, purchasing: false  });
      })
      .catch((err) => {
        this.setState({loading : false, purchasing: false});
      });
  };

  componentDidMount(){    
    
    axios.get("https://react-burger-5671d.firebaseio.com/ingredients.json")
      .then(response=> {
        console.log(response);
        this.setState({ingredients : response.data})
      })
      .catch(err => {
        this.setState({error : true})
      })
  }

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }

    let orderSummary = null;

    let burger = this.state.error ? "Ingredients cant load" : <Spinner/> ;
    if(this.state.ingredients){
      burger = (
        <Aux>
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
      ) ;
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCancel={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
        />
      );
    }
         
    if(this.state.loading){
      orderSummary = <Spinner/>
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          close={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
        
          {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
