import { useState, useEffect, React } from 'react'

import AccountCardData from './data'

import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const formatarValorParaReal = (valor) => {
    return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};


export default function FinanciamentoCardComponent(props) {

    const {financiamentos, handleModal} = props;

    const sendTransaction = (financiamento) => {
        handleModal({
            financiamento_id: financiamento.id,
            parcela: financiamento.parcelas_pagas + 1,
            category: financiamento.categoria,
            description: financiamento.description,
            amount: financiamento.amount / financiamento.parcelas,
            parcela_total: financiamento.parcelas,
            account_description: 'Iti',
            type: 'OUT'
        })
    }

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography> */}
                <Typography variant="h5" component="div">
                    Financiamentos 
                </Typography>
                
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography> */}
                {financiamentos.map((fin, index) => (
                    <>
                    <Typography variant="h6" component="div">
                        {fin.description} 
                    </Typography>
                    <Typography variant="body2">
                        Valor Total: {formatarValorParaReal(fin.amount)} 
                    </Typography>
                    <Typography variant="body2">
                        Total de parcelas: {fin.parcelas} 
                    </Typography>
                    <Typography variant="body2">
                        Dia do vencimento: {fin.dia_do_vencimento} 
                    </Typography>
                    <Typography variant="body2">
                        Valor da parcela: {formatarValorParaReal(fin.amount / fin.parcelas)} 
                    </Typography>
                    <Typography variant="body2">
                        Parcelas pagas: {fin.parcelas_pagas} 
                    </Typography>
                    <Typography variant="body2">
                        Parcelas restantes: {fin.parcelas - fin.parcelas_pagas} 
                    </Typography>
                    <Typography variant="body2">
                        Valor restante: {formatarValorParaReal(fin.amount-fin.parcelas_pagas*(fin.amount / fin.parcelas))} 
                    </Typography>
                    <Typography variant="body2">
                        Categoria: {fin.categoria} 
                    </Typography>
                    <Typography variant="body2">
                        Status: {fin.status} 
                    </Typography>
                    {fin.status === 'PENDENTE' || fin.status === 'ATRASADO' ? <Button style={{ marginRight: '20px' }} variant="contained" onClick={() => sendTransaction(fin)}>Cadastrar Pagamento</Button> : ""}
                    {/* <Typography variant="body2">
                        Saldo Inicial: {formatarValorParaReal(acc.saldo_inicial)} 
                    </Typography>
                    <Typography variant="body2">
                        Saída Total: {formatarValorParaReal(acc.total_do_valor_de_saida)}
                    </Typography>
                    <Typography variant="body2">
                        Balanco: {formatarValorParaReal(acc.total_balanco)}
                    </Typography> */}
                    </>
                ))}
            </CardContent>
        </Card>
    );
}