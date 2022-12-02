import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { NavLink } from "react-router-dom";
import { Column } from "primereact/column";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "./Transaction.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [moneyInfo, setMoneyInfo] = useState([]);
  const [tradeInfo, setTradeInfo] = useState([]);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [moneyOpen, setMoneyOpen] = useState(false);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);
  const [id, setId] = useState("");
  var test;
  const handleClose = () => setTradeOpen(false);
  const handleMoneyClose = () => setMoneyOpen(false);
  const fetchTransactionHistory = async () => {
    await axios
      .get("/nts/getAllTransactionsByClientId?clientId=1")
      .then((response) => {
        setTransactions(response.data);
      });
  };
  useEffect(() => {
    fetchTransactionHistory();
    initFilters1();
  }, [id]);

  const clearFilter1 = () => {
    initFilters1();
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue1("");
  };
  const dateTemplate = (rowdata, data) => {
    return (
      <text
        primitive="span"
        style={{ "text-decoration": "underline", cursor: "pointer" }}
        onClick={() => hyperLinkClicked(rowdata, data)}
      >
        {rowdata[data.field]}
      </text>
    );
  };
  const getMoneyData = async () => {
    console.log(test, "in get method");
    console.log(id);
    await axios
      .get(
        "/nts/getAllMoneyTransactionsByTransactionId?transactionId=" + `${test}`
      )
      .then((response) => {
        setMoneyInfo(response.data);
      });
  };
  const getTradeData = async () => {
    await axios
      .get(
        "/nts/getAllTradeTransactionsByTransactionId?transactionId=" + `${test}`
      )
      .then((response) => {
        setTradeInfo(response.data);
      });
  };
  const hyperLinkClicked = (rowdata, data) => {
    setId(rowdata.transactionId);
    test = rowdata.transactionId;
    console.log(test, "in set method");
    console.log(rowdata.transactionId);
    if (rowdata[data.field] == "Money") {
      getMoneyData(rowdata.transactionId);
      setMoneyOpen(true);
    } else {
      getTradeData();
      setTradeOpen(true);
    }
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;
    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };
  const header1 = renderHeader1();

  return (
    <div
      style={{ display: "flex", height: "80vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
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
            <NavLink
              exact
              to="/transactionlist"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="list">
                Transaction List
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/login" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="power-off">Sign Out</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          ></div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <DataTable
        value={transactions}
        responsiveLayout="scroll"
        header={header1}
        filters={filters1}
        globalFilterFields={[
          "transactionType",
          "transactionStatus",
          "transaction_date",
          "transactionTime",
          "transactionId",
        ]}
      >
        <Column field="transactionId" header="Transaction Id" sortable></Column>
        <Column
          field="transactionType"
          header="Transaction Type"
          sortable
          body={dateTemplate}
        ></Column>
        <Column
          field="transactionStatus"
          header="Transaction Status"
          sortable
        ></Column>
        <Column
          field="transaction_date"
          header="Transaction Date"
          sortable
        ></Column>
        <Column
          field="transactionTime"
          header="Transaction Time"
          sortable
        ></Column>
      </DataTable>

      <Modal
        open={tradeOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {tradeOpen && tradeInfo.length !== 0 ? (
          <Box sx={style}>
            <DataTable value={tradeInfo} responsiveLayout="scroll">
              <Column
                field="tradeTransactionType"
                header="Trade Transaction Type"
                sortable
              ></Column>
              <Column
                field="ethereumValue"
                header="Ethereum Value"
                sortable
              ></Column>
              <Column
                field="commissionType"
                header="CommissionType"
                sortable
              ></Column>
              <Column field="nftAddress" header="NFT Address" sortable></Column>
              <Column
                field="buyerEthereumAddress"
                header="Buyer Ethereum Address"
                sortable
              ></Column>
              <Column
                field="sellerEthereumAddress"
                header="Seller Ethereum Address"
                sortable
              ></Column>
            </DataTable>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography>No Data Found</Typography>
          </Box>
        )}
      </Modal>
      <Modal
        open={moneyOpen}
        onClose={handleMoneyClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {moneyOpen ? (
          <Box sx={style}>
            <table>
              <tr>
                <th>Name</th>
                <th>Info</th>
              </tr>
              <tr>
                <td>Transaction Id</td>
                <td>{moneyInfo.transactionId}</td>
              </tr>
              <tr>
                <td>Amount</td>
                <td>{moneyInfo.amount}</td>
              </tr>
              <tr>
                <td>Payment Address</td>
                <td>{moneyInfo.paymentAddress}</td>
              </tr>
              <tr>
                <td>Money Transaction Type</td>
                <td>{moneyInfo.moneyTransactionType}</td>
              </tr>
              <tr>
                <td>Eth Usd Value</td>
                <td>{moneyInfo.ethUsdValue}</td>
              </tr>
              <tr>
                <td>Trans Desc</td>
                <td>{moneyInfo.transDesc}</td>
              </tr>
            </table>
          </Box>
        ) : (
          <Box sx={style}>
            <Typography>No Data Found</Typography>
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default TransactionList;
