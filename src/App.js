import React, { useEffect, lazy, Suspense } from "react";
import Aux from "./hoc/Aux/Aux";
import Layout from "./hoc/Layout/Layout";
import "./App.css";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RoutePrivate from "./components/Routing/PrivateRoute";
import * as actions from "./store/actions/index";

const AsyncCheckout = lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const AsyncOrders = lazy(() => {
  return import("./containers/Orders/Orders");
});
const AsyncAuth = lazy(() => {
  return import("./containers/Auth/Auth");
});
const App = (props) => {
  useEffect(() => {
    props.onCheckState();
  }, [props.onCheckState()]);
  const routes = (
    <Switch>
      <Route path="/" exact render={(props) => <BurgerBuilder {...props} />} />
      <Route path="/auth" exact component={AsyncAuth} />
      <Route path="/auth/logout" render={(props) => <Logout {...props} />} />
      <Route
        path="/auth/:method"
        render={(props) => <AsyncAuth {...props} />}
      />
      <RoutePrivate path="/checkout" component={AsyncCheckout} />
      <RoutePrivate path="/orders" exact component={AsyncOrders} />
      <Route
        render={() => <h1>Sorry, we didn't found you search page :)</h1>}
      ></Route>
    </Switch>
  );
  return (
    <Aux>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </Aux>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onCheckState: () => {
    dispatch(actions.authCheckState());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
