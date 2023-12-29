from flask import Flask, render_template, request
from domain import Grafico
import infrastructure as infra
from persofy.model.transaction_model import TransactionModel
from persofy.repository.transaction_repository import TransactionRepository

app = Flask(__name__)
dados_mockados = {'Janeiro': 10, 'Fevereiro': 30, 'Março': 20, 'Abril': 25}
grafico = Grafico(dados_mockados)

repository = TransactionRepository('repository/transacoes.json')


@app.route('/', methods=['GET', 'POST'])
def home():
    meses = dados_mockados.keys()
    bar_chart = None

    transacoes = repository.get_transactions()

    if request.method == 'POST':
        selected_months = request.form.getlist('meses')
        dados_filtrados = grafico.obter_dados_para_meses(selected_months)
        bar_chart = infra.gerar_grafico_barras(dados_filtrados)

    return render_template('main.html', meses=meses, bar_chart=bar_chart, transacoes=transacoes)


@app.route('/add_transaction', methods=['POST'])
def add_transaction():
    date = request.form['date']
    description = request.form['description']
    amount = request.form['amount']
    category = request.form['category']

    try:
        new_transaction = TransactionModel(date=date, description=description, amount=amount, category=category)
        repository.add_transaction(new_transaction)
        return 'Transação adicionada com sucesso!'
    except ValueError as e:
        return str(e), 400


if __name__ == '__main__':
    app.run(debug=True)
