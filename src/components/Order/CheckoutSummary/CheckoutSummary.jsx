import React from "react";
import classes from "./CheckoutSummary.module.css";
import  Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";
const CheckoutSummary = props => {
  return(
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div className={classes.Burger}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <div className={classes.Actions}>
        <Button btnType="danger" clicked={props.onCheckoutCancel}>CANCEL</Button>
        <Button btnType="success" clicked={props.onCheckoutContinue}>CONTINUE</Button>
      </div>
     
    </div>
  )
}

export default CheckoutSummary;