import React from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import * as orderCreator from "../../../store/actions/index";
import withErrorHanlder from "../../../hoc/withErrorHandler/withErrorHandler";
class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name",
        },
        value: "",
        validation : {
          required : true 
        },
        valid : false ,
        touched: false,
        validationError : ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation : {
          required : true,
          isEmail : true
        },
        valid : false ,
        touched: false,
        validationError : ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation : {
          required : true 
        },
        valid : false ,
        touched: false,
        validationError : ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation : {
          required : true ,
          minLength : 5,
          maxLength : 5,
          isNumber : true
        },
        valid : false ,
        touched: false,
        validationError : ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation : {
          required : true 
        },
        valid : false ,
        touched: false,
        validationError : ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "normal", displayValue: "Normal" },
            { value: "cheapest", displayValue: "Cheapest" },
          ]
        },
        value: "fastest"  ,
        valid : true      
      },
    },  
    formIsValid : false
  };

  checkValidity = (value, rules ) => {
    if(!rules){
      return {isValid : true , errorsMsg : "" }
    }
    let isValid = true ; 
    let errorsMsg = [];
   
    if(rules.required){
      isValid = value.trim() != "" && isValid;
      if(!isValid){
        errorsMsg.push("This field is required");
      }     
    }   
    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
      if(!isValid){
        errorsMsg.push(`At most ${rules.maxLength} characters`)
      }     
    }
    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
      if(!isValid){
        errorsMsg.push(`At least ${rules.maxLength} characters`)
      }      
    }    
    if(rules.isEmail){
      const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid;
      if(!isValid){
        errorsMsg.push("Invalid email");
      }
    }

    if(rules.isNumber){
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
      if(!isValid){
        errorsMsg.push("ZipCode must be number type");
      }
    }
    
    return {isValid , errorsMsg : errorsMsg.join(", ") } ; 
  }

  handleChange = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updatedFormElement = {
      ...this.state.orderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;  
    updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation).isValid;
    updatedFormElement.touched = true ; 
    updatedFormElement.validationError =this.checkValidity(event.target.value, updatedFormElement.validation).errorsMsg;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true ; 
    for(let inputIdentifier in updatedOrderForm){     
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid ;
    }
    
    this.setState({ orderForm: updatedOrderForm, formIsValid : formIsValid });
  };

  submitForm = async (e) => {
    e.preventDefault();
    if(!this.state.formIsValid){
      return;
    }
    const formData = {};
    this.setState({ loading: true });
    for(let key in this.state.orderForm){
      formData[key] = this.state.orderForm[key].value;
    }
    const order ={
      userId : this.props.userId,
      ingredients : this.props.ingredients,
      price : this.props.totalPrice,
      customer : formData 
    }
    
    await this.props.onOrderHanlder(order, this.props.token) ;           
   
   
  };

  render() {
    let formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.submitForm}>
        <h4 className={classes.FormTitle}>Enter your contact Data</h4>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            change={(e) => this.handleChange(e, formElement.id)}
            shouldValidation={formElement.config.validation}
            touched={formElement.config.touched}
            validationError={formElement.config.validationError}
            isValid={formElement.config.valid}
          />
        ))}
        <Button btnType="Success" variant="outlined" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

const  mapStateToProps = state => ({
  ingredients : state.burgerBuilder.ingredients,
  totalPrice : state.burgerBuilder.totalPrice,
  loading : state.order.loading,
  token : state.auth.token,
  userId : state.auth.userId 
});

const mapDispatchToProps = dispatch => ({
  onOrderHanlder : (orderData, token)  => {
    dispatch(orderCreator.orderBurger(orderData, token))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(ContactData,axios));
