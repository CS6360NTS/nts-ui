import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Ripple } from "primereact/ripple";
import { Dropdown } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { NavLink } from "react-router-dom";
import { Column } from "primereact/column";
import axios from "axios";

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

const TradeNFT = () => {
  const [transactions, setTransactions] = useState([]);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);
  const [first1, setFirst1] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rows1, setRows1] = useState(5);
  const [id, setId] = useState("");
  const [selectedRows, setSelectedRows] = useState(null);
  const [pageInputTooltip, setPageInputTooltip] = useState(
    "Press 'Enter' key to go to this page."
  );

  var test;
  const fetchTransactionHistory = async () => {
    await axios
      .get("/nts/get/trade/nft?clientId=1004")
      .then((response) => {
        console.log(response)
        setTransactions(response.data['nfts']);
      });
  };
  useEffect(() => {
    fetchTransactionHistory();
    initFilters1();
  }, [id]);

  const buynft = () => {
    console.log(this.selectedRows);
  }


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
        <Button type="button" label="Buy" onClick={buynft}></Button>
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
          "tokenId",
          "name",
          "description",
          "ethPrice",
        ]}
        paginator
        paginatorTemplate={template1}
        first={first1}
        rows={rows1}
        onPage={onCustomPage1}
        width="100px"
        selection={selectedRows} onSelectionChange={e => setSelectedRows(e.value)}
      >
        
        <Column selectionMode="multiple" selectionAriaLabel="name" headerStyle={{ width: '3em' }}></Column>
        <Column
          field="tokenId"
          header="Token Id"
        ></Column>
        <Column
          field="name"
          header="Name"
        ></Column>
        <Column
          field="description"
          header="Description"
        ></Column>
        <Column
          field="ethPrice"
          header="Ethereum Price"
        ></Column>
      </DataTable>
    </div>
  );
};

 export default TradeNFT;



// import React from "react";

// const Users = [
//   {
//     id: 1,
//     selected: false,
//     name: "Leanne Graham",
//     email: "Sincere@april.biz",
//     phone: "1-770-736-8031 x56442",
//     website: "hildegard.org",
//   },
//   {
//     id: 2,
//     selected: false,
//     name: "Ervin Howell",
//     email: "Shanna@melissa.tv",
//     phone: "010-692-6593 x09125",
//     website: "anastasia.net",
//   },
//   {
//     id: 3,
//     selected: false,
//     name: "Clementine Bauch",
//     email: "Nathan@yesenia.net",
//     phone: "1-463-123-4447",
//     website: "ramiro.info",
//   },
//   {
//     id: 4,
//     selected: true,
//     name: "Patricia Lebsack",
//     email: "Julianne.OConner@kory.org",
//     phone: "493-170-9623 x156",
//     website: "kale.biz",
//   },
//   {
//     id: 5,
//     selected: false,
//     name: "Chelsey Dietrich",
//     email: "Lucio_Hettinger@annie.ca",
//     phone: "(254)954-1289",
//     website: "demarco.info",
//   },
// ];

// class TradeNFT extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       List: Users,
//       MasterChecked: false,
//       SelectedList: [],
//     };
//   }

//   // Select/ UnSelect Table rows
//   onMasterCheck(e) {
//     let tempList = this.state.List;
//     // Check/ UnCheck All Items
//     tempList.map((user) => (user.selected = e.target.checked));

//     //Update State
//     this.setState({
//       MasterChecked: e.target.checked,
//       List: tempList,
//       SelectedList: this.state.List.filter((e) => e.selected),
//     });
//   }

//   // Update List Item's state and Master Checkbox State
//   onItemCheck(e, item) {
//     let tempList = this.state.List;
//     tempList.map((user) => {
//       if (user.id === item.id) {
//         user.selected = e.target.checked;
//       }
//       return user;
//     });

//     //To Control Master Checkbox State
//     const totalItems = this.state.List.length;
//     const totalCheckedItems = tempList.filter((e) => e.selected).length;

//     // Update State
//     this.setState({
//       MasterChecked: totalItems === totalCheckedItems,
//       List: tempList,
//       SelectedList: this.state.List.filter((e) => e.selected),
//     });
//   }

//   // Event to get selected rows(Optional)
//   getSelectedRows() {
//     this.setState({
//       SelectedList: this.state.List.filter((e) => e.selected),
//     });
//   }

//   render() {
//     return (
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th scope="col">
//                     <input
//                       type="checkbox"
//                       className="form-check-input"
//                       checked={this.state.MasterChecked}
//                       id="mastercheck"
//                       onChange={(e) => this.onMasterCheck(e)}
//                     />
//                   </th>
//                   <th scope="col">Name</th>
//                   <th scope="col">Email</th>
//                   <th scope="col">Phone</th>
//                   <th scope="col">Website</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.List.map((user) => (
//                   <tr key={user.id} className={user.selected ? "selected" : ""}>
//                     <th scope="row">
//                       <input
//                         type="checkbox"
//                         checked={user.selected}
//                         className="form-check-input"
//                         id="rowcheck{user.id}"
//                         onChange={(e) => this.onItemCheck(e, user)}
//                       />
//                     </th>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>{user.phone}</td>
//                     <td>{user.website}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <button
//               className="btn btn-primary"
//               onClick={() => this.getSelectedRows()}
//             >
//               Get Selected Items {this.state.SelectedList.length} 
//             </button>
//             <div className="row">
//               <b>All Row Items:</b>
//               <code>{JSON.stringify(this.state.List)}</code>
//             </div>
//             <div className="row">
//               <b>Selected Row Items(Click Button To Get):</b>
//               <code>{JSON.stringify(this.state.SelectedList)}</code>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default TradeNFT;























//   return (
//     <div style={{ display: 'flex', height: '80vh', overflow: 'scroll initial' }}>
//       <CDBSidebar textColor="#fff" backgroundColor="#333">
//         <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
//           <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
//             Username
//           </a>
//         </CDBSidebarHeader>

//         <CDBSidebarContent className="sidebar-content">
//           <CDBSidebarMenu>
//             <NavLink exact to="/userhome" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/createnft" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="plus">Create NFT</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/tradenft" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="coins">Trade NFT</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/transactionlist" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="list">Transaction List</CDBSidebarMenuItem>
//             </NavLink>
//             <NavLink exact to="/login" activeClassName="activeClicked">
//               <CDBSidebarMenuItem icon="power-off">Sign Out</CDBSidebarMenuItem>
//             </NavLink>
//           </CDBSidebarMenu>
//         </CDBSidebarContent>

//         <CDBSidebarFooter style={{ textAlign: 'center' }}>
//           <div
//             style={{
//               padding: '20px 5px',
//             }}
//           >
//           </div>
//         </CDBSidebarFooter>
//       </CDBSidebar>
//       <div style={{ height: 400, width: '100%' }}>
//       {/* <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       /> */}
      
//     </div>
//     </div>
//   );
// };


