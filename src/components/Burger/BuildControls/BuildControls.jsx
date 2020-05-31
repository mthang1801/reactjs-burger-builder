import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import {connect} from "react-redux";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Meat", type: "meat" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
];

const BuildControls = (props) => {
 
  return (
    <div className={classes.BuildControls}>
      <div className={classes.totalPrice}>
        Current Price : <strong>${props.totalPrice.toFixed(2)}</strong>
      </div>
      {controls.map((control) => (
        <BuildControl
          disabled={props.disabled[control.type]}
          key={control.label}
          label={control.label}
          type={control.type}
          quantity={props.ingredients[control.type]}          
          added={() => props.ingredientAdded(control.type)}
          removed={() => props.ingredientRemove(control.type)}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}
      >
        {props.isAuth ? "Order Now" : "Sign In to Order"}
      </button>
    </div>
  );
};

const mapStateToProps = state => ({
  ingredients : state.burgerBuilder.ingredients
})

export default connect(mapStateToProps)(BuildControls);
