function carregarProdutos() {
fetch('http://localhost:3000/produtos')
  .then(res => res.json())
  .then(produtos => {
    const vitrine = document.getElementById("vitrine");
    for (const produto of produtos) {
        let card = document.createElement('div');
        card.classList.add("card", "m-2");
        card.style.width = "18rem";
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${produto.Nome}</h5>
                <p class="card-text">Modelo: ${produto.modelo}</p>
                <p class="card-text">Ano: ${produto.ano}</p>
                <p class="card-text">Cor: ${produto.cor}</p>
                <p class="card-text">Marca: ${produto.marca}</p>
                <a href="#" class="btn btn-primary">Comprar</a>
            </div>
        `;
        vitrine.appendChild(card);
    }
  })};

  carregarProdutos();