import React from "react";
import classes from "./Modal.module.css";
import clsx from "clsx";
import Backdrop from "../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
class Modal extends React.Component {  
  shouldComponentUpdate(nextProps, nextState){
   return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }
  componentWillUpdate(){
    console.log("[Modal] componentWillUpdate")
  }
  render(){
    return(
      <Aux>
        <Backdrop show={this.props.show} close={this.props.close}></Backdrop>
        <div className={clsx(classes.Modal, this.props.show ? classes.show : "")}>    
          {this.props.children}
        </div>      
      </Aux>
    )
  }
}

export default  Modal;