import TransactionTableComponent from '../transactionTable/component';
import AccountCardComponent from '../accountCard/component';
import NewAccountButtonComponent from '../newAccountButton/component';
import AccountCardData from '../accountCard/data';
import TransactionByMonthTableComponent from '../transactionByMonthTable/component';





export default function HomeComponent() {
    const [accounts, setAccounts] = AccountCardData();

    return (
        <>
            <AccountCardComponent accounts={accounts}/>
            
            <NewAccountButtonComponent accounts={accounts} setAccounts={setAccounts}/>
            <TransactionTableComponent accounts={accounts}/>
            <br/>
            <TransactionByMonthTableComponent />
        </>
    )

}