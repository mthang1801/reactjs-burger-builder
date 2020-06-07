import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const Checkout = (props) => {
  const checkoutCancelHandler = () => {
    props.history.goBack();
  };
  const checkoutContinueHanlder = () => {
    props.history.replace("/checkout/contact-data");
  };
  let checkoutSummary = <Redirect to="/" />;
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    checkoutSummary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          onCheckoutCancel={checkoutCancelHandler}
          onCheckoutContinue={checkoutContinueHanlder}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
  return checkoutSummary;
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
