import React from 'react'
import LogoBurger from "../../assets/images/28.1 burger-logo.png.png";
import classes from "./Logo.module.css";
const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={LogoBurger} alt="MyBurger"></img>
    </div>
  )
}

export default Logo
