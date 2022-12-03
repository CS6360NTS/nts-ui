import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import './common.css';

const Deposit = () => {
  return (
      <div class='row'>
          <div class='column-6' style={{ display: 'flex', height: '80vh', overflow: 'scroll initial' }}>
              <CDBSidebar textColor="#fff" backgroundColor="#333">
                  <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                      <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                          Username
                      </a>
                  </CDBSidebarHeader>
                  <CDBSidebarContent className="sidebar-content">
                      <CDBSidebarMenu>
                          <NavLink exact to="/userhome" activeClassName="activeClicked">
                              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                          </NavLink>
                          <NavLink exact to="/createnft" activeClassName="activeClicked">
                              <CDBSidebarMenuItem icon="plus">Create NFT</CDBSidebarMenuItem>
                          </NavLink>
                          <NavLink exact to="/tradenft" activeClassName="activeClicked">
                              <CDBSidebarMenuItem icon="coins">Trade NFT</CDBSidebarMenuItem>
                          </NavLink>
                          <NavLink exact to="/deposit" activeClassName="activeClicked">
                              <CDBSidebarMenuItem icon="wallet">Deposit Funds</CDBSidebarMenuItem>
                          </NavLink>
                          <NavLink exact to="/transactionlist" activeClassName="activeClicked">
                              <CDBSidebarMenuItem icon="list">Transaction List</CDBSidebarMenuItem>
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
              <div class="mini-container" style={{ paddingTop: '100px', paddingLeft: '75px', paddingRight: '100px', paddingBottom: '50px' }}>
                  <form className="deposit-form">
                      <div className="form-container">
                          <h2 className="form-heading">To Fiat Wallet</h2><br />
                          <div className="form-body">
                              <label>Amount </label><br />
                              <input type="text" placeholder="Enter amount" required />
                              <br />
                              <br/>
                              <button class="btn btn-success" type="submit">Add to wallet</button><br /><br />
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
                              <input type="text" placeholder="Enter amount" required />
                              <br /><br />
                              <button class="btn btn-success" type="submit">Add to wallet</button><br /><br />
                          </div>
                      </div>
                  </form>
              </div>
          </div>
        </div>
  );
};

export default Deposit;