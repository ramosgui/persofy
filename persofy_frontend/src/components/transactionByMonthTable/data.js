

import { useState, useEffect } from 'react';
import axios from 'axios';


export default function TransactionByMonthTableData() {
    const [monthInfo, setMonthInfo] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/transactions_by_month')
            .then(response => {
                setMonthInfo(response.data);
                console.log(response.data);
                // setCopyList(response.data);
            })
            .catch(error => {
                console.error("Erro ao obter transações", error);
            });
    }, []);

    return [monthInfo, setMonthInfo];
}

