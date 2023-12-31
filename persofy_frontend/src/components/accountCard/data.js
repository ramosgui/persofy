

import { useState, React } from 'react'
import { useEffect } from 'react';
import axios from 'axios';


function AccountCardData() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/accounts')
            .then(response => {
                setAccounts(response.data);
                console.log(response.data);
                // setCopyList(response.data);
            })
            .catch(error => {
                console.error("Erro ao obter contas", error);
            });
    }, []);

    return [accounts, setAccounts]
}

export default AccountCardData;
