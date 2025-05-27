export default function verificarAutenticacao(requisicao,resposta,next){
    if (requisicao.session.autenticado){
        next();
    }
    else{
        resposta.redirect("/Pagina_Login/Login.html");
    }
}