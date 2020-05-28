import React from "react";
import axios from "../../axios-orders";
import Order from "../../components/Order/Order";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends React.Component{

  state = {
    orders : [],
    loading : true 
  }
  componentDidMount(){  
    this.setState({loading : true });
    axios.get("/orders.json")
      .then(res => {
        console.log(res);
        let fetchedOrders = [];
        for(let key in res.data){
          fetchedOrders.push({
            ...res.data[key],
            id : key
          })        
        }
        this.setState({orders : fetchedOrders, loading : false});
      }) 
      .catch(err => {
        console.log(err)
      })            
     
      
  }

  render(){    
    let orders = <Spinner/>
    if(!this.state.loading){
      orders = this.state.orders.map( order => (
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


export default withErrorHanlder(Orders, axios);
