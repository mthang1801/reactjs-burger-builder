import React, {useState, memo} from "react";
import classes from "./Modal.module.css";
import clsx from "clsx";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
const Modal= props=> {  
    console.log(props)  
    return(
      <Aux>
        <Backdrop show={props.show} close={props.close}></Backdrop>
        <div className={clsx(classes.Modal, props.show ? classes.show : "")}>    
          {props.children}
        </div>      
      </Aux>
    )
  
}

export default memo(Modal, (prevProps, nextProps) =>  nextProps.show === prevProps.show || nextProps.children === prevProps.children);