'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable (
       'contatos',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            allowNull: false,
            autoIncrement: true
          },
          nome:{
            type:Sequelize.STRING(45),
            allowNull: false
          },
          usuarios_id:{
            type:Sequelize.INTEGER(100),
            allowNull: false,
            references: {
              model: {
                tableName: 'usuarios'
              },
              key:'id'
            }
          },
        }
      );
  },

  async down (queryInterface, Sequelize) {

      Example:
      await queryInterface.dropTable('users');
     
  }
};
