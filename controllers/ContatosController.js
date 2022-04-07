const { sequelize } = require('../database/models');
const uid = 1;

const contatoController = {

    index: async (req,res)=>{
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id=${uid}`;
        let contatos = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        res.status(200).json(contatos);
    },
    show: async (req,res)=>{
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id=${uid} AND id=${req.params.id}`;
        let resultado = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        if(resultado.length == 0){
            res.status(404).json({msg:"Contato inexistente"})
        } else {
            res.status(200).json(resultado[0]);
        }
    },
    search: async (req,res)=>{
        let trechoBuscado = req.query.q;
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id=${uid} AND nome LIKE '%${trechoBuscado}%'`;
        let resultado = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        res.status(200).json(resultado)
    },
    create: async (req,res)=>{

        //capturando as infos do body
        let {nome, emails, telefones} = req.body;

        //salvar o nome do contato
        let sql = `INSERT INTO contatos (nome,usuarios_id) VALUES("${nome}","${uid}")`;
        let resultado = await sequelize.query(sql,{type: sequelize.QueryTypes.INSERT});
        console.log(resultado);

        //levantar o id do contato recem criado
        let [idCriado, nLinhas] = resultado;
        //salvar os emails na tabela emails
        emails = emails.map((e) => {return {email:e, contatos_id:idCriado}});
        sequelize.queryInterface.bulkInsert('emails',emails);
        //salvar os telefones na tabela telefones
        telefones = telefones.map((t) => {return {telefone:t, contatos_id:idCriado}});
        sequelize.queryInterface.bulkInsert('telefones',telefones);
        // enviar uma resposta para o cliente
        res.json({msg:"ok", idCriado});
    },
    destroy:(req,res)=>{
        res.send('excluíndo o contato do ....')
    },
    update:(req,res)=>{
        res.send('atualizando o contato do ...')
    }

}

module.exports = contatoController;