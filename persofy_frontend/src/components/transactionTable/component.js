import { useState, useEffect, React } from 'react'

import TransactionTableData from './data'

import axios from 'axios';

import NewTransactionButtonComponent from '../newTransactionModal/component';

import TablePagination from '@mui/material/TablePagination';

import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, TextField } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';


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
    const [internalTransactions, setInternalTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { accounts } = props;

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/transactions')
            .then(response => {
                setTransactions(response.data);
                setInternalTransactions(response.data);
            })
            .catch(error => {
                console.error("Erro ao obter transações", error);
            });
    }, []);

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

    const handleDuplicate = (transacao) => {
        props.setDupTrxModal(true);
        props.setSelectedTransaction(transacao);
    };

    const handleSearch = (value) => {
        console.log(value)
        setSearchTerm(value);

        if (!value) {
            setInternalTransactions(transactions)
            return
        }

        const filteredTransactions = transactions.filter(transacao =>
            transacao.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transacao.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transacao.date.includes(searchTerm)
        )

        setInternalTransactions(filteredTransactions)

    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <NewTransactionButtonComponent transactions={internalTransactions} setTransactions={setTransactions} accounts={accounts} />
                <TextField
                    label="Buscar"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    sx={{ mb: 2 }}
                />
            </div>
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
                            {internalTransactions
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((transacao, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{transacao.id}</TableCell>
                                        <TableCell>{transacao.ref}</TableCell>
                                        <TableCell>{transacao.type}</TableCell>
                                        <TableCell>{transacao.date}</TableCell>
                                        <TableCell>{formatarDescricao(transacao)}</TableCell>
                                        <TableCell>{formatarValorParaReal(transacao.amount)}</TableCell>
                                        <TableCell>{transacao.category}</TableCell>
                                        <TableCell>{transacao.account_description}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => handleDuplicate(transacao)}>
                                                <FileCopyIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(transacao.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={internalTransactions.length}
                        page={page}
                        onPageChange={(event, newPage) => setPage(newPage)}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={(event) => {
                            setRowsPerPage(parseInt(event.target.value, 10));
                            setPage(0);
                        }}
                    />
                </TableContainer>
            </div>

        </>
    )
}