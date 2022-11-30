import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {About, ContactUs, Header, Login, NavigationBar, Footer,UserPage, Sidebar, UserHome, CreateNFT, TradeNFT, TransactionList} from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Header/>
    <NavigationBar/>
    <Routes>
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/userpage" element={<UserPage />} />
      <Route path='/sidebar' element={<Sidebar/>} />
      <Route path='/userhome' element={<UserHome/>}/>
      <Route path='/createnft' element={<CreateNFT/>}/>
      <Route path='/tradenft' element={<TradeNFT/>}/>
      <Route path='/transactionlist' element={<TransactionList/>}/>

    </Routes>
  <Footer/>
  </Router>

);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
