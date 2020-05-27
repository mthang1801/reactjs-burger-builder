import React from 'react'
import classes from "./NavigationItem.module.css";
import {NavLink} from "react-router-dom";
const NavigationItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      {/* <a href={props.link} className={props.active ? classes.active : ""}>{props.children}</a> */}
      <NavLink to={props.link} {...props} activeClassName={classes.active}>{props.children.length > 15 ? props.children.slice(0,12) + "..." : props.children}</NavLink> 
    </li>
  )
}

export default NavigationItem
