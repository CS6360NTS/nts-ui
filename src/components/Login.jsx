import React, { useEffect } from "react";
import './Login.css';





const handleSubmit = (event) => {
  event.preventDefault();
  var { name, pwd } = document.forms[0];
  console.log(document.forms[0]);
  console.log(event.target);
  window.location.href = 'http://localhost:3000/sidebar';
}

const handleChange= (event) => {

}
function Login() {

  useEffect(() => {
     fetch('http://34.66.65.153:8080/nts/users')
     .then(response => {
       console.log(response)
     })
  
   })

  return (
    
      <div className="login">
        <div class="container-login">
          <div class="mini-container">
            <form className="login-form">
              <div className="form-container">
                <h2 className="form-heading">Login</h2><br />
                <div className="form-body">
                  <label>Username </label><br />
                  <input type="text" placeholder="Enter username" onChange={handleChange} required />
                  <br />
                  <label>Password </label><br />
                  <input type="password" placeholder="Enter password" onChange={handleChange} required />
                  <br /><br />
                  <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Login</button><br /><br />
                  <a href="#">Forgot Password?</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;