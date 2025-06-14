const urlBase = 'http://localhost:4000/categorias';
const formulario = document.getElementById("formCadCategoria");
let listaCategorias = [];

if (localStorage.getItem("categorias")) {
    listaCategorias = JSON.parse(localStorage.getItem("categorias"));
}

formulario.onsubmit = function(evento) {


    if (formulario.checkValidity()) {
        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;

        const categoria = { nome, descricao };

        cadastrarCategoria(categoria);
        formulario.reset();
        
        mostrarTabelaCategorias();
    } else {
        formulario.classList.add("was-validated");
    }

        evento.preventDefault();
    evento.stopPropagation();
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

function excluirCategoria(id){
    if(confirm("Deseja realmente excluir a Categoria: " + id + "?")){
        fetch(urlBase + "/" + id,{
            method:"DELETE"
        }).then((resposta) => {
            if (resposta.ok){
                return resposta.json();
            }
        }).then((dados)=>{
            alert("Categoria excluída com sucesso!");
            listaDeCategorias = listaDeCategorias.filter((categoria) => { 
                return categoria.id !== id;
            });
        
            document.getElementById(id)?.remove(); //excluir a linha da tabela
        }).catch((erro) => {
            alert("Não foi possível excluir a Categoria: " + erro);
        });
    }
}


function obterDadosCategorias(){
    //enviar uma requisição para a fonte servidora
    fetch(urlBase, {
        method:"GET"
    })
    .then((resposta)=>{
        if (resposta.ok){
            return resposta.json();
        }
    })
    .then((categorias)=>{
        listaDeCategorias=categorias;
        mostrarTabelaCategorias();
    })
    .catch((erro)=>{
        alert("Erro ao tentar recuperar Categorias do servidor!");
    });
}


function cadastrarCategoria(categoria){

    fetch(urlBase, {
       "method":"POST",
       "headers": {
          "Content-Type":"application/json",
       },
       "body": JSON.stringify(categoria)
    })
    .then((resposta)=>{
        if(resposta.ok){
            return resposta.json();
        }
    })
    .then((dados) =>{
        alert(`Categoria incluído com sucesso! ID:${dados.id}`);
        listaDeCategorias.push(categoria);
        mostrarTabelaCategorias();
    })
    .catch((erro)=>{
        alert("Erro ao cadastrar a Categoria:" + erro);
    });

}

obterDadosCategorias();