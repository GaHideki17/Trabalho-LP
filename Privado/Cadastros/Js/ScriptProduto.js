const urlBase = 'http://localhost:4000/produtos';

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

        cadastrarProduto(produto);
        formulario.reset();
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
    }
    else{
        const tabela = document.createElement('table');
        tabela.className="table table-striped table-hover";

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
        for (let i=0; i < listaDeProdutos.length; i++){
            const linha = document.createElement('tr');
            linha.id=listaDeProdutos[i].id;
            linha.innerHTML = `
                <td>${listaDeProdutos[i].nome}</td>
                <td>${listaDeProdutos[i].ano}</td>
                <td>${listaDeProdutos[i].modelo}</td>
                <td>${listaDeProdutos[i].cor}</td>
                <td>${listaDeProdutos[i].qtd}</td>
                <td>${listaDeProdutos[i].marca}</td>
                <td>
                    <button type="button" class="btn btn-danger" onclick="excluirProduto('${produto.nome}')">
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

function excluirProduto(id){
    if(confirm("Deseja realmente excluir o Produto " + id + "?")){
        fetch(urlBase + "/" + id,{
            method:"DELETE"
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados)=>{
            alert("Produto excluído com sucesso!");
            listaDeProdutos = listaDeProdutos.filter((produto) => { 
                return produto.id !== id;
            });
        
            document.getElementById(id)?.remove(); //excluir a linha da tabela
        }).catch((erro) => {
            alert("Não foi possível excluir o Produto: " + erro);
        });
    }
}


function obterDadosProdutos(){
    //enviar uma requisição para a fonte servidora
    fetch(urlBase, {
        method:"GET"
    })
    .then((resposta)=>{
        if (resposta.ok){
            return resposta.json();
        }
    })
    .then((produtos)=>{
        listaDeProdutos=produtos;
        mostrarTabelaProdutos();
    })
    .catch((erro)=>{
        alert("Erro ao tentar recuperar Produtos do servidor!");
    });
}


function cadastrarProduto(produto){

    fetch(urlBase, {
       "method":"POST",
       "headers": {
          "Content-Type":"application/json",
       },
       "body": JSON.stringify(produto)
    })
    .then((resposta)=>{
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((dados) =>{
        alert(`Produto incluído com sucesso! ID:${dados.id}`);
        listaDeProdutos.push(produto);
        mostrarTabelaProdutos();
    })
    .catch((erro)=>{
        alert("Erro ao cadastrar o Produto:" + erro);
    });

}

obterDadosProdutos();