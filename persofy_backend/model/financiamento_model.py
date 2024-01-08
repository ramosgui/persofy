from datetime import datetime, timedelta
from typing import List

from dateutil.relativedelta import relativedelta

from model.transaction_model import TransactionModel


class FinanciamentoModel:

    def __init__(self, _id: str, description: str, amount: float, parcelas: int, dia_do_vencimento: int,
                 categoria: str, transactions: List[TransactionModel] = None):
        self._id = _id
        self._description = description
        self._amount = amount
        self._parcelas = parcelas
        self._dia_do_vencimento = dia_do_vencimento
        self._transacoes = transactions
        self._categoria = categoria

    @staticmethod
    def _add_months(current_date, months_to_add):
        new_date = datetime(current_date.year + (current_date.month + months_to_add - 1) // 12,
                            (current_date.month + months_to_add - 1) % 12 + 1,
                            current_date.day, current_date.hour, current_date.minute, current_date.second)
        return new_date

    @property
    def id(self):
        return self._id

    @property
    def description(self) -> str:
        return self._description

    @property
    def amount(self) -> float:
        return self._amount

    @property
    def parcelas(self) -> int:
        return self._parcelas

    @property
    def transactions(self) -> List[TransactionModel]:
        return self._transacoes

    @property
    def dia_do_vencimento(self) -> int:
        return self._dia_do_vencimento

    @property
    def parcelas_pagas(self) -> int:
        return len(self._transacoes)

    @property
    def parcelas_restantes(self) -> dict:
        dias = {}
        parcelas_restantes = self.parcelas - self.parcelas_pagas
        if self._transacoes:
            dt_ultima_parcela = datetime.strptime(sorted([x.date for x in self._transacoes])[-1], '%Y-%m-%d')
            for i in range(parcelas_restantes):
                dias[self._add_months(dt_ultima_parcela, i+1)] = self.valor_da_parcela

        print(self.description, dias)

        return dias

    @property
    def status(self):
        today = datetime.now().day
        primeiro_dia_do_mes = datetime.now().replace(day=1)

        data_de_vencimento = datetime(2024, 1, today)

        for trx in self._transacoes:
            dt_obj = datetime.strptime(trx.date, '%Y-%m-%d')
            if primeiro_dia_do_mes <= dt_obj <= data_de_vencimento:
                return 'PAGO :)'

        if today <= self.dia_do_vencimento:
            return 'PENDENTE'
        return 'ATRASADO'

    @property
    def categoria(self) -> str:
        return self._categoria

    @property
    def valor_da_parcela(self) -> float:
        return self.amount / self.parcelas

    def as_dict(self) -> dict:
        _dict = {
            'id': self.id,
            'description': self.description,
            'amount': self.amount,
            'parcelas': self.parcelas,
            'dia_do_vencimento': self.dia_do_vencimento,
            'parcelas_pagas': self.parcelas_pagas,
            'status': self.status,
            'categoria': self.categoria,
            'valor_da_parcela': self.valor_da_parcela
        }

        if self._transacoes:
            _dict['transactions'] = [trx.as_dict() for trx in self._transacoes]

        return _dict
