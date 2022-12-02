import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const request = { userName: userName, password: password };
       fetch("/nts/user?clientId=1").then((response) => {
      console.log(response);
    });
    // axios
    //   .get("/nts/user?clientId=1")
    //   .then((response) => {
    //     console.log(response.status);
    //     console.log(response,"res");
    //     // if (response.status == 200) {
    //     //   window.location.href = "http://localhost:3000/sidebar";
    //     // }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     window.alert("some exception");
    //   });
    // var { name, pwd } = document.forms[0];
    // console.log(document.forms[0]);
    // console.log(event.target);
    window.location.href = "http://localhost:3000/sidebar";
  };

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };

  const handlePw = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    fetch("/nts/user?clientId=1").then((response) => {
      console.log(response);
    });
  });

  return (
    <div className="login">
      <div class="container-login">
        <div class="mini-container">
          <form className="login-form">
            <div className="form-container">
              <h2 className="form-heading">Login</h2>
              <br />
              <div className="form-body">
                <label>Username </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter username"
                  value={userName}
                  onChange={handleUsername}
                  required
                />
                <br />
                <label>Password </label>
                <br />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePw}
                  required
                />
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
