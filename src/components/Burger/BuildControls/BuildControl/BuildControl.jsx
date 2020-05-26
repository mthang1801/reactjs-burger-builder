import React from "react";
import classes from "./BuildControl.module.css";
const BuildControls = props => {
  return(
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <div className={classes.Count}>{props.count}</div>
      <button className={classes.More} onClick={props.added} >More</button>      
      <button className={classes.Less} disabled={props.disabled} onClick={props.removed}>Less</button> 
     
     
   
    </div>
  )
}


export default BuildControls;