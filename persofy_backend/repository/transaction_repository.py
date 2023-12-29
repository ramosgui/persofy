import json
from typing import List

from model.transaction_model import TransactionModel


class TransactionRepository:

    def __init__(self, file_path: str):
        self._file_path = file_path

    def _get_transactions_from_json(self) -> List[dict]:
        with open(self._file_path, 'r') as file:
            transaction_data = json.load(file)
        return transaction_data

    def _save_file(self, transactions_data: List[dict]):
        with open(self._file_path, 'w') as file:
            json.dump(transactions_data, file, indent=4)

    def get_transactions(self) -> List[TransactionModel]:
        return [TransactionModel(**data) for data in self._get_transactions_from_json()]

    def add_transaction(self, new_transaction: TransactionModel):
        transactions = self._get_transactions_from_json()

        transactions.append({
            'date': new_transaction.date,
            'description': new_transaction.description,
            'amount': new_transaction.amount,
            'category': new_transaction.category
        })

        self._save_file(transactions)
