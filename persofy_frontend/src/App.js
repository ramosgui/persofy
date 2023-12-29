import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal, Box, TextField, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

function App() {
    const [transacoes, setTransacoes] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [copyList, setCopyList] = useState([]);

    const [novaTransacao, setNovaTransacao] = useState({});

    // Função para lidar com mudanças nos inputs do formulário
    const handleInputChange = (e) => {
        setNovaTransacao({ ...novaTransacao, [e.target.name]: e.target.value });
    };

//    // Função para lidar com o envio do formulário
//    const handleSubmit = (e) => {
//        e.preventDefault();
//        // Adicione aqui a lógica para enviar dados ao servidor
//        setModalOpen(false);
//    };

    const formatarValorParaReal = (valor) => {
        return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };


    const requestSearch = (searched) => {
        const filteredItems = transacoes.filter((item) => {
            return item.description.toLowerCase().includes(searched.toLowerCase()) ||
                   item.category.toLowerCase().includes(searched.toLowerCase());
        });
        setCopyList(filteredItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Usando Axios para enviar os dados
        axios.post('http://127.0.0.1:5000/add_transaction', novaTransacao)
            .then(response => {
                // Tratar a resposta do servidor
                console.log(response.data);
                setModalOpen(false);

                // Atualizar a lista de transações (você pode querer recarregar os dados ou adicionar diretamente à lista)
                // Por exemplo:
                // setTransacoes([...transacoes, novaTransacao]);
                // setCopyList([...transacoes, novaTransacao]);
            })
            .catch(error => {
                // Tratar erros aqui
                console.error('Erro ao enviar transação', error);
            });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:5000')
            .then(response => {
                setTransacoes(response.data);
                setCopyList(response.data);
            })
            .catch(error => {
                console.error("Erro ao obter transações", error);
            });
    }, []);

    const style = {
    };

    return (
        <div style={{margin: '10px'}}>
            <h1>Gráfico de Barras</h1>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px'}}>


            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', marginBottom: '10px'}}>
            <Button style={{ marginRight: '20px' }} variant="contained" onClick={() => setModalOpen(true)}>Nova Transação</Button>


            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'right', marginBottom: '10px'}}>
                <TextField
            variant='outlined'
            placeholder='search...'
            type='search'
            onInput={(e) => requestSearch(e.target.value)}
          />

            </div>



            </div>


            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            >
                <Box sx={style}>
                    <h2>Nova Transação</h2>
                    <form onSubmit={handleSubmit}>
                        <TextField label="Data" type="date" name="date" onChange={handleInputChange} sx={{mb: 2}} fullWidth />
                        <TextField label="Descrição" type="text" name="description" onChange={handleInputChange} sx={{mb: 2}} fullWidth />
                        <TextField label="Valor" type="number" name="amount" onChange={handleInputChange} sx={{mb: 2}} fullWidth />
                        <TextField label="Categoria" type="text" name="category" onChange={handleInputChange} sx={{mb: 2}} fullWidth />
                        <Button type="submit" variant="contained">Adicionar</Button>
                    </form>
                </Box>
            </Modal>

            <Paper sx={{ overflow: 'hidden' }}>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Descrição</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Categoria</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {copyList.map((transacao, index) => (
                            <TableRow key={index}>
                                <TableCell>{transacao.date}</TableCell>
                                <TableCell>{transacao.description}</TableCell>
                                <TableCell>{formatarValorParaReal(transacao.amount)}</TableCell>
                                <TableCell>{transacao.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default App;
