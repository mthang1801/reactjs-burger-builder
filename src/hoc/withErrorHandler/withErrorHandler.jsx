import React , {useEffect, useState} from 'react'

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";
import useHttpErrorHanlder from "../../hooks/http-error-handlers";
const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError ] = useHttpErrorHanlder();
      
  
    return(
      <Aux>
        <Modal show={error} close={clearError}>
          {error ?  error.message : null}
        </Modal>
        <WrappedComponent {...props}/>
      </Aux>   
    )
    
  } 
}

export default withErrorHandler
