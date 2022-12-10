import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  About,
  ContactUs,
  CreateNFT,
  Debit,
  Deposit,
  Footer,
  Header,
  Login,
  NavigationBar,
  Profile,
  Register,
  Sidebar,
  TradeNFT,
  UserHome,
} from "./components";
import ManagerDashboard from "./components/ManagerDashboard";
import TransactionList from "./components/TransactionList/TransactionList";
function App() {
  return (
    <Router>
      <Header />
      <NavigationBar />
      <Routes>
      <Route path="/" element={<About />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<ContactUs />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/userhome/:clientId" element={<UserHome />} />
        <Route path="/createnft/:clientId" element={<CreateNFT />} />
        <Route path="/tradenft/:clientId" element={<TradeNFT />} />
        <Route path="/transactionlist/:clientId" element={<TransactionList />} />
        <Route path="/deposit/:clientId" element={<Deposit/>}/>
        <Route path="/withdraw/:clientId" element={<Debit/>}/>
        <Route path="/managerDashboard/:clientId" element={<ManagerDashboard/>}/>
        <Route path="/profile/:clientId" element={<Profile/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
