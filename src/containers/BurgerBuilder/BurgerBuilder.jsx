import React , {useEffect, useMemo} from "react";
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


export const BurgerBuilder = props =>  {
  const [purchasing, setPurchasing] = React.useState(false);
  const {onInitIngredients} = props;
  useEffect(() => {
    console.log(props)
    let initIngredients = async () => {
      await onInitIngredients();    
    }   
      initIngredients();
        
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    let totalIngredients = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return totalIngredients > 0;
  };

  const purchaseHandler = () => {
    if(props.isAuthenticated){
      setPurchasing(true);
      return ;
    }
    props.onSetAuthRedirectPath("/");
    props.history.push("/auth/login")
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {        
    props.onPurchaseInit();
    props.history.push("/checkout")
  };

    let disabledInfo = { ...props.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] < 1;
    }

    let orderSummary = null;

    let burger = props.error ? "Ingredients cant load" : <Spinner/> ;
    if(props.ingredients){
      burger = (
        <Aux>
          <Burger ingredients={props.ingredients} />
          <BuildControls
            ingredientAdded={props.onAddIngredient}
            ingredientRemove={props.onRemoveIngredient}
            disabled={disabledInfo}
            totalPrice={props.totalPrice}
            purchaseable={props.purchasable}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticated}
        />
        </Aux>
      ) ;
      orderSummary = (
        <OrderSummary
          ingredients={props.ingredients}
          purchaseCancel={purchaseCancelHandler}
          purchaseContinue={purchaseContinueHandler}
        />
      );
    }
         
        
    return (
      <Aux>
        <Modal
          show={purchasing}
          close={purchaseCancelHandler}>
            {orderSummary}
          </Modal>
        
          {burger}
      </Aux>
    );
  
};

const mapStateToProps = state => ({
  ingredients : state.burgerBuilder.ingredients,
  totalPrice : state.burgerBuilder.totalPrice,
  purchasable : state.burgerBuilder.purchasable,
  error : state.burgerBuilder.error,
  isAuthenticated : state.auth.token !== null,
  building : state.burgerBuilder.building,
  purchased : state.order.purchased 
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
