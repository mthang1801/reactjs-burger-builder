import React from 'react'
import NavigationItems from "../NavigationItems/NavigationItems";
import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.module.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";
import clsx from "clsx";
const SideDrawer = (props) => {
  
  return (
    <Aux>
      <Backdrop show={props.open} close={props.closeMenu}></Backdrop>
      <div className={clsx(classes.SideDrawer, props.open ? classes.Open : classes.Close)}>    
        <div className={classes.Logo}>
          <Logo/> 
        </div>
      
        <nav>
          <NavigationItems />
        </nav>
      
      </div>
    </Aux>
  
  )
}

export default SideDrawer
