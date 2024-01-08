import json
from typing import List

from model.financiamento_model import FinanciamentoModel
from repository.transaction_repository import TransactionRepository


class FinanciamentoRepository:

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

    def get_financiamentos(self) -> List[FinanciamentoModel]:
        account_models = []
        for data in self._get_data_from_json():
            transactions = self._transaction_repository.get_transactions_by_financiamento(data['id'])
            model = FinanciamentoModel(_id=data['id'], description=data['description'], amount=data['amount'],
                                       parcelas=data['parcelas'], dia_do_vencimento=data['dia_do_vencimento'],
                                       transactions=transactions, categoria=data['categoria'])
            account_models.append(model)
        return account_models
