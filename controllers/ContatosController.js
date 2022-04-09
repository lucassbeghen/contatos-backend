const { sequelize } = require('../database/models');
const uid = 1;

const contatoController = {

    index: async (req,res)=>{
        let sql = `SELECT id, nome FROM contatos WHERE usuarios_id=${uid}`;
        let contatos = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});
        
        //adicionando campos de telefones e emails
        contatos = contatos.map(
            c =>{
                c.emails = [];
                c.telefones = [];
                return c;
            }
        )

            //carregando os telefones dos contatos  do usuário de id  "uid"
                sql = `
                    SELECT
                        t.id,
                        t.telefone,
                        t.contatos_id
                    FROM
                        contatos c
                        INNER JOIN telefones t on t.contatos_id=c.id
                    WHERE
                    usuarios_id=${uid};

                `
                let telefones = await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});

                //carregando os emails dos contatos do usuário de id=uid
                sql = `SELECT
                        e.id,
                        e.email,
                        e.contatos_id
                    FROM
                        contatos c
                        INNER JOIN emails e on e.contatos_id=c.id
                 WHERE
                        usuarios_id=${uid};
                `
                let  emails =  await sequelize.query(sql, {type:sequelize.QueryTypes.SELECT});

                // inserindo os emails carregados nos seus respectivos contatos
                emails.forEach(

                    email => {
                        //encontrar o contato que é dono deste email
                        let contato = contatos.find(c => c.id == email.contatos_id);

                        //adicionar ao o array de emails desse contato o email da vez
                        contato.emails.push(email.email);
                    }

                );

                // inserindo os telefones carregados nos seus respectivos contatos
                telefones.forEach(

                    telefone => {
                        //encontrar o contato que é dono deste telefone
                        let contato = contatos.find(c => c.id == telefone.contatos_id);

                        //adicionar ao o array de telefones desse contato o telefone da vez
                        contato.telefones.push(telefone.telefone);
                    }

                );

        res.status(200).json({contatos});
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
