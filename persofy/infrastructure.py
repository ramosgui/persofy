import io
import base64
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt


def gerar_grafico_barras(dados):
    labels = dados.keys()
    values = dados.values()

    plt.bar(labels, values)

    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)
    graph_url = base64.b64encode(img.getvalue()).decode()
    plt.close()

    return 'data:image/png;base64,{}'.format(graph_url)
