let produtos = [];

function adicionarItem() {
    let produto = document.getElementById('produto').value;
    let quantidade = document.getElementById('quantidade').value;
    let preco = document.getElementById('preco').value;

    // Caso os dados não sejam inseridos vou dar um alerta.
    if (produto.trim() === '') {
        alert('Por favor: Insira um produto válido.');
        return;
    }

    // Aqui iremos verificar se já contém o produto na lista.
    let itemExistente = produtos.find(prod => prod.produto === produto);
    if (itemExistente) {
        alert('Este produto já está listado');
        return;
    }

    produtos.push({
        produto: produto,
        quantidade: quantidade,
        preco: preco,
        total: quantidade * preco
    });

    // Vou salvar os dados no localStorage.
    localStorage.setItem('produtos', JSON.stringify(produtos));

    atualizarTabela();

}

window.onload = function () {
    // Carrega os produtos do localStorage 
    let produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
        produtos = JSON.parse(produtosSalvos);
        atualizarTabela();
    }
}

// Atualizando os produtos
function atualizarProduto(index, novoProduto) {
    produtos[index].produto = novoProduto;
    atualizarTabela();
}

// Atualizando a quantidade
function atualizarQuantidade(index, novaQuantidade) {
    produtos[index].quantidade = Number(novaQuantidade);
    produtos[index].total = produtos[index].quantidade * produtos[index].preco;
    atualizarTabela();
}

// Atualizando o preço
function atualizarPreco(index, novoPreco) {
    produtos[index].preco = Number(novoPreco);
    produtos[index].total = produtos[index].quantidade * produtos[index].preco;
    atualizarTabela();
}

// Removendo o produto
function removerProduto(index) {
    produtos.splice(index, 1);
    atualizarTabela();
}

// Aqui é a configuração do Botão de Limpar todos os Produtos.
function limparTudo() {
    produtos = [];
    document.getElementById('produto').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';
    atualizarTabela();
}

// Aqui é a configuração do Botão de Limpar todos os Campos.
function limparCampos() {
    document.getElementById('produto').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';
}


function atualizarTabela() {
    let tabela = document.getElementById('tabela-de-produtos');
    tabela.innerHTML = `
        <tr>
            <th>Item</th>
            <th>Quant</th>
            <th>Preço</th>
            <th>Prod</th>
            <th>Excluir</th>
        </tr>
    `;
  
    let valorTotal = 0;
    produtos.forEach((produto, index) => {
      valorTotal += produto.total;
      tabela.innerHTML += `
            <tr>
                <td><input type="text" value="${produto.produto}" onchange="atualizarItem(${index}, this.value)"></td>
                <td><input type="number" value="${produto.quantidade}" onchange="atualizarQuantidade(${index}, this.value)"></td>
                <td><input type="number" value="${produto.preco}" onchange="atualizarPreco(${index}, this.value)"></td>
                <td>${produto.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td><button onclick="removerProduto(${index})" class="remover">Excluir</button></td>
            </tr>
        `;
    });
  
    document.getElementById('valor-total').innerText = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }