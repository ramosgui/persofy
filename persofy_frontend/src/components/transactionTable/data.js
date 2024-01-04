

import { useState, useEffect } from 'react';
import axios from 'axios';


function TransactionTableData() {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState({});

    

    return [transactions, setTransactions, selectedTransaction, setSelectedTransaction];
}

export default TransactionTableData;
