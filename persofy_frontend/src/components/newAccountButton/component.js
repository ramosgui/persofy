import { useState, React } from 'react'

import axios from 'axios';

import NewAccountButtonData from './data';

import { Button, Modal, Box, TextField, List, ListItem, IconButton, ListItemText, Switch, FormControlLabel, FormGroup, FormControl, MenuItem } from '@mui/material';



export default function NewAccountButtonComponent(props) {

  const {accounts, setAccounts} = props;

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


  const [modalOpen, setModalOpen] = NewAccountButtonData();
  const [newAccount, setNewAccount] = useState({});

  const handleInputChange = (e) => {
    setNewAccount({ ...newAccount, [e.target.name]: e.target.value });
    console.log({ ...newAccount, [e.target.name]: e.target.value })
  };

  // const handleChangeParcelas = (e) => {
  //     setChecked(e.target.checked);
  //     setNewTransaction({ ...newTransaction, [e.target.name]: e.target.checked });
  //     console.log({ ...newTransaction, [e.target.name]: e.target.checked })      
  // };

  const adicionarAccount = () => {
    axios.post('http://127.0.0.1:5000/account', newAccount)
      .then(response => {
        console.log(response.data);
        setAccounts([...accounts, response.data.item]);
        setModalOpen(false);
      })
      .catch(error => {
        console.error('Erro ao enviar transação', error);
      });
  }

  const handleSubmit = (e) => {
    // adicionarTransacao(e
    e.preventDefault();
    console.log(newAccount);
    adicionarAccount();
  };

  // useEffect(() => {
  //   calcularParcelas();
  // }, [checked, newTransaction]);

  return (
    <div id="newAccountButton">
      <Button style={{ marginRight: '20px' }} variant="contained" onClick={() => setModalOpen(true)}>New Account</Button>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={style}>
          <h2>New Account</h2>
          <form onSubmit={handleSubmit}>
            {/* <TextField required InputLabelProps={{ shrink: true }} label="Data" type="date" name="date" onChange={handleInputChange} sx={{ mb: 2 }} fullWidth /> */}

            {/* <TextField 
              InputLabelProps={{ shrink: true }} 
              label="Data" 
              type="date" 
              name="date" 
              onChange={handleInputChange} 
              value={newTransaction.date} // Use o valor do estado aqui
              sx={{ mb: 2 }}
              fullWidth 
            /> */}

            <TextField required label="Descrição" type="text" name="description" onChange={handleInputChange} sx={{ mb: 2 }} fullWidth />
            <TextField required label="Saldo Inicial" type="text" name="saldo_inicial" onChange={(e) => {setNewAccount({...newAccount, saldo_inicial: parseFloat(e.target.value)})}} sx={{ mb: 2 }} fullWidth />
            {/* <TextField required label="Categoria" type="text" name="category" onChange={handleInputChange} sx={{ mb: 2 }} fullWidth /> */}

            <Button type="submit" variant="contained">Create</Button>
          </form>
        </Box>
      </Modal>

    </div>

  )
}