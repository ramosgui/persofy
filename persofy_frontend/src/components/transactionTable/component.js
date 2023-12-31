import { useState, useEffect, React } from 'react'

import TransactionTableData from './data'

import axios from 'axios';

import NewTransactionButtonComponent from '../newTransactionButton/component';

import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const formatarValorParaReal = (valor) => {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const formatarDescricao = (transaction) => {
    if (transaction.parcela_total) {
        return "(" + transaction.parcela + "/" + transaction.parcela_total + ") " + transaction.description
    }
    return transaction.description
}


export default function TransactionTableComponent(props) {

    const [transactions, setTransactions] = TransactionTableData();

    const {accounts} = props;

    // useEffect(() => {

    // }, [props])

    const handleDelete = (transacaoId) => {
        // Enviar solicitação de delete para o servidor
        axios.delete(`http://127.0.0.1:5000/transaction/${transacaoId}`)
            .then(response => {
                // Remover a transação da lista de transações local
                setTransactions(transactions.filter(transacao => transacao.id !== transacaoId));
                console.log(response.data);
            })
            .catch(error => {
                console.error('Erro ao deletar transação', error);
            });
    };

    return (
        <>
        <NewTransactionButtonComponent transactions={transactions} setTransactions={setTransactions} accounts={accounts}/>
        <div id="transactionTable">
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Id</TableCell>
                            <TableCell>Ref</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Conta</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transacao, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{transacao.id}</TableCell>
                                <TableCell>{transacao.ref}</TableCell>
                                <TableCell>{transacao.type}</TableCell>
                                <TableCell>{transacao.date}</TableCell>
                                <TableCell>{formatarDescricao(transacao)}</TableCell>
                                <TableCell>{formatarValorParaReal(transacao.amount)}</TableCell>
                                <TableCell>{transacao.category}</TableCell>
                                <TableCell>{transacao.account_description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDelete(transacao.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
        </>
    )
}