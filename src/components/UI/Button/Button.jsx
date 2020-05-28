import React from "react";
import classes from "./Button.module.css";
import clsx from "clsx";
const Button = (props) => {
  let classType ; 
  let variant; 
  switch(props.btnType){
    case "success" : 
      classType = classes.Success;
      break;
    case "danger" : 
      classType = classes.Danger;
      break;
    case "primary" : 
      classType = classes.Primary;
      break;
    default : classType = classes.Primary;
  }

  switch(props.variant){
    case "outlined" : 
      variant = classes.Outlined;
      break;
    case "contained" : 
      variant = classes.Contained; 
      break;
    default : variant = classes.Text;
  }
  return (
    <button
      className={clsx(
        classes.Button,
        classType,
        variant        
      )}
      onClick={props.clicked}
      disabled={props.disabled}
      >
      {props.children}
    </button>
  );
};

export default Button;
