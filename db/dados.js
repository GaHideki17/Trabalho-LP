function InicializarDados() {
  return new Promise((resolve) => {
    if (!localStorage.getItem("clientes")) {
      const clientes = [
        { id: "1", cpf: "111.111.111-11", nome: "João Carlos Gouveia", telefone: "(18)9111-1111", cidade: "Presidente Prudente", uf: "SP", cep: "19015-010" },
        { id: "2", cpf: "222.222.222-22", nome: "Odete Roitman", telefone: "(18)9222-2222", cidade: "Londrina", uf: "PR", cep: "14023-013" },
        { id: "3", cpf: "333.333.333-33", nome: "Sandra Regina Vasconcelos", telefone: "(11)9333-3333", cidade: "São Paulo", uf: "SP", cep: "11033-029" },
        { id: "4", cpf: "444.444.444-44", nome: "Jason Grace", telefone: "(17)9444-4444", cidade: "Três Lagoas", uf: "MS", cep: "21035-070" }
      ];
      localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    if (!localStorage.getItem("fornecedores")) {
      const fornecedores = [
        { id: "1", cpf: "111.111.111-11", nome: "Chevrolet", telefone: "(18)9111-1111", cidade: "Presidente Prudente", uf: "SP", cep: "19015-010" },
        { id: "2", cpf: "222.222.222-22", nome: "Toyota", telefone: "(18)9222-2222", cidade: "Londrina", uf: "PR", cep: "14023-013" },
        { id: "3", cpf: "333.333.333-33", nome: "Renault", telefone: "(11)9333-3333", cidade: "São Paulo", uf: "SP", cep: "11033-029" },
        { id: "4", cpf: "444.444.444-44", nome: "Ford", telefone: "(17)9444-4444", cidade: "Três Lagoas", uf: "MS", cep: "21035-070" }
      ];
      localStorage.setItem("fornecedores", JSON.stringify(fornecedores));
    }

    if (!localStorage.getItem("produtos")) {
      const produtos = [
        { nome: "Kwid", ano: "2018", modelo: "hatch subcompacto", cor: "Preto", qtd: "1", marca: "Renault" },
        { nome: "Polo", ano: "2018", modelo: "Compacto premium", cor: "prata", qtd: "1", marca: "VolksWagen" },
        { nome: "Camaro", ano: "2022", modelo: "Muscle car", cor: "Amarelo", qtd: "1", marca: "Chevrolet" }
      ];
      localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    if (!localStorage.getItem("categorias")) {
      const categorias = [
        { nome: "Muscle car", descricao: "Mudar" },
        { nome: "Compacto", descricao: "Mudar" },
        { nome: "Sub Compacto", descricao: "Mudar" },
        { nome: "Eletrico", descricao: "Mudar" }
      ];
      localStorage.setItem("categorias", JSON.stringify(categorias));
    }

    if (!localStorage.getItem("entregadores")) {
      const entregadores = [
        { cpf: "111.111.111-11", nome: "João Carlos Gouveia", data: "xx/xx/xxxx", rg: "123555396534", cep: "19015-010" },
        { cpf: "123.1231.154-11", nome: "Thomas", data: "xx/xx/xxxx", rg: "132652334", cep: "19325-023" },
        { cpf: "453.186.117-11", nome: "Gabriel Hideki", data: "xx/xx/xxxx", rg: "126534596534", cep: "19015-233" },
        { cpf: "763.144.123-44", nome: "Henrique", data: "xx/xx/xxxx", rg: "1288996534", cep: "19015-666" }
      ];
      localStorage.setItem("entregadores", JSON.stringify(entregadores));
    }

    resolve(); // finaliza a Promise
  });
}