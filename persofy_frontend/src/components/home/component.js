import TransactionTableComponent from '../transactionTable/component';
import AccountCardComponent from '../accountCard/component';
import NewAccountButtonComponent from '../newAccountButton/component';
import AccountCardData from '../accountCard/data';
import TransactionByMonthTableComponent from '../transactionByMonthTable/component';
import DuplicateTransactionsModalData from '../duplicateTransactionModal/data';
import DuplicateTransactionModalComponent from '../duplicateTransactionModal/component';
import TransactionTableData from '../transactionTable/data';


export default function HomeComponent() {
    const [accounts, setAccounts] = AccountCardData();
    const [dupTrxModal, setDupTrxModal] = DuplicateTransactionsModalData();
    const [transactions, setTransactions, selectedTransaction, setSelectedTransaction] = TransactionTableData();

    return (
        <>
            <DuplicateTransactionModalComponent 
                dupTrxModal={dupTrxModal} 
                setDupTrxModal={setDupTrxModal} 
                selectedTransaction={selectedTransaction}
                transactions={transactions}
                setTransactions={setTransactions}
                accounts={accounts}
            />

            <AccountCardComponent accounts={accounts}/>
            
            <NewAccountButtonComponent accounts={accounts} setAccounts={setAccounts}/>
            <TransactionTableComponent accounts={accounts} setDupTrxModal={setDupTrxModal} setSelectedTransaction={setSelectedTransaction}/>

            <br/>
            
            <TransactionByMonthTableComponent />
        </>
    )

}