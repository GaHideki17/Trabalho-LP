const formulario = document.getElementById("formCadEntregador");
let listaDeEntregadores = [];

// Carrega do localStorage se houver dados salvos
if (localStorage.getItem("entregadores")) {
    listaDeEntregadores = JSON.parse(localStorage.getItem("entregadores"));
}

// Envio do formulário
formulario.onsubmit = function(evento) {
    evento.preventDefault();
    evento.stopPropagation();

    if (formulario.checkValidity()) {
        const nome = document.getElementById("nome").value;
        const dataNascimento = document.getElementById("data").value;
        const cpf = document.getElementById("cpf").value;
        const rg = document.getElementById("rg").value;

        const entregador = { nome, dataNascimento, cpf, rg };
        listaDeEntregadores.push(entregador);

        localStorage.setItem("entregadores", JSON.stringify(listaDeEntregadores));

        formulario.reset();
        formulario.classList.remove("was-validated");
        mostrarTabelaEntregadores();
    } else {
        formulario.classList.add("was-validated");
    }
};

// Exibir a tabela com os entregadores
function mostrarTabelaEntregadores() {
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";

    if (listaDeEntregadores.length === 0) {
        divTabela.innerHTML = `<p class="alert alert-info text-center mt-4">Nenhum entregador cadastrado.</p>`;
        return;
    }

    const tabela = document.createElement("table");
    tabela.className = "table table-striped table-hover mt-4";

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Ações</th>
        </tr>
    `;

    const tbody = document.createElement("tbody");

    listaDeEntregadores.forEach(entregador => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${entregador.nome}</td>
            <td>${entregador.dataNascimento}</td>
            <td>${entregador.cpf}</td>
            <td>${entregador.rg}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="excluirEntregador('${entregador.cpf}')">
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

// Função para excluir um entregador pelo CPF
function excluirEntregador(cpf) {
    if (confirm(`Deseja realmente excluir o entregador com CPF ${cpf}?`)) {
        listaDeEntregadores = listaDeEntregadores.filter(e => e.cpf !== cpf);
        localStorage.setItem("entregadores", JSON.stringify(listaDeEntregadores));
        mostrarTabelaEntregadores();
    }
}

// Exibe a tabela ao carregar a página
mostrarTabelaEntregadores();