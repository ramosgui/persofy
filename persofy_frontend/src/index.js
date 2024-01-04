import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomeComponent from './components/home/component';


function App() {
  return (
    <Router>
      {/* <Navigation /> */}
      <Routes>
        {/* <Route path="/budget" element={<BudgetComponent data={budgetData} />} /> */}
        <Route path="/" element={<HomeComponent />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/csv_reader" element={<CsvReader transactions={transactions} setTransactions={setTransactions} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />}>
          <Route path="" element={<Posts />} />
          <Route path=":postSlug" element={<Post />} />
        </Route> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  )
}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
