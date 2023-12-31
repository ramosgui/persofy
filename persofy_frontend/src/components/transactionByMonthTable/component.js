import { useState, useEffect, React } from 'react'

import TransactionByMonthTableData from './data'

import axios from 'axios';

import NewTransactionButtonComponent from '../newTransactionButton/component';

import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const formatarValorParaReal = (valor) => {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};


export default function TransactionByMonthTableComponent(props) {

    const [monthInfo] = TransactionByMonthTableData();

    const {accounts} = props;

    // useEffect(() => {

    // }, [props])

    return (
        <>
        <div id="transactionByMonthTable">
            <TableContainer component={Paper} style={{width:'30%'}}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>DT</TableCell>
                            <TableCell>IN</TableCell>
                            <TableCell>OUT</TableCell>
                            <TableCell>Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {monthInfo.map((month, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{month.dt}</TableCell>
                                <TableCell>{formatarValorParaReal(month.in)}</TableCell>
                                <TableCell>{formatarValorParaReal(month.out)}</TableCell>
                                <TableCell>{formatarValorParaReal(month.balance)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
        </>
    )
}