import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
  let inputElement = null;
  let inputClasses = [classes.InputElement];
  let validationError  = <p className={classes.ValidationError}>{props.validationError}</p>;
  if(!props.isValid && props.shouldValidation && props.touched){
    inputClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
          style={validationError ? {margin : "0"} : {margin : "1rem 0"}}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}        
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={inputClasses.join(" ")}
          value={props.value}
          onChange={props.change}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.change}
        />
      );
  }  
  return <div className={classes.Input}>
    {inputElement}
    {validationError}
    </div>;
};

export default Input;
