const jwt = require('jsonwebtoken');

const validaToken = (req,res,next) => {

    //verificando se o campo authorization existe como header da requisição
    if(req.headers.authorization == undefined){
        res.status(400).json({msg:"Requisição sem campo authorization"});
    }

    //Capturar o token
    let token = req.headers.authorization.replace('bearer ', '');

    //Validar o token
    let usuario;
    try {
        //tentando validar o token
        usuario = jwt.verify(token, "SEGREDO");
    } catch (error) {
        //falhou ao validar o token, mandando msg de erro;
        res.status(403).json({msg:error.msg});
    }

    //Adicionar infos do token na req,
    req.usuario = usuario;

    // passar para frente 
    next();
}

module.exports = validaToken;