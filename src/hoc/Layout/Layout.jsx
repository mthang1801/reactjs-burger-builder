import React from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import BurgerBuilder from "../../containers/BurgerBuilder/BurgerBuilder";
import {connect} from "react-redux";
const Layout = props => {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  console.log(props);
  const sideDrawerToggleHandler = () => {
    setOpenDrawer(prevState => !prevState);
  }
  return(
    <Aux>      
        <Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler}/>
        <SideDrawer isAuth={props.isAuthenticated} open={openDrawer} closeMenu={() => setOpenDrawer(false)}/>        
        <main className={classes.Content}>
          {props.children}
        </main>
    </Aux>
  )
}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.token !== null
})

export default connect(mapStateToProps)(Layout);