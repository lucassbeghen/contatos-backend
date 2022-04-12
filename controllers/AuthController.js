const {sequelize} = require('../database/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthController = {
    login: async (req,res) => {

        //capturar o email e senha digitados pelo usuario
        let {email,senha} = req.body;

        //levantar do banco de dados o usuário com o email dado
        let sql = `SELECT id, senha, nome FROM usuarios WHERE email='${email}'`;
        let resultados = await sequelize.query(sql, {type: sequelize.queryTypes.SELECT});

        //caso não haja usuario, retornar erro 403
        if(resultados.length == 0 ){
            return res.status(403).json({msg:"Falha no login!"})
        } 
         
        //capturar o id e a senha criptografada levantados pelo BD
        let id = resultados[0].id;
        let senhaCriptografada = resultados[0].senha;
        let nome = resultados[0].nome;

        //testar a senha do usuário
        if(!bcrypt.compareSync(senha,senhaCriptografada)) {
            //se senha  não estiver ok, retornar erro 403
            return res.status(403).json({msg:"Falha no login!"})
        }

        // criar um objeto com os dados utéis do usuário
        let usuario = {
            id,
            nome,
            email
        }

        // criar o token
        let token = jwd.sign(usuario, "SEGREDO ")
        // retornar uma mensagem de sucesso 200 e o token
        return res.status(200).json({token, usuario});

    }
}

module.exports = AuthController;