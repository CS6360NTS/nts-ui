import {React,useState,useEffect} from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import axios from "axios";
import {
    useParams
  } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import './common.css';

const Deposit = () => {
    let { clientId } = useParams();
    const [creditEthAmount, setCreditAmountEth] = useState("");
    const [creditUSDAmount, setCreditAmountUSD] = useState("");
    const [userName, setUserName] = useState("");
    const fetchUserDetails = async () => {
      // let { clientId } = useParams();
      await axios
        .get("/nts/user?clientId="+`${clientId}`)
        .then((response) => {
          console.log();
          setUserName(response.data['userInfo']['firstName'] +", "+response.data['userInfo']['lastName']);
        });
    };
    useEffect(() => {
        fetchUserDetails();
      });
    const handleCreditAmountEth = (event) => {
        setCreditAmountEth(event.target.value);
    };
    const handleCreditAmountUSD= (event) => {
        setCreditAmountUSD(event.target.value);
    };
    const creditUSDToWallet = (e) => {
        e.preventDefault();
         axios
          .get("/nts/addMoneyFromBofa?clientId="+`${clientId}`+"&amount="+`${creditUSDAmount}`)
          .then((response) => {
            if(response.data['success'])
            {
              window.location.href = "http://localhost:3000/userhome/"+`${clientId}`;
            }
          });
      };
      const creditEthToWallet = (e) => {
        e.preventDefault();
         axios
          .get("/nts/addMoneyFromBofaToEthWallet?clientId="+`${clientId}`+"&amount="+`${creditEthAmount}`)
          .then((response) => {
            if(response.data['success'])
            {
              window.location.href = "http://localhost:3000/userhome/"+`${clientId}`;
            }
          });
      };
  return (
      <div class='row'>
          <div class='column-6' style={{ display: 'flex', height: '80vh', overflow: 'scroll initial' }}>
              <CDBSidebar textColor="#fff" backgroundColor="#333">
                  <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                      <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                          {userName}
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
                          <NavLink exact to={"/withdraw/"+clientId} activeClassName="activeClicked">
                              <CDBSidebarMenuItem icon="hand-holding-usd">Withdraw Funds</CDBSidebarMenuItem>
                          </NavLink>
                          <NavLink exact to={"/transactionlist/"+clientId} activeClassName="activeClicked">
                              <CDBSidebarMenuItem icon="list">Transaction List</CDBSidebarMenuItem>
                          </NavLink>
                          <NavLink exact to={"/profile/"+clientId} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>
                          <NavLink exact to="/login/" activeClassName="activeClicked">
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
              <div class="mini-container" style={{ paddingTop: '100px', paddingLeft: '75px', paddingRight: '100px', paddingBottom: '50px' }}>
                  <form className="deposit-form">
                      <div className="form-container">
                          <h2 className="form-heading">To Fiat Wallet</h2><br />
                          <div className="form-body">
                              <label>Amount </label><br />
                              <input type="text" placeholder="Enter amount in $" onChange={handleCreditAmountUSD} required />
                              <br />
                              <br/>
                              <button class="btn btn-success" type="submit" onClick={creditUSDToWallet}>Add to wallet</button><br /><br />
                          </div>
                      </div>
                  </form>
              </div>
              <div class="mini-container" style={{ paddingTop: '100px', paddingLeft: '75px', paddingRight: '100px', paddingBottom: '50px' }}>
                  <form className="deposit-form">
                      <div className="form-container">
                          <h2 className="form-heading">To Ethereum Wallet</h2><br />
                          <div className="form-body">
                              <label>Amount </label><br />
                              <input type="text" placeholder="Enter amount in $" onChange={handleCreditAmountEth} required />
                              <br /><br />
                              <button class="btn btn-success" type="submit" onClick={creditEthToWallet}>Add to wallet</button><br /><br />
                          </div>
                      </div>
                  </form>
              </div>
          </div>
        </div>
  );
};

export default Deposit;