import React from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import BurgerBuilder from "../BurgerBuilder/BurgerBuilder";
const Layout = props => {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const sideDrawerToggleHandler = () => {
    setOpenDrawer(prevState => !prevState);
  }
  return(
    <Aux>      
        <Toolbar drawerToggleClicked={sideDrawerToggleHandler}/>
        <SideDrawer open={openDrawer} closeMenu={() => setOpenDrawer(false)}/>        
        <main className={classes.Content}>
          {props.children}
        </main>
    </Aux>
  )
}

export default Layout;