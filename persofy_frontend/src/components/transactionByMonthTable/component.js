import { useState, useEffect, React } from 'react'

import { format, addMonths, addDays, subDays } from 'date-fns';

import TransactionByMonthTableData from './data'

import axios from 'axios';

import NewTransactionButtonComponent from '../newTransactionModal/component';

import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const formatarValorParaReal = (valor) => {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const getStyle = (value) => {
    console.log(format(new Date(), "yyyy-MM"))
    if (value.dt == format(new Date(), "yyyy-MM")) {
        return {backgroundColor: '#ccc'}
    }
}


export default function TransactionByMonthTableComponent(props) {

    const [monthInfo] = TransactionByMonthTableData();

    const {accounts} = props;

    // useEffect(() => {

    // }, [props])

    return (
        <>
        <div id="transactionByMonthTable">
            <TableContainer component={Paper} style={{width:'40%'}}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>DT</TableCell>
                            <TableCell>IN</TableCell>
                            <TableCell>OUT</TableCell>
                            <TableCell>Financiamento Restante</TableCell>
                            <TableCell>Balanço</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {monthInfo.map((month, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                style={getStyle(month)}
                            >
                                <TableCell>{month.dt}</TableCell>
                                <TableCell>{formatarValorParaReal(month.in)}</TableCell>
                                <TableCell>{formatarValorParaReal(month.out)}</TableCell>
                                <TableCell>{formatarValorParaReal(month.financiamento_restante)}</TableCell>
                                <TableCell>{formatarValorParaReal(month.in + month.out + month.financiamento_restante)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        
        </>
    )
}