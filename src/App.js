import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  About,
  ContactUs,
  Header,
  Login,
  NavigationBar,
  Footer,
  UserPage,
  Sidebar,
  UserHome,
  CreateNFT,
  TradeNFT,
  Deposit,
} from "./components";
import TransactionList from "./components/TransactionList/TransactionList";
function App() {
  const [login, setLogin] = useState(false);
  return (
    <Router>
      <Header />
      <NavigationBar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/createnft" element={<CreateNFT />} />
        <Route path="/tradenft" element={<TradeNFT />} />
        <Route path="/transactionlist" element={<TransactionList />} />
        <Route path="/deposit" element={<Deposit/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
