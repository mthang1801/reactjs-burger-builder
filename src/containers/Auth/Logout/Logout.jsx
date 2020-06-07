import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../../../store/actions/index";
const Logout = (props) => {
  React.useEffect(()=> {
    props.onLogout();
  },[])
    
  return <Redirect to="/auth/login" />
  
}

const mapDispatchToProps = dispatch => ({
  onLogout : () => {
    dispatch(actions.logout());
  }
})

export default connect(null, mapDispatchToProps)(Logout);