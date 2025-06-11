
let listaDeProdutos = [];
if (localStorage.getItem("produtos")) {
    listaDeProdutos = JSON.parse(localStorage.getItem("produtos"));
}

function carregarProdutos() {
    const vitrine = document.getElementById("vitrine");
    vitrine.innerHTML = ""; // Corrigido

    if (listaDeProdutos.length === 0) {
        vitrine.innerHTML = "<p class='alert alert-info text-center'>Nenhum produto cadastrado</p>";
    } else {
        for (const produto of listaDeProdutos) { // Corrigido
            let card = document.createElement('div');
            card.classList.add("card", "m-2");
            card.style.width = "18rem";

            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text">Modelo: ${produto.modelo}</p>
                    <p class="card-text">Ano: ${produto.ano}</p>
                    <p class="card-text">Cor: ${produto.cor}</p>
                    <p class="card-text">Quantidade: ${produto.qtd}</p>
                    <p class="card-text">Marca: ${produto.marca}</p>
                    <a href="#" class="btn btn-primary">Comprar</a>
                </div>
            `;

            vitrine.appendChild(card);
        }
    }
}


  carregarProdutos();