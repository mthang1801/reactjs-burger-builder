import React from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import {connect} from "react-redux";
import axios from "../../axios-orders";
import {Redirect} from "react-router-dom";
import * as actions from "../../store/actions/index";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class Auth extends React.Component{
  state = {
    controls : {
      email : {
        elementType : "input",
        elementConfig : {
          type : "text",
          placeholder : "Email"
        },
        valid : false ,
        validation : {
          required: true , 
          isEmail : true 
        },
        value : "",
        touched : false,
        validationError : ""
      },
      name : {
        elementType : "input",
        elementConfig : {
          type : "text",
          placeholder : "Name"
        },
        valid : false , 
        validation : {
          required : true , 
          minLength : 3,
          maxLength : 50
        },
        value : "",
        touched : false,
        validationError : ""
      },
      password : {
        elementType : "input",
        elementConfig : {
          type : "password",
          placeholder : "Password"
        },
        validation : {
          required : true , 
          minLength : 6
        },
        value : "",
        touched : false,
        validationError : ""
      },
      confirmPassword : {
        elementType : "input",
        elementConfig : {
          type : "password",
          placeholder : "Confirm password"
        },
        validation : {
          required : true           
        },
        value : "",
        touched : false,
        validationError : ""
      },
    },
    isSignup : true 
  };

  componentDidMount(){
    if(!this.props.building && this.props.authRedirectPath !== "/"){
      this.props.onSetAuthRedirectPath("/");
    }
  }

  componentWillMount(){       
    console.log("[Auth] componentWillMount")
    this.setState({isSignup: this.props.match.url.split("/")[2] === "register"})  
  }

  componentDidUpdate(prevProps, prevState){      
    if(this.props.match.url !== prevProps.match.url){
      this.setState({isSignup : this.props.match.url.split("/")[2] === "register" });      
    }        
  }

  checkValidity = (value, rules) => {
    let isValid = true ; 
    let errsMessage = [];
    if(rules.required){
      isValid = value.trim().length && isValid ; 
      if(!isValid){
        errsMessage.push("This field is required");
      }
    }
    if(rules.minLength){
      isValid = value.trim().length >= rules.minLength && isValid ;
      if(!isValid){
        errsMessage.push(`At least ${rules.minLength} characters`);
      }
    }

    if(rules.maxLength){
      isValid = value.trim().length <= rules.maxLength && isValid ;
      if(!isValid){
        errsMessage.push(`At most ${rules.maxLength} characters`);
      }
    }

    if(rules.isEmail){
      const pattern =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattern.test(value) && isValid ; 
      if(!isValid){
        errsMessage.push(`Email is not valid`);
      }      
    }    
    return { valid : isValid , errsMessage : errsMessage.join(", ")}
  }


  handleChange = (e, id) => {
    let updatedControls = {...this.state.controls};
    let updatedControlElement = {...updatedControls[id]};
    updatedControlElement.value = e.target.value ;
    updatedControlElement.valid = this.checkValidity(e.target.value, updatedControlElement.validation).valid;
    updatedControlElement.touched = true ;
    updatedControlElement.validationError = this.checkValidity(e.target.value, updatedControlElement.validation).errsMessage;
    updatedControls[id] = updatedControlElement;
    this.setState({controls : updatedControls})
  }

  onSubmitForm = e => {   
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
  }

  render(){     
    console.log("[Auth] render")
    let formElementArray = [];
    for(let key in this.state.controls){
      if(!this.state.isSignup && (key === "name" || key === "confirmPassword")){
        continue;
      }
      formElementArray.push({
        id : key ,
        config : this.state.controls[key]
      })
    }        
    let form = (
      <form onSubmit={this.onSubmitForm}>
        <h4 className={classes.FormTitle}>{this.state.isSignup ? "Sign Up" : "Sign In"}</h4>
        {formElementArray.map( formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            touched={formElement.config.touched}
            isValid={formElement.config.valid}
            validationError={formElement.config.validationError}
            shouldValidation={formElement.config.validation}
            change={event => this.handleChange(event,formElement.id)}
          />
        ))}
          <Button btnType="primary" variant="contained">{this.state.isSignup ? "Sign Up" : "Log In"}</Button>
      </form>
    )
    if(this.props.loading){
      form = <Spinner/>
    }
    let errorMessage = null;
    if(this.props.error){
      errorMessage = <p style={{color : "red"}}>{this.props.error.message}</p>
    }
    if(this.props.isAuthenticated)
      return <Redirect to={this.props.authRedirectPath} />
    return (
      <div className={classes.Auth}>
        {errorMessage}
        {form}      
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading : state.auth.loading,
  error : state.auth.error,
  isAuthenticated : state.auth.token !== null,
  building : state.burgerBuilder.building,
  authRedirectPath : state.auth.authRedirectPath
})

const mapDispatchToProps = dispatch => ({
  onAuth : (email, password, isSignup) => {
    dispatch(actions.auth(email, password, isSignup));
  },
  onSetAuthRedirectPath : path => {
    dispatch(actions.setAuthRedirectPath(path))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));