import React from 'react';
import Aux from "./hoc/Aux/Aux";
import Layout from "./hoc/Layout/Layout";
import './App.css';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";
import Orders from "./containers/Orders/Orders";
import {Route, Switch} from "react-router-dom";
function App() {
  return (
    <Aux>
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>          
          <Route path="/orders" component={Orders}/>
        </Switch>       
      </Layout>
    </Aux>
  );
}

export default App;
