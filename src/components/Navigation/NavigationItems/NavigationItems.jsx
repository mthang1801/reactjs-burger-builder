import React from 'react'
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = props => {
  console.log(props);
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>Burger Builder</NavigationItem>     
      {!props.isAuthenticated ? 
        (
          <React.Fragment>
            <NavigationItem link="/auth/register">Register</NavigationItem>
            <NavigationItem link="/auth/login">Login</NavigationItem>
          </React.Fragment>
        ) : 
        (
          <React.Fragment>
             <NavigationItem link="/orders">Orders</NavigationItem>
             <NavigationItem link="/auth/logout">Logout</NavigationItem>
          </React.Fragment>
        )
      
      }
     
    </ul>
  )
}

export default NavigationItems
