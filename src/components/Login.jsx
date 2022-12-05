import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import validation from "./Validation";
import { Navigate } from "react-router-dom";

function Login() {
  const [values,setValues]=useState({
    name:'',
    password:''
  })

  const [errors,setError]=useState({})
  const [isSubmit,setIsSubmit]=useState(false);

  useEffect(()=>{
    if(Object.keys(errors).length===0 && (values.name!=="" && values.password!=="") && isSubmit){
  }
},[errors])

  //const [goToHomePage,setGoToHomePage]=React.useState(false);
  //if(goToHomePage){
  // return window.location.href = "http://localhost:3000/userhome/"+`${values.name}`;
  //}
  
  const [goToManagerDashboard,setGoToManagerDashboard]=React.useState(false);
  if(goToManagerDashboard){
    return window.location.href = "http://localhost:3000/managerDashboard/"+`${values.name}`;
  }
  

  
  //const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //setError(validation(values));
    //setIsSubmit(true);
    //setGoToHomePage(true);
   //setGoToManagerDashboard(true);
    axios
    .get("/nts/user?clientId="+`${values.name}`)
    .then((response)=>{
      
    if(response.data.userInfo.password == values.password){
      if(response.data.userInfo.userType=="T"){
        window.location.href = "http://localhost:3000/userhome/"+`${values.name}`;
       }
       else 
       {
        window.location.href = "http://localhost:3000/managerDashboard/"+`${values.name}`;
       }
    }
    else{
      window.alert("Invalid credentials");
    }
      
    }).catch((error) => {
        console.log(error);
        window.alert("some exception");
      });
  
  };

  function handleChange(e){
    setValues({...values,[e.target.name]:e.target.value})
  }


  

  return (
    <div className="login">
      <div className="container-login">
        <div className="mini-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-container">
              
              <h2 className="form-heading">Login</h2>
              <br />
              <div className="form-body">
                <label>Username </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter username"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p style={{color:"red", fontSize:"13px"}}>{errors.name}</p>}
                <br />
                <label>Password </label>
                <br />
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <p style={{color:"red", fontSize:"13px"}}>{errors.password}</p>}
                <br />
                <br />
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <br />
                <br />
                <a href="/register">Create an account</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
