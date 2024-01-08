import { useState, useEffect, React } from 'react'
import { format, addMonths, addDays } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';

import axios from 'axios';

import NewTransactionButtonData from './data';

import { Button, Modal, Box, TextField, List, ListItem, IconButton, ListItemText, Switch, FormControlLabel, FormGroup, FormControl, MenuItem } from '@mui/material';

import CommentIcon from '@mui/icons-material/Comment';


export default function GenericTransactionModel(props) {

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

  const [parcelas, setParcelas] = useState([]);
  const [checked, setChecked] = useState(false);
  const [switchStatus, setSwitchStatus] = useState(false);

  const {modalOpen, setModalOpen, externalInfo, accounts} = props;

  const dataHoje = format(new Date(), 'yyyy-MM-dd');

  const [newTransactions, setNewTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: dataHoje,
    recorrenteFlag: false
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
        // setTransactions([...transactions, response.data.item]);
        setModalOpen(false);
      })
      .catch(error => {
        console.error('Erro ao enviar transação', error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionarTransacao()
    console.log(newTransaction);
  };

  useEffect(() => {
    setNewTransaction(externalInfo)
  }, [props])



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
          ...newTransaction,
          date: parcelaDt,
          amount: parseFloat(valor),
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

  const handleChangeRecorrenteFlag = (e) => {
    setNewTransaction({...newTransaction, recorrenteFlag: e.target.checked})
    if (e.target.checked) {
      setSwitchStatus(true)
      setChecked(false)
    } else {
      setSwitchStatus(false)
    }
    
  };


  return (
    <div id="genericTransactionModel">
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
              required
              onChange={handleInputChange} 
              value={newTransaction.date} // Use o valor do estado aqui
              sx={{ mb: 2 }}
              fullWidth 
            />

            <TextField 
              required 
              label="Descrição" 
              type="text" 
              name="description" 
              onChange={handleInputChange} 
              sx={{ mb: 2 }}
              fullWidth
              value={newTransaction.description}
              disabled
            />

            <TextField 
              required 
              label="Valor" 
              type="text" 
              name="amount" 
              onChange={(e) => {setNewTransaction({...newTransaction, amount: parseFloat(e.target.value)})}} 
              sx={{ mb: 2 }} 
              fullWidth
              value={newTransaction.amount}
              disabled
            />

            <TextField 
              required 
              label="Categoria" 
              type="text" 
              name="category" 
              onChange={handleInputChange} 
              sx={{ mb: 2 }} 
              fullWidth
              value={newTransaction.category}
              disabled
            />

            <TextField
                fullWidth
                required
                label="Conta"
                name="account_description"
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                value={"Iti"}
                disabled
            />

            <TextField
                fullWidth
                required
                disabled
                label="Tipo"
                name="type"
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                value={newTransaction.type}
            />

            <TextField
                fullWidth
                required
                disabled
                label="Parcela"
                name="type"
                sx={{ mb: 2 }}
                value={"("+newTransaction.parcela+"/"+newTransaction.parcela_total+")"}
            />

            <FormGroup aria-label="position" row>
              <Button type="submit" variant="contained">Create</Button>
            </FormGroup>

          </form>
        </Box>
      </Modal>

    </div>

  )
}