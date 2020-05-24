import React from 'react';
import Aux from "./hoc/Aux";
import Layout from "./components/Layout/Layout";
import './App.css';
import BurgerBuilder from "./components/BurgerBuilder/BurgerBuilder";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";
function App() {
  return (
    <Aux>
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </Aux>
  );
}

export default App;
