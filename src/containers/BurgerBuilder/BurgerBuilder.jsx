import React from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderCreator from "../../store/actions/index";
import {connect} from "react-redux";


export class BurgerBuilder extends React.Component {
  state = {    
    purchasing: false    
  };

  updatePurchaseState = (ingredients) => {
    let totalIngredients = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return totalIngredients > 0;
  };

  purchaseHandler = () => {
    if(this.props.isAuthenticated){
      this.setState({ purchasing: true });
      return ;
    }
    this.props.onSetAuthRedirectPath("/");
    this.props.history.push("/auth/login")
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  async componentDidMount(){      
    if(!this.props.building){
      await this.props.onInitIngredients();   
    }
   
  };

  purchaseContinueHandler = () => {        
    this.props.onPurchaseInit();
    this.props.history.push("/checkout")
  };

  render() {
    let disabledInfo = { ...this.props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }

    let orderSummary = null;

    let burger = this.props.error ? "Ingredients cant load" : <Spinner/> ;
    if(this.props.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemove={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            totalPrice={this.props.totalPrice}
            purchaseable={this.props.purchasable}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
        />
        </Aux>
      ) ;
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
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
};

const mapStateToProps = state => ({
  ingredients : state.burgerBuilder.ingredients,
  totalPrice : state.burgerBuilder.totalPrice,
  purchasable : state.burgerBuilder.purchasable,
  error : state.burgerBuilder.error,
  isAuthenticated : state.auth.token !== null,
  building : state.burgerBuilder.building
})

const mapDispatchToProps = dispatch => ({
  onAddIngredient : (igName) => {
    dispatch(burgerBuilderCreator.addIngredient(igName))
  },
  onRemoveIngredient : (igName) => {
    dispatch(burgerBuilderCreator.removeIngredient(igName))
  },
  onInitIngredients : () => {
    dispatch(burgerBuilderCreator.initBurgerBuilder());
  },
  onPurchaseInit : () => {
    dispatch(burgerBuilderCreator.purchaseInit());
  },
  onSetAuthRedirectPath : (path) => {
    dispatch(burgerBuilderCreator.setAuthRedirectPath(path))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
