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
        alert(`Produto incluído com sucesso! ID:${dados.id}`);
        listaDeCategorias.push(produto);
        mostrarTabelaCategorias();
    })
    .catch((erro)=>{
        alert("Erro ao cadastrar a Categoria:" + erro);
    });

}

obterDadosCategorias();