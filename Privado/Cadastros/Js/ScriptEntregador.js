const urlBase = 'http://localhost:4000/entregadores';

const formulario = document.getElementById("formCadEntregador");
let listaDeEntregadores = [];


if (localStorage.getItem("entregadores")) {
    listaDeEntregadores = JSON.parse(localStorage.getItem("entregadores"));
}


formulario.onsubmit = function(evento) {


    if (formulario.checkValidity()) {
        const nome = document.getElementById("nome").value;
        const dataNascimento = document.getElementById("data").value;
        const cpf = document.getElementById("cpf").value;
        const rg = document.getElementById("rg").value;

        const entregador = { nome, dataNascimento, cpf, rg };

        cadastrarEntregador(entregador);
        formulario.reset();
        mostrarTabelaEntregadores();
    } else {
        formulario.classList.add("was-validated");
    }
    evento.preventDefault();
    evento.stopPropagation();
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

    const cabecalho = document.createElement("thead");
    const corpo = document.createElement("tbody");
    thead.innerHTML = `
        <tr>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>CPF</th>
            <th>RG</th>
            <th>Ações</th>
        </tr>
    `;
    tabela.appendChild(cabecalho);
    for (let i=0; i < listaDeEntregadores.length; i++){
        const linha = document.createElement("tr");
        linha.id=listaDeEntregadores[i].id;        
        linha.innerHTML = `
            <td>${listaDeEntregadores[i].nome}</td>
            <td>${listaDeEntregadores[i].dataNascimento}</td>
            <td>${listaDeEntregadores[i].cpf}</td>
            <td>${listaDeEntregadores[i].rg}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="excluirEntregador('${entregador.cpf}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    };

function excluirEntregador(id){
    if(confirm("Deseja realmente excluir o cliente " + id + "?")){
        fetch(urlBase + "/" + id,{
            method:"DELETE"
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados)=>{
            alert("Cliente excluído com sucesso!");
            listaDeEntregadores = listaDeEntregadores.filter((entregador) => { 
                return entregador.id !== id;
            });
        
            document.getElementById(id)?.remove(); //excluir a linha da tabela
        }).catch((erro) => {
            alert("Não foi possível excluir o cliente: " + erro);
        });
    }
}


function obterDadosEntregador(){
    //enviar uma requisição para a fonte servidora
    fetch(urlBase, {
        method:"GET"
    })
    .then((resposta)=>{
        if (resposta.ok){
            return resposta.json();
        }
    })
    .then((entregadores)=>{
        listaDeEntregadores=entregadores;
        mostrarTabelaEntregadores();
    })
    .catch((erro)=>{
        alert("Erro ao tentar recuperar Entregadores do servidor!");
    });
}


function cadastrarEntregador(entregador){

    fetch(urlBase, {
       "method":"POST",
       "headers": {
          "Content-Type":"application/json",
       },
       "body": JSON.stringify(entregador)
    })
    .then((resposta)=>{
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((dados) =>{
        alert(`Entregador incluído com sucesso! ID:${dados.id}`);
        listaDeEntregadores.push(entregador);
        mostrarTabelaEntregadores();
    })
    .catch((erro)=>{
        alert("Erro ao cadastrar o cliente:" + erro);
    });

}

obterDadosClientes();