

import { useState, useEffect } from 'react';
import axios from 'axios';


function TransactionTableData() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000')
            .then(response => {
                setTransactions(response.data);
                console.log(response.data);
                // setCopyList(response.data);
            })
            .catch(error => {
                console.error("Erro ao obter transações", error);
            });
    }, []);

    return [transactions, setTransactions];
}

export default TransactionTableData;
