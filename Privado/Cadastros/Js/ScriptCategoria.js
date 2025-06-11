const formulario = document.getElementById("formCadCategoria");
let listaCategorias = [];

if (localStorage.getItem("categorias")) {
    listaCategorias = JSON.parse(localStorage.getItem("categorias"));
}

formulario.onsubmit = function(evento) {
    evento.preventDefault();
    evento.stopPropagation();

    if (formulario.checkValidity()) {
        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;

        const categoria = { nome, descricao };
        listaCategorias.push(categoria);

        localStorage.setItem("categorias", JSON.stringify(listaCategorias));

        formulario.reset();
        formulario.classList.remove("was-validated");
        mostrarTabelaCategorias();
    } else {
        formulario.classList.add("was-validated");
    }
};

function mostrarTabelaCategorias() {
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";

    if (listaCategorias.length === 0) {
        divTabela.innerHTML = "<p class='alert alert-info text-center mt-4'>Nenhuma categoria cadastrada.</p>";
        return;
    }

    const tabela = document.createElement("table");
    tabela.className = "table table-striped table-hover mt-4";

    const cabecalho = document.createElement("thead");
    cabecalho.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ações</th>
        </tr>
    `;
    tabela.appendChild(cabecalho);

    const corpo = document.createElement("tbody");

    for (let i = 0; i < listaCategorias.length; i++) {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${listaCategorias[i].nome}</td>
            <td>${listaCategorias[i].descricao}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="excluirCategoria('${listaCategorias[i].nome}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        corpo.appendChild(linha);
    }

    tabela.appendChild(corpo);
    divTabela.appendChild(tabela);
}

function excluirCategoria(nome) {
    if (confirm(`Deseja excluir a categoria "${nome}"?`)) {
        listaCategorias = listaCategorias.filter(cat => cat.nome !== nome);
        localStorage.setItem("categorias", JSON.stringify(listaCategorias));
        mostrarTabelaCategorias();
    }
}

mostrarTabelaCategorias();