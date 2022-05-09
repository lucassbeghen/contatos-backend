/**
 * Lista de Método do Controller
 * 
 * 1 - index: Listar muitos (get '/contatos')
 * 2 - show: Levantar um contato (get '/contatos/:id');
 * 3 - create: Salvar um novo contato (post '/contatos')
 * 4 - destroy: Remove um contato (delete '/contatos/:id')
 * 5 - update: Altera um contato (put '/contatos/:id')
 */

const {sequelize} = require('../database/models');

//const uid = 1;

module.exports = {
    index: async (req,res) => {

        // Capturar o id do usuário que está mandando a requisição:
       let uid = req.usuario.id;
        
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id=${uid}`;
        let contatos = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});

        // Adicionando campos de telefones e emails
        contatos = contatos.map(
            c => {
                c.emails = [];
                c.telefones = [];
                return c;
            }
        )

        // Carregando os telefones dos contatos do usuário de id "uid";
        sql = `
            select
                t.id,
                t.telefone,
                t.contatos_id
            from
                contatos c
                inner join telefones t on t.contatos_id=c.id
            where
                usuarios_id=${uid};
        `
        let telefones = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        

        // Carregando os emails dos contatos do usuário de id "uid"
        sql = `
            select
                e.id,
                e.email,
                e.contatos_id
            from
                contatos c
                inner join emails e on e.contatos_id=c.id
            where
                usuarios_id=${uid};
        `
        let emails = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        
        
        // Inserindo os emails carregados nos seus respectivos contatos
        emails.forEach(
            
            email => {

                // Encontrar o contato que é dono deste email
                let contato = contatos.find(c => c.id == email.contatos_id);

                // Adicionar ao array de emails desse contato o email da vez!
                contato.emails.push(email.email);

            }
        
        );

        // Inserindo os telefones carregados nos seus respectivos contatos
        telefones.forEach(
            
            telefone => {

                // Encontrar o contato que é dono deste telefone
                let contato = contatos.find(c => c.id == telefone.contatos_id);

                // Adicionar ao array de telefones desse contato o telefone da vez!
                contato.telefones.push(telefone.telefone);

            }
        
        );

        res.status(200).json(contatos);

    },
    show: async (req,res) => {
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id=${uid} AND id=${req.params.id}`;
        let resultado = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        if(resultado.length == 0){
            res.status(404).json({msg: "Contato inexistente"});
        } else {
            res.status(200).json(resultado[0]);
        }
    },
    search: async (req,res) => {
        let trechoBuscado = req.query.q;
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id=${uid} AND nome LIKE '%${trechoBuscado}%'`;
        let resultado = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        res.status(200).json(resultado)
    },
    create: async (req,res) => {

        // Capturando as info do body
        let {nome, emails, telefones} = req.body;

        // Salvar o nome contato
        let sql = `INSERT INTO contatos (nome,usuarios_id) VALUES ("${nome}", "${uid}")`;
        let resultado = await sequelize.query(sql,{type: sequelize.QueryTypes.INSERT});

        // Levantar o ID do contato recém criado
        let [idCriado, nLinhas] = resultado;

        // Salvar os emails
        emails = emails.map((e) => {return {email:e, contatos_id:idCriado}});
        sequelize.queryInterface.bulkInsert('emails', emails);
        
        // Salvar os telefones
        telefones = telefones.map((t) => {return {telefone:t, contatos_id:idCriado}});
        sequelize.queryInterface.bulkInsert('telefones', telefones);

        // Enviar uma resposta para o cliente 
        res.json({msg:"Ok", idCriado});

    },
    destroy: (req,res) => {res.send('função destroy')},
    update: (req,res) => {res.send('função update')}
}