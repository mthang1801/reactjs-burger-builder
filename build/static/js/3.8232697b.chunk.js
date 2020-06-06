(this["webpackJsonpburger-builder"]=this["webpackJsonpburger-builder"]||[]).push([[3],{105:function(e,t,a){"use strict";var n=a(0),r=a.n(n),i=a(106),o=a.n(i);t.a=function(e){var t=null,a=[o.a.InputElement],n=r.a.createElement("p",{className:o.a.ValidationError},e.validationError);switch(!e.isValid&&e.shouldValidation&&e.touched&&a.push(o.a.Invalid),e.isValid&&e.shouldValidation&&e.touched&&a.push(o.a.Valid),e.elementType){case"input":t=r.a.createElement("input",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.change,style:n?{margin:"0"}:{margin:"1rem 0"}}));break;case"textarea":t=r.a.createElement("textarea",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.change}));break;case"select":t=r.a.createElement("select",{className:a.join(" "),value:e.value,onChange:e.change},e.elementConfig.options.map((function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.displayValue)})));break;default:t=r.a.createElement("input",Object.assign({className:a.join(" ")},e.elementConfig,{value:e.value,onChange:e.change}))}return r.a.createElement("div",{className:o.a.Input},t,n)}},106:function(e,t,a){e.exports={InputElement:"Input_InputElement__2m88K",Invalid:"Input_Invalid__16Mis",Valid:"Input_Valid__TNEQR",ValidationError:"Input_ValidationError__qMR97"}},107:function(e,t,a){e.exports={Burger:"CheckoutSummary_Burger__1wJm6",CheckoutSummary:"CheckoutSummary_CheckoutSummary__3PsXi"}},108:function(e,t,a){e.exports={ContactData:"ContactData_ContactData__20AK_",FormTitle:"ContactData_FormTitle__2PpUu"}},112:function(e,t,a){"use strict";a.r(t);var n=a(6),r=a(7),i=a(10),o=a(9),l=a(0),c=a.n(l),u=a(107),s=a.n(u),d=a(41),m=a(59),p=function(e){return c.a.createElement("div",{className:s.a.CheckoutSummary},c.a.createElement("h1",null,"We hope it taste well!"),c.a.createElement("div",{className:s.a.Burger},c.a.createElement(m.a,{ingredients:e.ingredients})),c.a.createElement("div",{className:s.a.Actions},c.a.createElement(d.a,{btnType:"danger",clicked:e.onCheckoutCancel},"CANCEL"),c.a.createElement(d.a,{btnType:"success",clicked:e.onCheckoutContinue},"CONTINUE")))},h=a(12),v=a.n(h),g=a(18),f=a(1),C=a(108),E=a.n(C),b=a(40),y=a(23),k=a(105),V=a(8),_=a(17),j=a(48),I=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={orderForm:{name:{elementType:"input",elementConfig:{type:"text",placeholder:"Your name"},value:"",validation:{required:!0},valid:!1,touched:!1,validationError:""},email:{elementType:"input",elementConfig:{type:"email",placeholder:"Your Email"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1,validationError:""},street:{elementType:"input",elementConfig:{type:"text",placeholder:"Street"},value:"",validation:{required:!0},valid:!1,touched:!1,validationError:""},zipCode:{elementType:"input",elementConfig:{type:"text",placeholder:"ZIP Code"},value:"",validation:{required:!0,minLength:5,maxLength:5,isNumber:!0},valid:!1,touched:!1,validationError:""},country:{elementType:"input",elementConfig:{type:"text",placeholder:"Country"},value:"",validation:{required:!0},valid:!1,touched:!1,validationError:""},deliveryMethod:{elementType:"select",elementConfig:{options:[{value:"fastest",displayValue:"Fastest"},{value:"normal",displayValue:"Normal"},{value:"cheapest",displayValue:"Cheapest"}]},value:"fastest",valid:!0}},formIsValid:!1},e.checkValidity=function(e,t){if(!t)return{isValid:!0,errorsMsg:""};var a=!0,n=[];if(t.required&&((a=""!=e.trim()&&a)||n.push("This field is required")),t.maxLength&&((a=e.length<=t.maxLength&&a)||n.push("At most ".concat(t.maxLength," characters"))),t.minLength&&((a=e.length>=t.minLength&&a)||n.push("At least ".concat(t.maxLength," characters"))),t.isEmail){(a=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)&&a)||n.push("Invalid email")}if(t.isNumber){(a=/^\d+$/.test(e)&&a)||n.push("ZipCode must be number type")}return{isValid:a,errorsMsg:n.join(", ")}},e.handleChange=function(t,a){var n=Object(f.a)({},e.state.orderForm),r=Object(f.a)({},e.state.orderForm[a]);r.value=t.target.value,r.valid=e.checkValidity(t.target.value,r.validation).isValid,r.touched=!0,r.validationError=e.checkValidity(t.target.value,r.validation).errorsMsg,n[a]=r;var i=!0;for(var o in n)i=n[o].valid&&i;e.setState({orderForm:n,formIsValid:i})},e.submitForm=function(){var t=Object(g.a)(v.a.mark((function t(a){var n,r,i;return v.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a.preventDefault(),e.state.formIsValid){t.next=3;break}return t.abrupt("return");case 3:for(r in n={},e.setState({loading:!0}),e.state.orderForm)n[r]=e.state.orderForm[r].value;return i={userId:e.props.userId,ingredients:e.props.ingredients,price:e.props.totalPrice,customer:n},t.next=9,e.props.onOrderHanlder(i,e.props.token);case 9:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(r.a)(a,[{key:"render",value:function(){var e=this,t=[];for(var a in this.state.orderForm)t.push({id:a,config:this.state.orderForm[a]});var n=c.a.createElement("form",{onSubmit:this.submitForm},c.a.createElement("h4",{className:E.a.FormTitle},"Enter your contact Data"),t.map((function(t){return c.a.createElement(k.a,{key:t.id,elementType:t.config.elementType,elementConfig:t.config.elementConfig,value:t.config.value,change:function(a){return e.handleChange(a,t.id)},shouldValidation:t.config.validation,touched:t.config.touched,validationError:t.config.validationError,isValid:t.config.valid})})),c.a.createElement(d.a,{btnType:"Success",variant:"outlined",disabled:!this.state.formIsValid},"Order"));return this.props.loading&&(n=c.a.createElement(b.a,null)),c.a.createElement("div",{className:E.a.ContactData},n)}}]),a}(c.a.Component),O=Object(V.b)((function(e){return{ingredients:e.burgerBuilder.ingredients,totalPrice:e.burgerBuilder.totalPrice,loading:e.order.loading,token:e.auth.token,userId:e.auth.userId}}),(function(e){return{onOrderHanlder:function(t,a){e(_.g(t,a))}}}))(Object(j.a)(I,y.a)),N=a(4),T=function(e){Object(i.a)(a,e);var t=Object(o.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).checkoutCancelHandler=function(){e.props.history.goBack()},e.checkoutContinueHanlder=function(){e.props.history.replace("/checkout/contact-data")},e}return Object(r.a)(a,[{key:"render",value:function(){var e=c.a.createElement(N.a,{to:"/"});if(this.props.ingredients){var t=this.props.purchased?c.a.createElement(N.a,{to:"/"}):null;e=c.a.createElement("div",null,t,c.a.createElement(p,{ingredients:this.props.ingredients,onCheckoutCancel:this.checkoutCancelHandler,onCheckoutContinue:this.checkoutContinueHanlder}),c.a.createElement(N.b,{path:"".concat(this.props.match.path,"/contact-data"),component:O}))}return e}}]),a}(c.a.Component);t.default=Object(V.b)((function(e){return{ingredients:e.burgerBuilder.ingredients,totalPrice:e.burgerBuilder.totalPrice,purchased:e.order.purchased}}))(T)}}]);
//# sourceMappingURL=3.8232697b.chunk.js.map