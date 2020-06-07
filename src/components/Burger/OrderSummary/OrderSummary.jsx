import React, {useState, useEffect} from 'react'
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.module.css";
const OrderSumary = (props) => {  
  
    const ingredientsSummary = Object.keys(props.ingredients).map( igKey => {
      return <li key={igKey}><span style={{textTransform:"uppercase"}}>{igKey}</span>: {props.ingredients[igKey]}</li>
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
        <Button btnType="danger" clicked={props.purchaseCancel}>CANCEL</Button>
        <Button btnType="success" clicked={props.purchaseContinue}>CONTINUE</Button>
      </div>
     
    </Aux>
    )
  
}

export default OrderSumary
