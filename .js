const formulario = document.getElementById("formCadCliente");
let listaDeClientes = [];


formulario.onsubmit=manipularSubmissao;


if (localStorage.getItem("clientes")){
    listaDeClientes = JSON.parse(localStorage.getItem("clientes"));
}

function manipularSubmissao(evento){
    if (formulario.checkValidity()){
        const cpf = document.getElementById("cpf").value;
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const cidade = document.getElementById("cidade").value;
        const uf = document.getElementById("uf").value;
        const cep = document.getElementById("cep").value;
        const cliente = {cpf,nome,telefone,cidade,uf,cep};
        listaDeClientes.push(cliente);
        cadastrarCliente(cliente)
        formulario.reset();
        mostrarTabelaClientes();
    }
    else{
        formulario.classList.add('was-validated');
    }
    evento.preventDefault(); //cancelamento do evento
    evento.stopPropagation(); //impedindo que outros observem esse evento

}
function mostrarTabelaClientes(){
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML = "";
    if (listaDeClientes.length === 0){
        divTabela.innerHTML = "<p class='alert alert-info text-center'>Não há clientes cadastrados</p>";
    } else {
        const tabela = document.createElement('table');
        tabela.className = "table table-striped table-hover";

        const cabecalho = document.createElement('thead');
        const corpo = document.createElement('tbody');
        cabecalho.innerHTML = `
            <tr>
                <th>CPF</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>CEP</th>
                <th>Ações</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);

        listaDeClientes.forEach(cliente => {
            const linha = document.createElement('tr');
            linha.id = cliente.cpf;
            linha.innerHTML = `
                <td>${cliente.cpf}</td>
                <td>${cliente.nome}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.cidade}</td>
                <td>${cliente.uf}</td>
                <td>${cliente.cep}</td>
                <td><button type="button" class="btn btn-danger" onclick="excluirCliente('${cliente.cpf}')"><i class="bi bi-trash"></i></button></td>
            `;
            corpo.appendChild(linha);
        });
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);
    }
}

function excluirCliente(cpf){
    if(confirm("Deseja realmente excluir o cliente " + cpf + "?")){
        listaDeClientes = listaDeClientes.filter(cliente => cliente.cpf !== cpf);
        localStorage.setItem("clientes", JSON.stringify(listaDeClientes));
        mostrarTabelaClientes();
    }
}

function cadastrarCliente(cliente){

    fetch(urlBase, {
       "method":"POST",
       "headers": {
          "Content-Type":"application/json",
       },
       "body": JSON.stringify(cliente)
    })
    .then((resposta)=>{
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((dados) =>{
        alert(`Cliente incluído com sucesso! ID:${dados.id}`);
        listaDeClientes.push(cliente);
        mostrarTabelaClientes();
    })
    .catch((erro)=>{
        alert("Erro ao cadastrar o cliente:" + erro);
    });

}

function obterDadosClientes(){
    
    fetch(urlBase, {
        method:"GET"
    })
    .then((resposta)=>{
        if (resposta.ok){
            return resposta.json();
        }
    })
    .then((clientes)=>{
        listaDeClientes=clientes;
        mostrarTabelaClientes();
    })
    .catch((erro)=>{
        alert("Erro ao tentar recuperar clientes do servidor!");
    });
}


obterDadosClientes();