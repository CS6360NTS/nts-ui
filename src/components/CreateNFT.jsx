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

const CreateNFT = () => {
  return (
    <div style={{ display: 'flex', height: '80vh', overflow: 'scroll initial' }}>
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
      <div class="mini-container" style={{paddingTop: '50px',paddingLeft: '300px',paddingRight: '200px',paddingBottom: '50px'}}>
        <form className="login-form">
          <div className="form-container">
            <h2 className="form-heading">Create NFT</h2><br />
            <div className="form-body">
              <label>Name </label><br />
              <input type="text" placeholder="Enter name" required />
              <br /><br/>
              <label>No of copies </label><br />
              <input type="number" min={1} max={1000} step={1} required />
              <br /><br />
              <label>Price </label><br />
              <input type="text" required />
              <br /><br />
              <button class="btn btn-primary" type="submit">Create</button><br /><br />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;