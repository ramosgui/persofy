import json
from typing import List

from model.transaction_model import TransactionModel


class TransactionRepository:

    def __init__(self, file_path: str):
        self._file_path = file_path
        self._cached_transactions = self._get_transactions_from_json()

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
                                     category=data['category'], parcela=data.get('parcela'), parcela_total=data.get('parcela_total'),
                                     ref=data.get('ref'), _id=data.get('id'))
            transaction_models.append(model)
        return transaction_models

    def delete_transaction(self, _id: str):
        transactions = self.get_transactions()
        for transaction in transactions:
            if transaction.id == _id:
                self._cached_transactions.remove(transaction.as_dict())
                self._save_file(self._cached_transactions)

    def create_transaction(self, new_transaction: TransactionModel):
        trx = new_transaction.as_dict()
        self._cached_transactions.append(trx)
        self._save_file(self._cached_transactions)
        return trx

    def create_transactions(self, new_transactions: List[TransactionModel]):
        for transaction in new_transactions:
            self._cached_transactions.append(transaction.as_dict())
        self._save_file(self._cached_transactions)
