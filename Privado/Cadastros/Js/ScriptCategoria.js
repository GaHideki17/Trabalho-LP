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

         salvarCategorias();

        formulario.reset();
        formulario.classList.remove("was-validated");
        renderizarCategorias();
    } else {
        formulario.classList.add("was-validated");
    }
};

function carregarCategorias() {
    const dados = localStorage.getItem("categorias");
    if (dados) {
        listaCategorias = JSON.parse(dados);
    }
}

function salvarCategorias() {
    localStorage.setItem("categorias", JSON.stringify(listaCategorias));
}

function renderizarCategorias() {
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";

    if (listaCategorias.length === 0) {
        divTabela.innerHTML = `<p class="alert alert-info text-center mt-4">Nenhuma categoria cadastrada.</p>`;
        return;
    }

    const tabela = document.createElement("table");
    tabela.className = "table table-striped mt-4";

    tabela.innerHTML = `
        <thead>
            <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody>
            ${listaCategorias.map(cat => `
                <tr>
                    <td>${cat.nome}</td>
                    <td>${cat.descricao}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="excluirCategoria('${cat.nome}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `).join("")}
        </tbody>
    `;

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