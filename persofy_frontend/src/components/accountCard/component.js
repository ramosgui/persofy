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


// const formatarValorParaReal = (valor) => {
//     return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
// };

// const formatarDescricao = (transaction) => {
//     if (transaction.parcela_total) {
//         return "(" + transaction.parcela + "/" + transaction.parcela_total + ") " + transaction.description
//     }
//     return transaction.description
// }

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


export default function AccountCardComponent() {

    const [accounts, setAccounts] = AccountCardData();

    // return (
    //     <div id="transactionTable">
    //         <TableContainer component={Paper}>
    //             <Table size="small" aria-label="a dense table">
    //                 <TableHead>
    //                     <TableRow>
    //                         <TableCell>#</TableCell>
    //                         <TableCell>Id</TableCell>
    //                         <TableCell>Ref</TableCell>
    //                         <TableCell>Data</TableCell>
    //                         <TableCell>Descrição</TableCell>
    //                         <TableCell>Valor</TableCell>
    //                         <TableCell>Categoria</TableCell>
    //                         <TableCell></TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {transactions.map((transacao, index) => (
    //                         <TableRow
    //                             key={index}
    //                             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //                         >
    //                             <TableCell>{index + 1}</TableCell>
    //                             <TableCell>{transacao.id}</TableCell>
    //                             <TableCell>{transacao.ref}</TableCell>
    //                             <TableCell>{transacao.date}</TableCell>
    //                             <TableCell>{formatarDescricao(transacao)}</TableCell>
    //                             <TableCell>{formatarValorParaReal(transacao.amount)}</TableCell>
    //                             <TableCell>{transacao.category}</TableCell>
    //                             <TableCell>
    //                                 <IconButton onClick={() => handleDelete(transacao.id)}>
    //                                     <DeleteIcon />
    //                                 </IconButton>
    //                             </TableCell>
    //                         </TableRow>
    //                     ))}
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>
    //     </div>
    // )

    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}