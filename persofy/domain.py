class Grafico:
    def __init__(self, dados):
        self.dados = dados

    def obter_dados_para_meses(self, meses_selecionados):
        return {mes: self.dados.get(mes, 0) for mes in meses_selecionados}
