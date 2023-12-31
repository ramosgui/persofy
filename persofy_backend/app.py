import json
import uuid

from flask import Flask, request, jsonify
from domain import Grafico
from flask_cors import CORS
import infrastructure as infra
from model.account_model import AccountModel
from model.transaction_model import TransactionModel
from repository.transaction_repository import TransactionRepository

from repository.account_repository import AccountRepository
from route.account_blueprint import accounts_blueprint
from route.transaction_blueprint import transactions_blueprint

# app = Flask(__name__)
# CORS(app)
# dados_mockados = {'Janeiro': 10, 'Fevereiro': 30, 'Março': 20, 'Abril': 25}
# grafico = Grafico(dados_mockados)
#
# transactions_repository = TransactionRepository('repository/jsons/transacoes.json')
# account_repository = AccountRepository('repository/jsons/contas.json')
#
#
# @app.route('/', methods=['GET', 'POST'])
# def home():
#     meses = dados_mockados.keys()
#     bar_chart = None
#
#     transactions = transactions_repository.get_transactions()
#
#     if request.method == 'POST':
#         selected_months = request.form.getlist('meses')
#         dados_filtrados = grafico.obter_dados_para_meses(selected_months)
#         bar_chart = infra.gerar_grafico_barras(dados_filtrados)
#
#     formatted_transactions = [trx.as_dict() for trx in transactions]
#
#     return jsonify(sorted(formatted_transactions, key=lambda d: d['date'], reverse=True) ), 200
#
#
# app.register_blueprint(transactions_blueprint)
# app.register_blueprint(accounts_blueprint)


class AppConfig:

    def __init__(self):
        pass

    def create_app(self):
        app = Flask(__name__)
        CORS(app)
        app.register_blueprint(transactions_blueprint)
        app.register_blueprint(accounts_blueprint)

        trx_repo = TransactionRepository('repository/jsons/transacoes.json')
        app.transaction_repository = trx_repo
        app.account_repository = AccountRepository('repository/jsons/contas.json', trx_repo)

        return app


if __name__ == '__main__':
    app = AppConfig().create_app()
    app.run()
