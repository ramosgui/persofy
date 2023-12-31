from typing import List

from model.transaction_model import TransactionModel


class AccountModel:

    def __init__(self, _id: str, description: str, saldo_inicial: float, transactions: List[TransactionModel] = None):
        self._id = _id
        self._description = description
        self._saldo_inicial = saldo_inicial
        self._transactions = transactions

    @property
    def id(self):
        return self._id

    @property
    def description(self) -> str:
        if len(self._description) > 100:
            raise ValueError("Descrição deve ter menos de 100 caracteres.")
        return self._description

    @property
    def saldo_inicial(self) -> float:
        return self._saldo_inicial

    @property
    def transactions(self) -> List[TransactionModel]:
        return self._transactions

    @property
    def total_do_valor_de_saida(self) -> float:
        amount = 0
        for trx in self._transactions:
            if trx.type == 'OUT':
                amount += trx.amount
        return amount

    @property
    def total_do_valor_de_entrada(self) -> float:
        amount = 0
        for trx in self._transactions:
            if trx.type == 'IN':
                amount += trx.amount
        return amount

    @property
    def total_balanco(self):
        return self.saldo_inicial + self.total_do_valor_de_entrada + self.total_do_valor_de_saida

    def as_dict(self) -> dict:
        _dict = {
            'id': self.id,
            'description': self.description,
            'saldo_inicial': self.saldo_inicial,
            'total_do_valor_de_saida': self.total_do_valor_de_saida,
            'total_do_valor_de_entrada': self.total_do_valor_de_entrada,
            'total_balanco': self.total_balanco
        }

        if self._transactions:
            _dict['transactions'] = [trx.as_dict() for trx in self._transactions]

        return _dict
