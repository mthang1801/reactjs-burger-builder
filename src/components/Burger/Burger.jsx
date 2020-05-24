import React from "react";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";
import classes from "./Burger.module.css";
const Burger = props => {
  let transformedIngredient = Object.keys(props.ingredients).map( igKey  => {
    return [...Array(props.ingredients[igKey])].map((_,i) => (
      <BurgerIngredient key={igKey + i} type={igKey}/>
    ))
  }).reduce((arr, el) => {
    return arr.concat(el);
  },[]); 
  if(!transformedIngredient.length){
    transformedIngredient = <div>Please start adding ingredients!</div> 
  }
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredient}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  )
}

export default Burger; 