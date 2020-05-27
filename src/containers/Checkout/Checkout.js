import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from "react-router-dom";

class Checkout extends React.Component{
  state = {
    ingredients : {
      salad : 0, 
      bacon : 0, 
      cheese : 0,
      meat : 0
    },
    totalPrice : 4
  }
  componentDidMount(){  
   const query = new URLSearchParams(this.props.location.search);
   const ingredients = {};
   let totalPrice ; 
   for(let [key,value] of query.entries()){
     if(key==="price"){
      totalPrice = +value ;
     }else{
      ingredients[key] = +value;
     }     
   }
   this.setState({ingredients : ingredients, totalPrice : totalPrice});
  }
  checkoutCancelHandler = () =>{
    this.props.history.goBack();
  }
  checkoutContinueHanlder= () => {
    this.props.history.replace("/checkout/contact-data");
  }
  render(){
    return(
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients} 
          onCheckoutCancel={this.checkoutCancelHandler}
          onCheckoutContinue={this.checkoutContinueHanlder}
        />
        <Route path={`${this.props.match.path}/contact-data`} render={(props) => <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>} />
      </div>
    )
  }
}

export  default Checkout;