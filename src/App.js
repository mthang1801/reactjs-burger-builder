import React from "react";
import Aux from "./hoc/Aux/Aux";
import Layout from "./hoc/Layout/Layout";
import "./App.css";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RoutePrivate from "./components/Routing/PrivateRoute";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

const asyncCheckout = asyncComponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrders = asyncComponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncAuth = asyncComponent(() => {
  return import("./containers/Auth/Auth");
});
class App extends React.Component {
  componentDidMount() {
    this.props.onCheckState();
  }
  render() {
    const clientRoute = <React.Fragment></React.Fragment>;

    const authRoute = <React.Fragment></React.Fragment>;
    return (
      <Aux>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" exact component={asyncAuth} />
            <Route path="/auth/logout" component={Logout} />
            <Route path="/auth/:method" component={asyncAuth} />
            <RoutePrivate path="/checkout" component={asyncCheckout} />
            <RoutePrivate path="/orders" exact component={asyncOrders} />
            <Route
              render={() => <h1>Sorry, we didn't found you search page :)</h1>}
            ></Route>
          </Switch>
        </Layout>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onCheckState: () => {
    dispatch(actions.authCheckState());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
