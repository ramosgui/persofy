from datetime import date, timedelta, datetime

from dateutil.relativedelta import relativedelta
from flask import Blueprint, jsonify, request, current_app
import json
import uuid
from repository.transaction_repository import TransactionRepository

transactions_blueprint = Blueprint('transactions', __name__)


@transactions_blueprint.route('/transactions', methods=['GET'])
def get_transactions():
    transactions = current_app.transaction_repository.get_transactions()
    formatted_transactions = [trx.as_dict() for trx in transactions]
    return jsonify(sorted(formatted_transactions, key=lambda d: d['date'], reverse=True)), 200


def _create_month_range():
    primeiro_dia_do_mes_atual = date.today().replace(day=1)

    months = []

    # criar lista de 5 meses para tras
    for idx in range(6):
        dt = primeiro_dia_do_mes_atual - relativedelta(months=idx)
        months.append(dt.strftime("%Y-%m"))

    for idx in range(7):
        dt = primeiro_dia_do_mes_atual + relativedelta(months=idx)
        months.append(dt.strftime("%Y-%m"))

    sorted_months = (sorted(set(months)))

    mapped_months = {month: {
        "in": 0,
        "out": 0,
        "financiamento_restante": 0
    } for month in sorted_months}

    return mapped_months


@transactions_blueprint.route('/transactions_by_month', methods=['GET'])
def get_transactions_by_month():

    mapped_months = _create_month_range()
    transactions = current_app.transaction_repository.get_transactions()
    financiamentos = current_app.financiamento_repository.get_financiamentos()

    for trx in transactions:
        try:
            key = trx.date[0:7]
            mapped_months[key][trx.type.lower()] += trx.amount
            # mapped_months[key]['balance'] += trx.amount
        except KeyError as e:
            pass

    for fin in financiamentos:
        for k, v in fin.parcelas_restantes.items():
            dt = datetime.strftime(k, "%Y-%m-%d")[0:7]
            try:
                if mapped_months[dt]:
                    try:
                        mapped_months[dt]['financiamento_restante'] = mapped_months[dt]['financiamento_restante'] + v*-1
                    except KeyError as e:
                        mapped_months[dt]['financiamento_restante'] = v*-1
            except KeyError as e:
                pass

    formatted_months = [{'dt': x, **y} for x, y in mapped_months.items()]

    print(formatted_months)

    return jsonify(formatted_months), 200


@transactions_blueprint.route('/transaction/<transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id: str):
    current_app.transaction_repository.delete_transaction(transaction_id)
    return jsonify("Registro removido com sucesso."), 200


@transactions_blueprint.route('/transaction', methods=['POST'])
def create_transaction():
    date = request.json['date']
    description = request.json['description']
    amount = request.json['amount']
    category = request.json['category']
    _type = request.json['type']
    account_description = request.json['account_description']
    financiamento_id = request.json.get('financiamento_id')
    parcela = request.json.get('parcela')
    parcela_total = request.json.get('parcela_total')

    created_trx = current_app.transaction_repository.create_transaction(
        date=date, _type=_type, description=description, category=category, amount=amount,
        account_description=account_description, financiamento_id=financiamento_id, parcela=parcela,
        parcela_total=parcela_total
    )

    return jsonify({'msg': 'Transação adicionada com sucesso', 'item': created_trx.as_dict()}), 200


@transactions_blueprint.route('/transactions', methods=['POST'])
def create_transactions():
    transactions = json.loads(request.data)
    new_transactions = []

    for trx in transactions:
        new_transactions.append(dict(date=trx['date'], description=trx['description'],
                                     amount=trx['amount'], category=trx['category'],
                                     parcela=trx['parcela'], parcela_total=trx['parcela_total'],
                                     type=trx['type'], account_description=trx['account_description']))

    created_trxs = current_app.transaction_repository.create_transactions(new_transactions)

    return jsonify({'msg': 'Transações adicionadas com sucesso.', 'items': [trx.as_dict() for trx in created_trxs]}), 200
