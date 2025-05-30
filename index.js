import express from 'express';
import session from 'express-session';
import verificarAutenticacao from './Segurança/Autenticacao.js';

const host = "0.0.0.0";
const porta = 3000;
const app = express();

app.use(session({
  secret:"M1nH4Ch4v3S3cR3t4",
  resave: true,
  saveUninitialized:false,
  cookie: {
    maxAge: 1000 * 60 * 15,
    httpOnly: true
  }

}));

app.use(express.urlencoded({extended:true}));


app.use(express.static("./Publico")); 
app.use(verificarAutenticacao, express.static("./Privado"));


app.post("/login",(requisicao, resposta) => {
  const { usuario, senha } = requisicao.body;
  if (usuario == "admin" && senha == "admin"){
    requisicao.session.autenticado = true;
    resposta.redirect("/Menu.html");
  }
  else{
    let conteudo = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/Login.css">
    <link rel="stylesheet" href="CSS/bootstrap.min.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <title>Página de login</title>
</head>
<body>
    <div class="container">
        <div class="row">
          <div class="col-md-6 offset-md-3">
            <h2 class="text-center text-dark mt-5">Bem-vindo</h2>
            <div class="text-center mb-5 text-dark">Faça o login</div>
            <div class="card my-5">
    
              <form action="/login" method="POST" class="card-body cardbody-color p-lg-5">
    
                <div class="text-center">
                  <img src="https://img.freepik.com/vetores-gratis/circulo-azul-com-usuario-branco_78370-4707.jpg?semt=ais_hybrid&w=740" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                    width="200px" alt="profile">
                </div>
    
                <div class="mb-3">
                  <input type="text" class="form-control" id="usuario" name="usuario" aria-describedby="emailHelp"
                    placeholder="Usuário">
                </div>
                <div class="mb-3">
                  <input type="password" class="form-control" id="senha" name="senha" placeholder="Senha">
                </div>
                <div class="text-center"><button type="submit" class="btn btn-color px-5 mb-5 w-100">Login</button></div>
              </form>
            </div>
    
          </div>
        </div>
      </div>
</body>
</html>
    `;
    resposta.send(conteudo);
    resposta.end();
  }
});




app.get('/logout',(requisicao,resposta)=>{
    requisicao.session.destroy(); 
    resposta.redirect("/Pagina_Login/Login.html"); 
});

app.listen(porta, host, () => {
    console.log(`Servidor em execução em http://${host}:${porta}`);
});
