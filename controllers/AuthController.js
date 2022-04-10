const {sequelize} = require('../database/models');

const AuthController = {
    login: async (req,res) => {

        //capturar o email e senha digitados pelo usuario
        let {email,senha} = req.body;

        //levantar do banco de dados o usuário com o email dado
        let sql = `SELECT id, senha FROM usuarios WHERE email='${email}'`;
        let resultados = await sequelize.query(sql, {type: sequelize.queryTypes.SELECT});

        //caso não haja usuario, retornar erro 403
        if(resultados.length == 0 ){
            return res.status(403).json({msg:"Falha no login!"})
        } else{
            return res.status(200).json({msg:"Encontrou o usuario"})
        }

        //testar a senha do usuário

        //se senha  não estiver ok, retornar erro 403

        //TODO: criar o token

        //TODO: retornar uma mensagem de sucesso 200 e o token


    }
}

module.exports = AuthController;