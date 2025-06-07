const formulario = document.getElementById("formCadProduto");
let listaDeProdutos = [];

formulario.onsubmit = manipularSubmissao;

if (localStorage.getItem("produtos")) {
    listaDeProdutos = JSON.parse(localStorage.getItem("produtos"));
}

function manipularSubmissao(evento) {
    evento.preventDefault(); // cancela envio padrão
    evento.stopPropagation(); // impede propagação

    if (formulario.checkValidity()) {
        const nome = document.getElementById("nome").value;
        const ano = document.getElementById("ano").value;
        const modelo = document.getElementById("modelo").value;
        const cor = document.getElementById("cor").value;
        const qtd = document.getElementById("QTD").value;
        const marca = document.getElementById("marca").value;

        const produto = { nome, ano, modelo, cor, qtd, marca };
        listaDeProdutos.push(produto);
        localStorage.setItem("produtos", JSON.stringify(listaDeProdutos));

        formulario.reset();
        formulario.classList.remove('was-validated');
        mostrarTabelaProdutos();
    } else {
        formulario.classList.add('was-validated');
    }
}

function mostrarTabelaProdutos() {
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";

    if (listaDeProdutos.length === 0) {
        divTabela.innerHTML = "<p class='alert alert-info text-center'>Nenhum produto cadastrado</p>";
    } else {
        const tabela = document.createElement('table');
        tabela.className = "table table-striped table-hover mt-3";

        const cabecalho = document.createElement('thead');
        const corpo = document.createElement('tbody');

        cabecalho.innerHTML = `
            <tr>
                <th>Nome</th>
                <th>Ano</th>
                <th>Modelo</th>
                <th>Cor</th>
                <th>Quantidade</th>
                <th>Marca</th>
                <th>Ações</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);

        listaDeProdutos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.id = produto.nome; // supondo que o nome seja único

            linha.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.ano}</td>
                <td>${produto.modelo}</td>
                <td>${produto.cor}</td>
                <td>${produto.qtd}</td>
                <td>${produto.marca}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="excluirProduto('${produto.nome}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            corpo.appendChild(linha);
        });

        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
}

function excluirProduto(nome) {
    if (confirm("Deseja realmente excluir o produto '" + nome + "'?")) {
        listaDeProdutos = listaDeProdutos.filter(produto => produto.nome !== nome);
        localStorage.setItem("produtos", JSON.stringify(listaDeProdutos));
        mostrarTabelaProdutos();
    }
}

// Ao carregar a página
mostrarTabelaProdutos();

//aaaa
