import { useState, useEffect, React } from 'react'
import axios from 'axios';

import { format, addMonths, addDays, toDate } from 'date-fns';

import { Button, Modal, Box, TextField, List, ListItem, IconButton, ListItemText, Switch, FormControlLabel, FormGroup, FormControl, MenuItem } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';


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


export default function DuplicateTransactionModalComponent(props) {

  const {transactions, setTransactions, accounts, selectedTransaction} = props;
  const [modalOpen, setModalOpen] = [props.dupTrxModal, props.setDupTrxModal];

  const [internalTransaction, setInternalTransaction] = useState({
    account_description: "",
    type: ""
  });

  const [batchInternalTransactions, setBatchInternalTransactions] = useState([]);

  const [parcelas, setParcelas] = useState([]);

  const handleInputChange = (e) => {
    setInternalTransaction({ ...internalTransaction, [e.target.name]: e.target.value });
  };

  const handleChangeParcelas = (e) => {
    // // setInternalTransaction({ ...internalTransaction, [e.target.name]: e.target.value });
    // // calcularParcelas();
    // console.log('internalTransaction', internalTransaction)
    // const valorParcela = internalTransaction.amount / e.target.value
    // console.log(valorParcela)

    const internalParcelas = e.target.value;

    console.log('internalTransaction', internalTransaction)

    console.log('parcelas', parcelas)

    // Cálculo do valor das parcelas
    if (internalTransaction.checked && internalTransaction.amount && internalTransaction.date) {
      const valorParcela = internalTransaction.amount / internalParcelas;

      console.log('valorParcela', valorParcela);

      var localNewTransactions = [];

      const novasParcelas = Array.from({ length: internalParcelas }, (_, i) => {
        const newDt = new Date(internalTransaction.date);
        const parcelaDt = format(addMonths(addDays(newDt, 1), i), 'yyyy-MM-dd');
        const valor = valorParcela.toFixed(2);

        localNewTransactions.push({
          ...internalTransaction,
          date: parcelaDt,
          amount: parseFloat(valor),
          parcela: i + 1,
          parcela_total: parseInt(internalParcelas)
        })

        return {
          valor: valor,
          data: parcelaDt
        };
      });
      console.log(novasParcelas)
      setParcelas(novasParcelas);
    } else {
      setParcelas([]);
    }

    setBatchInternalTransactions(localNewTransactions);

  };

  const adicionarTransacao = () => {
    axios.post('http://127.0.0.1:5000/transaction', internalTransaction)
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
    axios.post('http://127.0.0.1:5000/transactions', batchInternalTransactions)
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

    if (internalTransaction.checked) {
      adicionarTransacoes();
    } else {
      adicionarTransacao();
    }

  };

  useEffect(() => {
    // calcularParcelas();
    console.log("selectedTransaction:", selectedTransaction)
    // setInternalTransaction(selectedTransaction)

    if (Object.keys(selectedTransaction).length) {
      const localInternalTransaction = {...internalTransaction, ...{
        account_description: selectedTransaction.account_description
      }}
  
      console.log('localInternalTransaction', localInternalTransaction)
  
      setInternalTransaction({...internalTransaction, ...{
        account_description: selectedTransaction.account_description,
        type: selectedTransaction.type,
        date: selectedTransaction.date,
        description: selectedTransaction.description,
        amount: selectedTransaction.amount,
        category: selectedTransaction.category
      }})

    }
    
  }, [selectedTransaction, modalOpen]);

  return (
    <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
      <Box sx={style}>
        <h2>Duplicate Transaction</h2>
        <form onSubmit={handleSubmit}>
          {/* <TextField required InputLabelProps={{ shrink: true }} label="Data" type="date" name="date" onChange={handleInputChange} sx={{ mb: 2 }} fullWidth /> */}

          <TextField
            InputLabelProps={{ shrink: true }}
            label="Data"
            type="date"
            name="date"
            required
            onChange={handleInputChange}
            value={internalTransaction.date} // Use o valor do estado aqui
            sx={{ mb: 2 }}
            fullWidth
          />

          <TextField required value={internalTransaction.description} label="Descrição" type="text" name="description" onChange={handleInputChange} sx={{ mb: 2 }} fullWidth />
          <TextField required value={internalTransaction.amount} label="Valor" type="text" name="amount" onChange={(e) => { setInternalTransaction({ ...internalTransaction, amount: e.target.value }) }} sx={{ mb: 2 }} fullWidth />
          <TextField required value={internalTransaction.category} label="Categoria" type="text" name="category" onChange={handleInputChange} sx={{ mb: 2 }} fullWidth />

          <TextField
            select
            fullWidth
            required
            label="Conta"
            name="account_description"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            value={internalTransaction.account_description}
          >
            {accounts.map((account) => (
              <MenuItem key={account.id} value={account.description}>
                {account.description}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            fullWidth
            required
            label="Tipo"
            name="type"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            value={internalTransaction.type}
          >
            <MenuItem key="IN" value="IN">IN</MenuItem>
            <MenuItem key="OUT" value="OUT">OUT</MenuItem>

          </TextField>

          <FormControl component="fieldset">
            {/* <FormLabel component="legend">Label placement</FormLabel> */}
            <FormGroup aria-label="position" row>
              <FormControlLabel
                value="end"
                sx={{ mb: 2 }}
                control={<Switch
                  checked={internalTransaction.checked}
                  onChange={(e) => {setInternalTransaction({...internalTransaction, checked: e.target.checked})}}
                  inputProps={{ 'aria-label': 'controlled' }}
                  name='checked'
                />}
                label="Valor parcelado?"
                labelPlacement="end"
              />
            </FormGroup>


                <TextField label="Nº Parcelas" type="number" name="numParcelas" value={internalTransaction.numParcelas} onChange={handleChangeParcelas} fullWidth />
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



            <FormGroup aria-label="position" row>
              <Button type="submit" variant="contained">Create</Button>
            </FormGroup>

          </FormControl>

        </form>
      </Box>
    </Modal>
  )

}