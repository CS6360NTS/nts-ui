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

const CreateNFT = (name,eth,noOfCopies) => {
  const [nameForNft, setName] = useState("");
  const [ethForNft, setEth] = useState("");
  const [noOfCopiesForNft, setCopies] = useState("");
  const handleName = (event) => {
    setName(event.target.value);
  };
  const [userName, setUserName] = useState("");
    const fetchUserDetails = async () => {
      // let { clientId } = useParams();
      await axios
        .get("/nts/user?clientId="+`${clientId}`)
        .then((response) => {
          setUserName(response.data['userInfo']['firstName'] +", "+response.data['userInfo']['lastName']);
        });
    };
    useEffect(() => {
        fetchUserDetails();
      });
  const handleEth = (event) => {
    setEth(event.target.value);
  };
  const handleCopies = (event) => {
    setCopies(event.target.value);
  };
  const createNft = (e) => {
    e.preventDefault();
     axios
      .get("/nts/create/nfts?clientId="+`${clientId}`+"&name="+`${nameForNft}`+"&ethPrice="+`${ethForNft}`+"&noOfCopies="+`${noOfCopiesForNft}`)
      .then((response) => {
        if(response?.data?.serverResponse?.success)
        {
          window.location.href = "http://localhost:3000/userhome/"+`${clientId}`;
        }
      });
  };
  let { clientId } = useParams();
  return (
    <div style={{ display: 'flex', height: '80vh', overflow: 'scroll initial' }}>
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
            <NavLink exact to={"/deposit/"+clientId} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="hand-holding-usd">Withdraw Funds</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to={"/transactionlist/"+clientId} activeClassName="activeClicked">
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
      <form className="login-form">
              <div className="form-container">
                <h2 className="form-heading">Create NFT</h2><br />
                <div className="form-body">
                  <label>Name </label><br />
                  <input type="text" placeholder="Enter name"  onChange={handleName} required />
                  <br />
                  <label>No of copies </label><br />
                  <input type="number" min={1} max={1000} step={1} onChange={handleCopies} required  />
                  <br /><br />
                  <label>Price </label><br />
                  <input type="text"  onChange={handleEth} required />
                  <br /><br />
                  <button className="btn btn-primary" type="submit"  onClick={createNft}>Create</button><br /><br />
                </div>
              </div>
            </form>
    </div>
  );
};

export default CreateNFT;