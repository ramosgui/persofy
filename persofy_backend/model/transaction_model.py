
class TransactionModel:

    def __init__(self, date, description, amount, category):
        self._date = date
        self._description = description
        self._amount = amount
        self._category = category

    @property
    def date(self):
        return self._date

    @property
    def description(self) -> str:
        if len(self._description) > 100:
            raise ValueError("Descrição deve ter menos de 100 caracteres.")
        return self._description

    @property
    def amount(self) -> float:
        try:
            return float(self._amount)
        except ValueError:
            raise ValueError("Valor deve ser um número.")

    @property
    def category(self) -> str:
        return self._category
