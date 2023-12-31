import { useState, useEffect, React } from 'react'
import { format, addMonths, addDays } from 'date-fns';

import axios from 'axios';

import NewTransactionButtonData from './data';

import { Button, Modal, Box, TextField, List, ListItem, IconButton, ListItemText, Switch, FormControlLabel, FormGroup, FormControl } from '@mui/material';

import CommentIcon from '@mui/icons-material/Comment';


export default function NewTransactionButtonComponent(props) {

  const {transactions, setTransactions} = props;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };


  const [modalOpen, setModalOpen] = NewTransactionButtonData();

  const [parcelas, setParcelas] = useState([]);
  const [checked, setChecked] = useState(false);

  const dataHoje = format(new Date(), 'yyyy-MM-dd');

  const [newTransactions, setNewTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: dataHoje
  });

  const handleInputChange = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
    console.log({ ...newTransaction, [e.target.name]: e.target.value })
  };

  const handleChangeParcelas = (e) => {
      setChecked(e.target.checked);
      setNewTransaction({ ...newTransaction, [e.target.name]: e.target.checked });
      console.log({ ...newTransaction, [e.target.name]: e.target.checked })      
  };
  


  const adicionarTransacao = () => {
    axios.post('http://127.0.0.1:5000/transaction', newTransaction)
      .then(response => {
        console.log(response.data);
        setTransactions([...transactions, response.data.item]);
        setModalOpen(false);
      })
      .catch(error => {
        console.error('Erro ao enviar transação', error);
      });
  }

  const adicionarTransacoes = () => {
    axios.post('http://127.0.0.1:5000/transactions', newTransactions)
      .then(response => {
        console.log(response.data);
        setTransactions([...transactions, ...response.data.items]);
        setModalOpen(false);
      })
      .catch(error => {
        console.error('Erro ao enviar transação', error);
      });
  }


  const handleSubmit = (e) => {
    // adicionarTransacao(e
    e.preventDefault();

    if (checked) {
      console.log(newTransactions);
      adicionarTransacoes();

    } else {
      console.log(newTransaction);
      adicionarTransacao();
    }

  };

  useEffect(() => {
    calcularParcelas();
  }, [checked, newTransaction]);

  // Função para calcular o valor das parcelas
  const calcularParcelas = () => {
    // Cálculo do valor das parcelas
    if (checked && newTransaction.amount && newTransaction.date) {
      const valorParcela = newTransaction.amount / newTransaction.numParcelas;

      var localNewTransactions = [];

      const novasParcelas = Array.from({ length: newTransaction.numParcelas }, (_, i) => {
        const newDt = new Date(newTransaction.date);
        const parcelaDt = format(addMonths(addDays(newDt, 1), i), 'yyyy-MM-dd');
        const valor = valorParcela.toFixed(2);

        localNewTransactions.push({
          date: parcelaDt,
          amount: parseFloat(valor),
          description: newTransaction.description,
          category: newTransaction.category,
          parcela: i + 1,
          parcela_total: parseInt(newTransaction.numParcelas)
        })

        return {
          valor: valor,
          data: parcelaDt
        };
      });
      setParcelas(novasParcelas);
    } else {
      setParcelas([]);
    }

    setNewTransactions(localNewTransactions);
  };


  return (
    <div id="newTransactionButton">
      <Button style={{ marginRight: '20px' }} variant="contained" onClick={() => setModalOpen(true)}>New Transaction</Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <h2>New Transaction</h2>
          <form onSubmit={handleSubmit}>
            {/* <TextField required InputLabelProps={{ shrink: true }} label="Data" type="date" name="date" onChange={handleInputChange} sx={{ mb: 2 }} fullWidth /> */}

            <TextField 
              InputLabelProps={{ shrink: true }} 
              label="Data" 
              type="date" 
              name="date" 
              onChange={handleInputChange} 
              value={newTransaction.date} // Use o valor do estado aqui
              sx={{ mb: 2 }}
              fullWidth 
            />

            <TextField required label="Descrição" type="text" name="description" onChange={handleInputChange} sx={{ mb: 2 }} fullWidth />
            <TextField required label="Valor" type="text" name="amount" onChange={(e) => {setNewTransaction({...newTransaction, amount: parseFloat(e.target.value)})}} sx={{ mb: 2 }} fullWidth />
            <TextField required label="Categoria" type="text" name="category" onChange={handleInputChange} sx={{ mb: 2 }} fullWidth />


            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Label placement</FormLabel> */}
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  value="end"
                  control={<Switch
                    checked={checked}
                    onChange={handleChangeParcelas}
                    inputProps={{ 'aria-label': 'controlled' }}
                    name='switch_parcelas'
                  />}
                  label="Valor parcelado?"
                  labelPlacement="end"
                />
              </FormGroup>

              {checked && (
                <>
                  <TextField label="Nº Parcelas" type="number" name="numParcelas" value={newTransaction.numParcelas} onChange={handleInputChange} fullWidth />
                  <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {parcelas.map((parcela, index) => (
                      <ListItem
                        key={index}
                        disableGutters
                        secondaryAction={
                          <IconButton aria-label="comment">
                            <CommentIcon />
                          </IconButton>
                        }
                      >
                        <ListItemText primary={`Parcela ${index + 1}: R$ ${parcela.valor} - ${parcela.data}`} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}


              <FormGroup aria-label="position" row>
                <Button type="submit" variant="contained">Create</Button>
              </FormGroup>

            </FormControl>

          </form>
        </Box>
      </Modal>

    </div>

  )
}