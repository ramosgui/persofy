import json
import uuid
from typing import List

from model.transaction_model import TransactionModel


class TransactionRepository:

    def __init__(self, file_path: str):
        self._file_path = file_path
        self._cached_transactions = self._get_transactions_from_json()

    @staticmethod
    def _create_new_transaction_model(date: str, _type: str, description: str, amount: float, category: str,
                                      account_description: str, parcela: int = None, parcela_total: int = None,
                                      ref: str = None):
        _id = str(uuid.uuid4())
        amount = float(amount)

        if amount > 0 and _type == 'OUT':
            amount = amount*-1

        return TransactionModel(_id=_id, date=date, description=description, amount=amount, category=category,
                                parcela=parcela, parcela_total=parcela_total, ref=ref,
                                account_description=account_description, _type=_type)

    def _get_transactions_from_json(self) -> List[dict]:
        with open(self._file_path, 'r') as file:
            transaction_data = json.load(file)
        return transaction_data

    def _save_file(self, transactions_data: List[dict]):
        with open(self._file_path, 'w') as file:
            json.dump(transactions_data, file, indent=4)

    def get_transactions(self) -> List[TransactionModel]:
        transaction_models = []
        for data in self._get_transactions_from_json():
            model = TransactionModel(date=data['date'], description=data['description'], amount=data['amount'],
                                     category=data['category'], parcela=data.get('parcela'),
                                     parcela_total=data.get('parcela_total'),
                                     ref=data.get('ref'), _id=data.get('id'), account_description=data.get('account_description'),
                                     _type=data.get('type'))
            transaction_models.append(model)
        return transaction_models

    def delete_transaction(self, _id: str):
        transactions = self._cached_transactions
        for transaction in transactions:
            if transaction['id'] == _id:
                self._cached_transactions.pop(transactions.index(transaction))
                self._save_file(self._cached_transactions)

    def create_transaction(self, date: str, _type: str, description: str, amount: float, category: str,
                           account_description: str) -> TransactionModel:
        new_trx_model = self._create_new_transaction_model(date=date, _type=_type, description=description,
                                                           amount=amount, category=category,
                                                           account_description=account_description)
        self._cached_transactions.append(new_trx_model.as_dict())
        self._save_file(self._cached_transactions)
        return new_trx_model

    def create_transactions(self, new_transactions: List[dict]):
        ref = str(uuid.uuid4())
        created_transactions = []
        for transaction in new_transactions:
            new_trx_model = self._create_new_transaction_model(
                date=transaction['date'], _type=transaction['type'], description=transaction['description'],
                amount=transaction['amount'], category=transaction['category'], parcela=transaction['parcela'],
                parcela_total=transaction['parcela_total'], ref=ref,
                account_description=transaction['account_description']
            )
            self._cached_transactions.append(new_trx_model.as_dict())
            created_transactions.append(new_trx_model)
        self._save_file(self._cached_transactions)
        return created_transactions

    def get_transactions_by_account(self, account_description: str) -> List[TransactionModel]:
        account_transactions = []
        transactions = self.get_transactions()
        for trx in transactions:
            if trx.account_description == account_description:
                account_transactions.append(trx)
        return account_transactions
