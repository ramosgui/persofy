from flask import Flask, request, jsonify
from domain import Grafico
from flask_cors import CORS
import infrastructure as infra
from model.transaction_model import TransactionModel
from repository.transaction_repository import TransactionRepository

app = Flask(__name__)
CORS(app)
dados_mockados = {'Janeiro': 10, 'Fevereiro': 30, 'Março': 20, 'Abril': 25}
grafico = Grafico(dados_mockados)

repository = TransactionRepository('repository/transacoes.json')


@app.route('/', methods=['GET', 'POST'])
def home():
    meses = dados_mockados.keys()
    bar_chart = None

    transactions = repository.get_transactions()

    if request.method == 'POST':
        selected_months = request.form.getlist('meses')
        dados_filtrados = grafico.obter_dados_para_meses(selected_months)
        bar_chart = infra.gerar_grafico_barras(dados_filtrados)

    formatted_transactions = [{
        "description": trx.description,
        "date": trx.date,
        "amount": trx.amount,
        "category": trx.category
    } for trx in transactions]

    return jsonify(formatted_transactions), 200


@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    date = request.json['date']
    description = request.json['description']
    amount = request.json['amount']
    category = request.json['category']

    try:
        new_transaction = TransactionModel(date=date, description=description, amount=amount, category=category)
        repository.add_transaction(new_transaction)
        return 'Transação adicionada com sucesso!'
    except ValueError as e:
        return str(e), 400


if __name__ == '__main__':
    app.run(debug=True)
