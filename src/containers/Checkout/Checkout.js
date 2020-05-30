import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Checkout extends React.Component {
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinueHanlder = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let checkoutSummary = <Redirect to="/" />;
    if (this.props.ingredients) {
      console.log(this.props.purchased);
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      checkoutSummary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            onCheckoutCancel={this.checkoutCancelHandler}
            onCheckoutContinue={this.checkoutContinueHanlder}
          />
          <Route
            path={`${this.props.match.path}/contact-data`}
            component={ContactData}
          />
        </div>
      );
    }
    return checkoutSummary;
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
