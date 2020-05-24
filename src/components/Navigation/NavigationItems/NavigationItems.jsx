import React from 'react'
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem active={true}>Home</NavigationItem>
      <NavigationItem>About</NavigationItem>
      <NavigationItem>Contact</NavigationItem>
    </ul>
  )
}

export default NavigationItems
