import json
from typing import List

from model.account_model import AccountModel
from model.transaction_model import TransactionModel
from repository.transaction_repository import TransactionRepository


class AccountRepository:

    def __init__(self, file_path: str, trx_repo: TransactionRepository):
        self._file_path = file_path
        self._cached_data = self._get_data_from_json()
        self._transaction_repository = trx_repo

    def _get_data_from_json(self) -> List[dict]:
        with open(self._file_path, 'r') as file:
            data = json.load(file)
        return data

    def _save_file(self, data: List[dict]):
        with open(self._file_path, 'w') as file:
            json.dump(data, file, indent=4)

    def get_account(self) -> AccountModel:
        pass

    def get_accounts(self) -> List[AccountModel]:
        account_models = []
        for data in self._get_data_from_json():
            transactions = self._transaction_repository.get_transactions_by_account(data['description'])
            model = AccountModel(_id=data['id'], description=data['description'], saldo_inicial=data['saldo_inicial'],
                                 transactions=transactions)
            account_models.append(model)
        return account_models

    def create(self, account: AccountModel) -> dict:
        acc = account.as_dict()
        self._cached_data.append(acc)
        self._save_file(self._cached_data)
        return acc
