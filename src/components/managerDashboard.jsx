import React, { useEffect, useState } from "react";
import {
  useParams
} from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import moment from "moment";
import {FormControl} from 'react-bootstrap';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { NavLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Column } from "primereact/column";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import { Chart } from "react-google-charts";


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
const tradeStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const moneyStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const sty = {
  height: "100%",
    width: "160px",
    position: "fixed",
    zindex: "1",
    top: 0,
    left: 0,
    backgroundColor: "#111",
    overflowX: "hidden",
    paddingTop: "20px",
};

const ManagerDashboard = () => {
  var test;
  const [transactions, setTransactions] = useState([]);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);
  const [first1, setFirst1] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows1, setRows1] = useState(5);
  const [id, setId] = useState("");
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );
  let now = new Date();
  let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
  let end = moment(start).add(1, "days").subtract(1, "seconds");
  let ranges = {
      "Today Only": [moment(start), moment(end)],
      "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
      "Weekly": [moment(start).subtract(6, "days"), moment(end)],
      "Monthly": [moment(new Date(now.getFullYear(),now.getMonth(),1,0,0,0,0)), moment(end)]
  }
  let local = {
      "format":"YYYY-DD-MM",
      "sundayFirst" : false
  }
  let maxDate = moment(start).add(24, "hour")

  const [moneyInfo, setMoneyInfo] = useState([]);
  const [tradeInfo, setTradeInfo] = useState([]);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [moneyOpen, setMoneyOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [ethValue, setEthValue] = useState("");
  const [usdValue, setUSDValue] = useState("");
  const [ethCommissionAmount, setEthCommissionAmount] = useState(0);
  const [faitCommissionAmount, setFaitCommissionAmount] = useState(0);
  const [moneyTransactionCount, setMoneyTransactionCount] = useState(0);
  const [tradeTransactionCancellCount, setTradeTransactionCancellCount] = useState(0);
  const [tradeTransactionCount, setTradeTransactionCount] = useState(0);
  const [tradeTransactionSuccessCount, setTradeTransactionSuccessCount] = useState(0);

  const data1 = [
    ["Type", "Percentage share"],
    ["Money", moneyTransactionCount],
    ["Trade", tradeTransactionCount],
  ];
  
   const options1 = {
    title: "Percentage of money and trade transactions",
  };

  const data2 = [
    ["Type", "Percentage Share"],
    ["Success", moneyTransactionCount],
    ["Fail", 0],
  ];
  
   const options2 = {
    title: "Percentage of successful and failed money transactions",
  };

  const data3 = [
    ["Type", "Percentage Share"],
    ["Success", tradeTransactionSuccessCount],
    ["Fail", tradeTransactionCancellCount],
  ];

  const options3 = {
    title: "Percentage of successful and cancelled trade transactions",
  };

  let { clientId } = useParams();
  const fetchTransactionHistory = async () => {
    // let { clientId } = useParams();
    await axios
      .get("/nts/getAllTransactions")
      .then((response) => {
        setTransactions(response.data);
      });
  };
  const fetchUserDetails = async () => {
    // let { clientId } = useParams();
    await axios
      .get("/nts/user?clientId="+`${clientId}`)
      .then((response) => {
        console.log();
        setUserName(response.data['userInfo']['firstName'] +", "+response.data['userInfo']['lastName']);
        setEthValue(response.data['tradeInfo']['ethBalance'].toFixed(2));
        setUSDValue(response.data['tradeInfo']['balance'].toFixed(2));
      });
  };
  useEffect(() => {
    //applyCallback();
    let now = new Date();
    let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
    let end = moment(start).add(1, "days").subtract(1, "seconds");
    let start2 = moment(end).subtract(30,"days");
    applyCallback(start2,end);
    fetchUserDetails();
    fetchTransactionHistory();
    initFilters1();
  }, [id]);
  const applyCallback = (startDate, endDate) =>{
    axios
    .get("/nts/getManagerStatistics?startDate="+`${startDate.format("YYYY-MM-DD")}`+"&"+"endDate=" +`${endDate.format("YYYY-MM-DD")}`)
    .then((response) => {
      setEthCommissionAmount(response.data.ethCommissionAmount);
      setFaitCommissionAmount(response.data.faitCommissionAmount);
      setMoneyTransactionCount(response.data.moneyTransactionCount);
      setTradeTransactionCancellCount(response.data.tradeTransactionCancellCount);
      setTradeTransactionCount(response.data.tradeTransactionCount);
      setTradeTransactionSuccessCount(response.data.tradeTransactionSuccessCount);
    });
  };
  const handleClose = () => setTradeOpen(false);
  const handleMoneyClose = () => setMoneyOpen(false);
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
  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
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

  const onCustomPage1 = (event) => {
    setFirst1(event.first);
    setRows1(event.rows);
    setCurrentPage(event.page + 1);
  };
  const template1 = {
    layout:
      "PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport",
    PrevPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Previous</span>
          <Ripple />
        </button>
      );
    },
    NextPageLink: (options) => {
      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
          disabled={options.disabled}
        >
          <span className="p-3">Next</span>
          <Ripple />
        </button>
      );
    },
    PageLinks: (options) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={options.onClick}
        >
          {options.page + 1}
          <Ripple />
        </button>
      );
    },
    RowsPerPageDropdown: (options) => {
      const dropdownOptions = [
        { label: 5, value: 5 },
        { label: 10, value: 10 },
        { label: 15, value: 15 },
        { label: "All", value: options.totalRecords },
      ];

      return (
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      );
    },
    CurrentPageReport: (options) => {
      return (
        <span
          className="mx-3"
          style={{ color: "var(--text-color)", userSelect: "none" }}
        >
          Go to{" "}
          <InputText
            size="2"
            className="ml-1"
            value={currentPage}
            tooltip={pageInputTooltip}
            onKeyDown={(e) => onPageInputKeyDown(e, options)}
            onChange={onPageInputChange}
          />
        </span>
      );
    },
  };
  const onPageInputKeyDown = (event, options) => {
    if (event.key === "Enter") {
      const page = parseInt(currentPage);
      if (page < 1 || page > options.totalPages) {
        setPageInputTooltip(
          `Value must be between 1 and ${options.totalPages}.`
        );
      } else {
        const first = currentPage ? options.rows * (page - 1) : 0;

        setFirst1(first);
        setPageInputTooltip("Press 'Enter' key to go to this page.");
      }
    }
  };

  const onPageInputChange = (event) => {
    setCurrentPage(event.target.value);
  };
  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue1("");
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
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
           {userName}
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to={"/userhome/"+clientId} activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
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
      
      <div height="100%" display="inline">
      <h3 style={{paddingTop:10,paddingLeft:20}}><b>Welcome,  {userName} !</b></h3>
      <div className="row">
      <div className="col-5"  style={{paddingLeft:30}}>
        <DateTimeRangeContainer 
                        ranges={ranges}
                        start={start}
                        end={end}
                        local={local}
                        maxDate={maxDate}
                        applyCallback={applyCallback}
          >    
                        <FormControl
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Choose the Date range, by default it is monthly"
                        /> 
          </DateTimeRangeContainer>
        </div>
      </div>
          <div className="row">
            <div className="col-4">
            <Chart
      chartType="PieChart"
      data={data1}
      options={options1}
      width={"100%"}
      height={"200px"}
        />

            </div>

            <div className="col-4">
            <Chart
      chartType="PieChart"
      data={data2}
      options={options2}
      width={"100%"}
      height={"200px"}
        />
            </div>
            <div className="col-4">
            <Chart
      chartType="PieChart"
      data={data3}
      options={options3}
      width={"100%"}
      height={"200px"}
        />
            </div>
          </div>
      <div className="row" style={{paddingLeft:22}}>
        <div className="col-4">
          <h3 class="display-7"><b>Commission Balance</b></h3>
        </div>
        <div className="col">
        <h4><b>USD:</b> {faitCommissionAmount}$</h4>
        </div>
        <div className="col">
        <h4><b>ETH:</b> {ethCommissionAmount} Ξ</h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
        <h3 class="display-7" style={{paddingLeft:20}}><b>Transaction History</b></h3>
        </div>
      </div>
      <div class="row" style={{paddingBottom:100}}>
        <div className="col-*" style={{paddingLeft:24}}>
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
        paginator
        paginatorTemplate={template1}
        first={first1}
        rows={rows1}
        onPage={onCustomPage1}
      >
        <Column field="transactionId" header="Transaction Id" sortable></Column>
        <Column field="client_id" header="Client Id" sortable></Column>
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
          <Box sx={tradeStyle}>
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
          <Box sx={moneyStyle}>
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
        
      </div>
      </div>
      </div>
  );
};

export default ManagerDashboard;