import React from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as ordersCreator from "../../store/actions/index";
class Orders extends React.Component{

  componentDidMount(){    
      this.props.fetchOrders();
  }

  render(){    
    console.log(this.props)
    let orders = <Spinner/>
    if(!this.props.loading){
      orders = this.props.orders.map( order => (
        <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
      ))
    }
    return(
      <div>
        {orders}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders : state.order.orders,
  loading : state.order.loading 
})

const mapDispatchToProps = dispatch => ({
  fetchOrders : () =>{
    dispatch(ordersCreator.fetchOrders());
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHanlder(Orders, axios));
