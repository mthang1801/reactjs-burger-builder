import React from "react";
import Aux from "./hoc/Aux/Aux";
import Layout from "./hoc/Layout/Layout";
import "./App.css";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Logout from "./containers/Auth/Logout/Logout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import RoutePrivate from "./components/Routing/PrivateRoute";
import * as actions from "./store/actions/index";

class App extends React.Component {
  componentDidMount() {
    console.log("[rootComponent] componentDidMount");
    this.props.onCheckState();
  }
  render() {
    console.log(this.props.isAuthenticated);
    const clientRoute = <React.Fragment></React.Fragment>;

    const authRoute = <React.Fragment></React.Fragment>;
    return (
      <Aux>
        <Layout>
          <Switch>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/auth/logout" component={Logout} />
            <Route path="/auth/:method" component={Auth} />
            <RoutePrivate path="/checkout" component={Checkout} />
            <RoutePrivate path="/orders" exact component={Orders} />
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
