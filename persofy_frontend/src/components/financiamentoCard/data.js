

import { useState, React } from 'react'
import { useEffect } from 'react';
import axios from 'axios';


function FinanciamentoCardData() {
    const [financiamentos, setFinanciamentos] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/financiamentos')
            .then(response => {
                console.log(response.data)
                setFinanciamentos(response.data);
                // setInternalTransactions(response.data);
            })
            .catch(error => {
                console.error("Erro ao obter transações", error);
            });
    }, []);

    return [financiamentos, setFinanciamentos]
}

export default FinanciamentoCardData;
