
class TransactionModel:

    def __init__(self, _id: str, date, description, amount, category, account_description: str, _type: str,
                 parcela: int = None, parcela_total: int = None, ref: str = None):
        self._id = _id
        self._date = date
        self._description = description
        self._amount = amount
        self._category = category
        self._parcela = parcela
        self._parcela_total = parcela_total
        self._ref = ref
        self._account_description = account_description
        self._type = _type

    @property
    def account_description(self) -> str:
        return self._account_description

    @property
    def id(self):
        return self._id

    @property
    def type(self):
        return self._type

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

    @property
    def parcela(self) -> int:
        return self._parcela

    @property
    def parcela_total(self) -> int:
        return self._parcela_total

    @property
    def ref(self) -> str:
        return self._ref

    def as_dict(self) -> dict:
        return {
            'id': self.id,
            'date': self.date,
            'description': self.description,
            'amount': self.amount,
            'category': self.category,
            'parcela': self.parcela,
            'parcela_total': self.parcela_total,
            'ref': self.ref,
            'account_description': self.account_description,
            'type': self.type
        }
