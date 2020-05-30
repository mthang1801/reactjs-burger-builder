import React from 'react'
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.module.css";
class OrderSumary extends React.Component {  
  render(){
    const ingredientsSummary = Object.keys(this.props.ingredients).map( igKey => {
      return <li key={igKey}><span style={{textTransform:"uppercase"}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
    })
    return(
      <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients : </p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>Continue to checkout?</p>
      <div className={classes.Buttons}>
        <Button btnType="danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
        <Button btnType="success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
      </div>
     
    </Aux>
    )
  }
}

export default OrderSumary
