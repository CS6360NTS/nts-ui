import React, { useEffect, useState } from "react";
import "./Register.css";
import axios from "axios";
import validation from "./Validation";

function Register() {
  const [values,setValues]=useState({
    first_name:'',
    last_name:'',
    email_id:'',
    phone_no:'',
    cellPhoneNo:'',
    street_address:'',
    password:'',
    confirm_password:'',
    userType:'T'

  });
const[city,setCity] = useState("");
const[state,setState] = useState("");
const[zipCode,setZipCode]= useState("");

  const [errors,setError]=useState({})
  const [isSubmit,setIsSubmit]=useState(false);

  useEffect(()=>{
    if(Object.keys(errors).length===0 && (values.first_name!=="" && values.last_name!=="" && values.email_id!=="" && values.phone_no!="" && values.cellPhoneNo!=="" && values.street_address!=="" && values.city!=="" && values.state!="" && values.zipcode!=="" && values.password!=="" && values.confirm_password!=="") && isSubmit){
      alert("Registration Successful");
      console.log("RESULT")
    }
},[errors])


  const handleSubmit = (e) => {
    e.preventDefault();
    setError(validation(values));
    setIsSubmit(true);
    const req={
      "userInfo":{
        "firstName":values.first_name,
        "lastName":values.last_name,
        "emailId":values.email_id,
        "phoneNumber": values.phone_no,
        "cellPhoneNumber": values.cellPhoneNo,
        "streetAddress":  values.street_address,
        "city":  city,
        "state": state,
        "zipCode": zipCode,
        "password": values.password,
        "userType": values.userType
      }
    }
    axios
    .post("nts/addUser",req)
    .then((response)=>{
      window.location.href = "http://localhost:3000/userhome/"+`${response.data.userInfo.clientId}`;
    }).catch(
      (error)=>{
        window.alert("Error while making API call");
      
      }
    );
  };
  const hashMap={
    "75080":{
      "City":"Richardson",
      "State":"Texas"
    },
    "75462":{
      "City":"Lamar",
      "State":"Texas"
    },
    "75001":{
      "City":"Dallas",
      "State":"Texas"
    }
    }

  const handleState = (e) =>{
    setState(e.target.value);
  }
  const handeCity = (e) =>{
    setCity(e.target.value);
  }
  const handleZip = (e) =>{
    console.log(e.target.value);
    setZipCode(e.target.value);
    console.log(hashMap[e.target.value]);
    if(hashMap[e.target.value] !== undefined){
      setCity(hashMap[e.target.value]['City']);
      setState(hashMap[e.target.value]['State']);
    }
  }
  function handleChange(e){
    setValues({...values,[e.target.name]:e.target.value})
  }

  

  return (
    <div className="register">
      <div className="container-register">
        <div className="mini-container">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-container">
              
              <h2 className="form-heading">Register for New User</h2>
              <div className="form-body">
                <label>First Name </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter First Name"
                  name="first_name"
                  size="40"
                  value={values.first_name}
                  onChange={handleChange}
                  required="true"
                />
                {errors.first_name && <p style={{color:"red", fontSize:"13px"}}>{errors.first_name}</p>}
                <br/>
                <label>Last Name </label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  name="last_name"
                  size="40"
                  value={values.last_name}
                  onChange={handleChange}
                  required="true"
                />
                {errors.last_name && <p style={{color:"red", fontSize:"13px"}}>{errors.last_name}</p>}
                <br/>
                <label>Email ID </label>
                <br/>
                <input
                  type="email"
                  placeholder="Enter Email ID"
                  name="email_id"
                  size="40"
                  value={values.email_id}
                  onChange={handleChange}
                  required="true"
                />
                {errors.email_id && <p style={{color:"red", fontSize:"13px"}}>{errors.email_id}</p>}
                <br/>
                <label>Phone Number </label>
                <br/>
                <input
                  type="text"
                  placeholder="Enter Phone Number"
                  name="phone_no"
                  size="40"
                  value={values.phone_no}
                  onChange={handleChange}
                  required="true"
                />
                {errors.phone_no && <p style={{color:"red", fontSize:"13px"}}>{errors.phone_no}</p>}
                <br/>
                <label>Cell Phone Number </label>
                <br/>
                <input
                  type="text"
                  placeholder="Enter Cell Phone Number"
                  name="cellPhoneNo"
                  size="40"
                  value={values.cellPhoneNo}
                  onChange={handleChange}
                  required="true"
                />
                {errors.cellPhoneNo && <p style={{color:"red", fontSize:"13px"}}>{errors.cellPhoneNo}</p>}
                <br/>
                <label>User type </label>
                <br />
                <select name="userType" id="cars" style={{width:340}} onChange={handleChange}>
                      <option value="T">Trader</option>
                      <option value="M">Manager</option>
                </select>
                <br />
                <label>Street Address </label>
                <br/>
                <input
                  type="text"
                  placeholder="Enter Street Address"
                  name="street_address"
                  size="40"
                  value={values.street_address}
                  onChange={handleChange}
                  required="true"
                />
                {errors.street_address && <p style={{color:"red", fontSize:"13px"}}>{errors.street_address}</p>}
                <br/>
                <label>City </label>
                <br/>
                <input
                  type="text"
                  placeholder="Enter the City"
                  name="city"
                  size="40"
                  value={city}
                  onChange={handeCity}
                  required="true"
                />
                {/* {errors.city && <p style={{color:"red", fontSize:"13px"}}>{errors.city}</p>} */}
                <br/>
                <label>State </label>
                <br/>
                <input
                  type="text"
                  placeholder="Enter State"
                  name="state"
                  size="40"
                  value={state}
                  onChange={handleState}
                  required="true"
                />
                {/* {errors.state && <p style={{color:"red", fontSize:"13px"}}>{errors.state}</p>} */}
                <br/>
                <label>Zipcode</label>
                <br/>
                <input
                  type="text"
                  placeholder="Enter Zipcode"
                  name="zipcode"
                  size="40"
                  value={zipCode}
                  onChange={handleZip}
                  required="true"
                />
                {/* {errors.zipcode && <p style={{color:"red", fontSize:"13px"}}>{errors.zipcode}</p>} */}
                <br/>
                <label>Password </label>
                <br />
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  size="40"
                  value={values.password}
                  onChange={handleChange}
                  required="true"
                />
                {errors.password && <p style={{color:"red", fontSize:"13px"}}>{errors.password}</p>}
                <br/>
                <br/>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Register
                </button>
                <br />
                <br />
                <a href="/Login">Already Registered?</a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
