const formulario = document.getElementById("formCadFornecedor");
let listaDeFornecedores = [];

// Carregar dados do localStorage
if (localStorage.getItem("fornecedores")) {
    listaDeFornecedores = JSON.parse(localStorage.getItem("fornecedores"));
}

// Manipular envio do formulário
formulario.onsubmit = function(evento) {
    evento.preventDefault();
    evento.stopPropagation();

    if (formulario.checkValidity()) {
        const nome = document.getElementById("nome").value;
        const cnpj = document.getElementById("cnpj").value;
        const tempo = document.getElementById("ano").value;
        const cep = document.getElementById("cep").value;
        const uf = document.getElementById("uf").value;
        const cidade = document.getElementById("cidade").value;

        const fornecedor = { nome, cnpj, tempo, cep, uf, cidade };
        listaDeFornecedores.push(fornecedor);

        localStorage.setItem("fornecedores", JSON.stringify(listaDeFornecedores));
        formulario.reset();
        formulario.classList.remove("was-validated");
        mostrarTabelaFornecedores();
    } else {
        formulario.classList.add("was-validated");
    }
};

// Mostrar tabela
function mostrarTabelaFornecedores() {
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";

    if (listaDeFornecedores.length === 0) {
        divTabela.innerHTML = `<p class="alert alert-info text-center mt-4">Nenhum fornecedor cadastrado.</p>`;
        return;
    }

    const tabela = document.createElement("table");
    tabela.className = "table table-bordered table-striped table-hover mt-4";

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>CNPJ</th>
            <th>Tempo de Mercado</th>
            <th>CEP</th>
            <th>UF</th>
            <th>Cidade</th>
            <th>Ações</th>
        </tr>
    `;

    const tbody = document.createElement("tbody");

    listaDeFornecedores.forEach(fornecedor => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.cnpj}</td>
            <td>${fornecedor.tempo}</td>
            <td>${fornecedor.cep}</td>
            <td>${fornecedor.uf}</td>
            <td>${fornecedor.cidade}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="excluirFornecedor('${fornecedor.cnpj}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        tbody.appendChild(linha);
    });

    tabela.appendChild(thead);
    tabela.appendChild(tbody);
    divTabela.appendChild(tabela);
}

// Excluir fornecedor por CNPJ
function excluirFornecedor(cnpj) {
    if (confirm(`Deseja realmente excluir o fornecedor com CNPJ ${cnpj}?`)) {
        listaDeFornecedores = listaDeFornecedores.filter(f => f.cnpj !== cnpj);
        localStorage.setItem("fornecedores", JSON.stringify(listaDeFornecedores));
        mostrarTabelaFornecedores();
    }
}

// Mostrar tabela ao carregar a página
mostrarTabelaFornecedores();