const urlBase = 'http://localhost:4000/fornecedores';
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
    else{
        const tabela = document.createElement('table');
        tabela.className="table table-striped table-hover";

        const cabecalho = document.createElement('thead');
        const corpo = document.createElement('tbody');
        cabecalho.innerHTML=`
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
        tabela.appendChild(cabecalho);
        for (let i=0; i < listaDeFornecedores.length; i++){
            const linha = document.createElement('tr');
            linha.id=listaDeFornecedores[i].id;
            linha.innerHTML = `
                <td>${listaDeFornecedores[i].nome}</td>
                <td>${listaDeFornecedores[i].cnpj}</td>
                <td>${listaDeFornecedores[i].tempo}</td>
                <td>${listaDeFornecedores[i].cep}</td>
                <td>${listaDeFornecedores[i].uf}</td>
                <td>${listaDeFornecedores[i].cidade}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="excluirFornecedor('${listaDeFornecedores[i].cnpj}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}

function excluirFornecedor(id){
    if(confirm("Deseja realmente excluir o Fornecedor " + id + "?")){
        fetch(urlBase + "/" + id,{
            method:"DELETE"
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados)=>{
            alert("Fornecedor excluído com sucesso!");
            listaDeFornecedores = listaDeFornecedores.filter((entregador) => { 
                return entregador.id !== id;
            });
        
            document.getElementById(id)?.remove(); //excluir a linha da tabela
        }).catch((erro) => {
            alert("Não foi possível excluir o Fornecedor: " + erro);
        });
    }
}


function obterDadosFornecedores(){
    //enviar uma requisição para a fonte servidora
    fetch(urlBase, {
        method:"GET"
    })
    .then((resposta)=>{
        if (resposta.ok){
            return resposta.json();
        }
    })
    .then((fornecedores)=>{
        listaDeFornecedores=fornecedores;
        mostrarTabelaFornecedores();
    })
    .catch((erro)=>{
        alert("Erro ao tentar recuperar Forncedores do servidor!");
    });
}


function cadastrarFornecedor(fornecedor){

    fetch(urlBase, {
       "method":"POST",
       "headers": {
          "Content-Type":"application/json",
       },
       "body": JSON.stringify(fornecedor)
    })
    .then((resposta)=>{
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((dados) =>{
        alert(`Fornecedor incluído com sucesso! ID:${dados.id}`);
        listaDeFornecedores.push(fornecedor);
        mostrarTabelaFornecedores();
    })
    .catch((erro)=>{
        alert("Erro ao cadastrar o Fornecedor:" + erro);
    });

}

obterDadosFornecedores();
