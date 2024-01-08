from flask import Blueprint, jsonify, request, current_app
import uuid

from model.account_model import AccountModel

financiamento_blueprint = Blueprint('financiamento', __name__)


def create_account_model(description: str, saldo_inicial: float):
    _id = str(uuid.uuid4())
    transactions = current_app.transaction_repository.get_transactions_by_account(account_description=description)
    new_account = AccountModel(_id=_id, description=description, saldo_inicial=saldo_inicial, transactions=transactions)
    return new_account


@financiamento_blueprint.route('/account', methods=["POST"])
def create_financiamentos():
    description = request.json['description']
    saldo_inicial = request.json['saldo_inicial']

    new_account = create_account_model(description=description, saldo_inicial=saldo_inicial)
    current_app.account_repository.create(new_account)

    return jsonify({'msg': 'Conta criada com sucesso', 'item': new_account.as_dict()}), 200


@financiamento_blueprint.route('/financiamentos', methods=["GET"])
def get_financiamentos():
    accounts = current_app.financiamento_repository.get_financiamentos()
    formatted_accounts = [acc.as_dict() for acc in accounts] if accounts else []
    return jsonify(formatted_accounts), 200
