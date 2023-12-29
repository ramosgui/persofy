import json
from typing import List

from persofy.model.transaction_model import TransactionModel


class TransactionRepository:

    def __init__(self, file_path: str):
        self._file_path = file_path

    def get_transactions(self) -> List[TransactionModel]:
        with open(self._file_path, 'r') as file:
            transacoes_data = json.load(file)
            return [TransactionModel(**data) for data in transacoes_data]

    def add_transaction(self, new_transaction: TransactionModel):
        try:
            with open(self._file_path, 'r') as file:
                transactions = json.load(file)
        except FileNotFoundError:
            transactions = []

        transactions.append({
            'date': new_transaction.date,
            'description': new_transaction.description,
            'amount': new_transaction.amount,
            'category': new_transaction.category
        })

        with open(self._file_path, 'w') as file:
            json.dump(transactions, file, indent=4)
