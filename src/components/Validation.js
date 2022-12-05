const Validation=(values)=>{
    let errors={}
    if(!values._name){
        errors.name="Name is Required"
    }
    if(!values.first_name){
        errors.first_name="First Name is Required"
    }
    if(!values.last_name){
        errors.last_name="Last Name is Required"
    }
    if(!values.email_id){
        errors.email_id="Email ID is Required"
    }
    if(!values.phone_no){
        errors.phone_no="Phone Number is Required"
    }
    if(!values.cellPhoneNo){
        errors.cellPhoneNo="Cell Phone Number is Required"
    }
    if(!values.street_address){
        errors.street_address="Street Address is Required"
    }
    if(!values.city){
        errors.city="City is Required"
    }
    if(!values.state){
        errors.state="State is Required"
    }
    if(!values.zipcode){
        errors.zipcode="Zipcode is Required"
    }
    if(!values.password){
        errors.password="Password is Required"
    }
    if(!values.confirm_password){
        errors.confirm_password="Confirm Password is Required"
    }
    
    //else if(values.name.length<5){
    //    errors.name="Name must be more than 5 characters"
    //}  

    //else if(values.password.length<8){
    //    errors.password="Password must be more than 8 characters"
    //}
    return errors;
}
export default Validation;