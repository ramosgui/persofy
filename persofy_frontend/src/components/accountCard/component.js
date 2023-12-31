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


export default function AccountCardComponent(props) {

    const {accounts} = props;

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography> */}
                <Typography variant="h5" component="div">
                    Accounts 
                </Typography>
                
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography> */}
                {accounts.map((acc, index) => (
                    <>
                    <Typography variant="h6" component="div">
                        {acc.description} 
                    </Typography>
                    <Typography variant="body2">
                        Saldo Inicial: {formatarValorParaReal(acc.saldo_inicial)} 
                    </Typography>
                    <Typography variant="body2">
                        Saída Total: {formatarValorParaReal(acc.total_do_valor_de_saida)}
                    </Typography>
                    <Typography variant="body2">
                        Balanco: {formatarValorParaReal(acc.total_balanco)}
                    </Typography>
                    </>
                ))}
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}