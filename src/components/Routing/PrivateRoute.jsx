import React from 'react'
import {connect} from "react-redux";
import {Route , Redirect} from "react-router-dom";
const PrivateRoute = ({component : Component,  isAuthenticated, loading , children, ...rest}) => {
  if(Component){
    return <Route {...rest} render={props => !isAuthenticated && !loading ?  <Redirect to="/auth/login"/> : <Component {...props}/> } />
  }
  return <Route {...rest} render={props => !isAuthenticated && !loading ? <Redirect to="/auth/login" /> : (children)}></Route>
}

const mapStateToProps = state => ({
  isAuthenticated : state.auth.token !== null ,
  loading : state.auth.loading
})

export default connect(mapStateToProps)(PrivateRoute)
