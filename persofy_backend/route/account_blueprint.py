from flask import Blueprint, jsonify, request
import json
import uuid
from model.transaction_model import TransactionModel
from repository.transaction_repository import TransactionRepository

transactions_blueprint = Blueprint('transactions', __name__)

transactions_repository = TransactionRepository('repository/transacoes.json')


def create_transaction_model(date: str, description: str, amount: float, category: str, parcela: int = None,
                             parcela_total: int = None, ref: str = None):
    _id = str(uuid.uuid4())
    return TransactionModel(_id=_id, date=date, description=description, amount=amount, category=category,
                            parcela=parcela, parcela_total=parcela_total, ref=ref)


@transactions_blueprint.route('/transaction', methods=['GET'])
def get_transaction():
    transactions = transactions_repository.get_transactions()
    formatted_transactions = [trx.as_dict() for trx in transactions]
    return jsonify(sorted(formatted_transactions, key=lambda d: d['date'], reverse=True)), 200


@transactions_blueprint.route('/transaction/<transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id: str):
    transactions_repository.delete_transaction(transaction_id)
    return jsonify("Registro removido com sucesso."), 200


@transactions_blueprint.route('/transaction', methods=['POST'])
def create_transaction():
    date = request.json['date']
    description = request.json['description']
    amount = request.json['amount']
    category = request.json['category']

    new_transaction = create_transaction_model(date=date, description=description,
                                               amount=amount, category=category)
    transactions_repository.create_transaction(new_transaction)
    return jsonify({'msg': 'Transação adicionada com sucesso', 'item': new_transaction.as_dict()}), 200


@transactions_blueprint.route('/transactions', methods=['POST'])
def create_transactions():
    transactions = json.loads(request.data)
    new_transactions = []

    ref = str(uuid.uuid4())
    for trx in transactions:
        new_transaction = create_transaction_model(date=trx['date'], description=trx['description'],
                                                   amount=trx['amount'], category=trx['category'], ref=ref,
                                                   parcela=trx['parcela'], parcela_total=trx['parcela_total'])
        new_transactions.append(new_transaction)
    transactions_repository.create_transactions(new_transactions)
    return jsonify({'msg': 'Transações adicionadas com sucesso.', 'items': [trx.as_dict() for trx in new_transactions]}), 200


