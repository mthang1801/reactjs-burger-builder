import React, {useEffect} from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as ordersCreator from "../../store/actions/index";
const Orders = (props) => {
  console.log(props);
  useEffect(() => {    
    const fetchOrders = async ()=> {
      await props.fetchOrders(props.token, props.userId);
    }
    fetchOrders();
  } , []);  
      
    let orders = <Spinner/>

    if(!props.loading){          
      orders = props.orders.map( order => (
        <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
      ))
    }
    return(
      <div>
        {orders}
      </div>
    )
  
}

const mapStateToProps = state => ({
  orders : state.order.orders,
  loading : state.order.loading ,
  token : state.auth.token,
  userId : state.auth.userId 
})

const mapDispatchToProps = dispatch => ({
  fetchOrders : (token,userId) =>{
    dispatch(ordersCreator.fetchOrders(token, userId));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(Orders, axios));
