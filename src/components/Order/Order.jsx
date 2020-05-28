import React from "react";
import classes from "./Order.module.css";
const Order = props => {
  let ingredients = Object.keys(props.ingredients).map( igKey => {
    return <span className={classes.Ingredients} key={igKey}>{igKey} ({props.ingredients[igKey]})</span>
  })
  return(
    <div className={classes.Order}>    
      <p>Ingredients : {ingredients}</p>
      <p>price : <strong>${props.price}</strong></p>
    </div>   
  )
}

export default Order;