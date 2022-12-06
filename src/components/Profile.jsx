import {React,useState,useEffect} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import {
  useParams
} from "react-router-dom";
import axios from "axios";
import { NavLink } from 'react-router-dom';

const Profile = () => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [clientIdVal, setClientId] = useState("");
  const [traderLevel, setTraderLevel] = useState("");
  const [phone, setPhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [ethAdr, setEthAdr] = useState("");
    const fetchUserDetails = async () => {
      await axios
        .get("/nts/user?clientId="+`${clientId}`)
        .then((response) => {
            setUserFirstName(response.data['userInfo']['firstName']);
            setUserLastName(response.data['userInfo']['lastName']);
            setClientId(response.data['userInfo']['clientId']);
            setTraderLevel(response.data['tradeInfo']['traderLevel']);
            setPhone(response.data['userInfo']['phoneNumber']);
            setCellPhone(response.data['userInfo']['cellPhoneNumber']);
            setEmail(response.data['userInfo']['emailId']);
            setCity(response.data['userInfo']['city']);
            setState(response.data['userInfo']['state']);
            setZipcode(response.data['userInfo']['zipCode']);
            setAddress(response.data['userInfo']['streetAddress']);
            setEthAdr(response.data['tradeInfo']['ethereumAddress']);
        });
    };
    useEffect(() => {
        fetchUserDetails();
      });
  let { clientId } = useParams();
  return (
    <div style={{ display: 'flex', height: '80vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
           {userFirstName + ' ' + userLastName}
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to={"/userhome/"+clientId} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={"/createnft/"+clientId} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="plus">Create NFT</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={"/tradenft/"+clientId} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="coins">Trade NFT</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={"/deposit/"+clientId} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="wallet">Deposit Funds</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={"/deposit/"+clientId} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="hand-holding-usd">Withdraw Funds</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={"/transactionlist/"+clientId} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="list">Transaction List</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={"/profile/"+clientId} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/login" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="power-off">Sign Out</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <div class="container py-5" style={{backgroundColor: 'beige', paddingBottom: 100}}>
        <h3 style={{paddingLeft: 500, paddingTop: 0}}><b>Profile</b></h3>
    <div class="row">
        <div class="col-md-10 mx-auto">
            <form >
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label>Client Id</label>
                        <input type="text" value={clientIdVal} class="form-control" disabled="disabled"/>
                    </div>
                    <div class="col-sm-6">
                        <label>Trader Level</label>
                        <input type="text" value={traderLevel} class="form-control" disabled="disabled"/>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label>First Name</label>
                        <input type="text" value={userFirstName} class="form-control" disabled="disabled" />
                    </div>
                    <div class="col-sm-6">
                        <label>Last Name</label>
                        <input type="text" value={userLastName} class="form-control" disabled="disabled"/>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label>Phone Number</label>
                        <input type="text" value={phone} class="form-control" disabled="disabled"/>
                    </div>
                    <div class="col-sm-6">
                        <label>Cell Phone Number</label>
                        <input type="text" value={cellPhone} class="form-control" disabled="disabled"/>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label>Email</label>
                        <input type="text" value={email} class="form-control" disabled="disabled"/>
                    </div>
                    <div class="col-sm-6">
                        <label>Street Address</label>
                        <input type="text" value={address} class="form-control" disabled="disabled"/>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-6">
                        <label>City</label>
                        <input type="text" value={city} class="form-control" disabled="disabled" />
                    </div>
                    <div class="col-sm-3">
                        <label>State</label>
                        <input type="text" value={state} class="form-control" disabled="disabled"/>
                    </div>
                    <div class="col-sm-3">
                        <label>Zip Code</label>
                        <input type="text" value={zipcode} class="form-control" disabled="disabled"/>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-sm-12">
                        <label>Ethereum Address</label>
                        <input type="text" value={ethAdr} class="form-control" disabled="disabled"/>
                    </div>
                </div>
                
            </form>
        </div>
    </div>
</div>
              {/* <form className="login-form" aria-readonly={true} style={{height: 700}}>
                  <div className="form-container">
                      <h2 className="form-heading">Profile</h2>
                      <div className="form-body">
                          <div className="row">
                            <div className="col">
                            <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div className="col">
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          </div>
                            </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>
                          <div class="form-group row">
                              <label for="email" class="col-sm-2 col-form-label">Email</label>
                              <div class="col-sm-10">
                                  <input type="email" class="form-control-plaintext" id="email" value="support@tutlane.com" readonly />
                              </div>
                          </div>

                      </div>
                  </div>
                  <div>
                    gjkwfebjsb
                  </div>
              </form> */}
      </div>
  );
};

export default Profile;