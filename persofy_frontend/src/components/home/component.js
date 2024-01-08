import TransactionTableComponent from '../transactionTable/component';
import AccountCardComponent from '../accountCard/component';
import NewAccountButtonComponent from '../newAccountButton/component';
import AccountCardData from '../accountCard/data';
import TransactionByMonthTableComponent from '../transactionByMonthTable/component';
import DuplicateTransactionsModalData from '../duplicateTransactionModal/data';
import DuplicateTransactionModalComponent from '../duplicateTransactionModal/component';
import TransactionTableData from '../transactionTable/data';
import FinanciamentoCardData from '../financiamentoCard/data';
import FinanciamentoCardComponent from '../financiamentoCard/component';
import GenericTransactionModalData from '../genericTransactionModel/data';
import GenericTransactionModel from '../genericTransactionModel/component';

// efetivar apenas quando alertar o recorrente



export default function HomeComponent() {
    const [accounts, setAccounts] = AccountCardData();
    const [financiamentos, setFinanciamentos] = FinanciamentoCardData();
    const [dupTrxModal, setDupTrxModal] = DuplicateTransactionsModalData();
    const [transactions, setTransactions, selectedTransaction, setSelectedTransaction] = TransactionTableData();

    const [modalOpen, setModalOpen, externalInfo, handleModal] = GenericTransactionModalData();
    

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginBottom: '20px' }}>
                <AccountCardComponent accounts={accounts} />
                <FinanciamentoCardComponent financiamentos={financiamentos} handleModal={handleModal}/>
            </div>

            <GenericTransactionModel modalOpen={modalOpen} setModalOpen={setModalOpen} accounts={accounts} externalInfo={externalInfo}/>

            <DuplicateTransactionModalComponent
                dupTrxModal={dupTrxModal}
                setDupTrxModal={setDupTrxModal}
                selectedTransaction={selectedTransaction}
                transactions={transactions}
                setTransactions={setTransactions}
                accounts={accounts}
            />

            <NewAccountButtonComponent accounts={accounts} setAccounts={setAccounts} />
            <TransactionTableComponent accounts={accounts} setDupTrxModal={setDupTrxModal} setSelectedTransaction={setSelectedTransaction} />

            <br />

            <TransactionByMonthTableComponent />
        </>
    )

}