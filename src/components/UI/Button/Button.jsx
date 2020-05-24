import React from "react";
import classes from "./Button.module.css";
import clsx from "clsx";
const Button = (props) => {
  return (
    <button
      className={clsx(
        classes.Button,
        props.btnType
          ? props.btnType === "success"
            ? classes.Success
            : props.btnType === "danger"
            ? classes.Danger
            : ""
          : ""
      )}
      onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Button;
