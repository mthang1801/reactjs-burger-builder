import React from "react";
import  Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
class ContactData extends React.Component{
  state = {
    name : "",
    email : "",
    address : {
      street : "",
      postalCode : ""
    },
    loading : false 
  }

  handleChange = e => {    
    this.setState({[e.target.name] : e.target.value});
  }

  orderHandler = (e) => {
    e.preventDefault();
    const {name, email, address} = this.state;
    // if(!name || !email || !address.street || !address.postalCode){
    //   alert("Please fill in form");
    //   return ; 
    // }
    this.setState({loading : true });
     const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: name,
                address: {
                    street: address.street,
                    zipCode: address.postalCode,                   
                },
                email: email
            },
            deliveryMethod: 'fastest'
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false } );                
                this.props.history.replace("/");
            } )
            .catch( error => {
                this.setState( { loading: false } );
            } );
  }
  componentDidMount(){
    console.log(this.props);
  }

  render(){
    let form = (
      <form>
        <h4 className={classes.FormTitle}>Enter your contact Data</h4>
        <input type="text" name="name" placeholder="Your name" onChange={this.handleChange}/>
        <input type="email" name="email" placeholder="Your email" onChange={this.handleChange}/>
        <input type="text" name="address.street" placeholder="Your address" onChange={this.handleChange}/>
        <input type="text" name="adress.postalCode" placeholder="Postal code" onChange={this.handleChange}/>
        <Button btnType="success" clicked={this.orderHandler}>Order</Button>
      </form>
    );
    if(this.state.loading){
      form = <Spinner/>
    }
    return(
      <div className={classes.ContactData}>
        {form}      
      </div>
    )
  }
}

export default ContactData;