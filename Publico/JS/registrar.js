const formulario = document.getElementById("formCadUsuario");
let listaDeUsuarios = [];

formulario.onsubmit = manipularSubmissao;

if (localStorage.getItem("Usuarios")) {
    listaDeUsuarios = JSON.parse(localStorage.getItem("Usuarios"));
}

function manipularSubmissao(evento) {
    evento.preventDefault(); // cancela envio padrão
    evento.stopPropagation(); // impede propagação

    if (formulario.checkValidity()) {
        const usuario = document.getElementById("usuarioCad").value;
        const senha = document.getElementById("senhaCad").value;

        const Login = { usuario,senha };
        listaDeProdutos.push(Login);
        localStorage.setItem("Usuarios", JSON.stringify(listaDeUsuarios));

        formulario.reset();
        formulario.classList.remove('was-validated');
    } else {
        formulario.classList.add('was-validated');
    }
}

