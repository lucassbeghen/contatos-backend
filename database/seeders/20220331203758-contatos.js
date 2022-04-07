'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('contatos', [
        {
          id: 1,
          nome:"Luis",
          usuarios_id: 1
        },
        {
          id: 2,
          nome:"Rarael",
          usuarios_id: 1
        },
        {
          id: 3,
          nome:"Pablo",
          usuarios_id: 2
        },
        {
          id: 4,
          nome:"Patara",
          usuarios_id: 2
        },
        {
          id: 5,
          nome:"Luca",
          usuarios_id: 3
        },
        {
          id: 6,
          nome:"Thiago",
          usuarios_id: 3
        }

    ], {});
    
  },

  async down (queryInterface, Sequelize) {

      Example:
      await queryInterface.bulkDelete('contatos', null, {});
     
  }
};
