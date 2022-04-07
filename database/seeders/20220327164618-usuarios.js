'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert(
        'usuarios',
        [
          {
            id: 1,
            nome:'Rafaela',
            email:'rafaela@meta.com',
            senha:bcrypt.hashSync('123456',10)
          },
          {
            id: 2,
            nome:'lucas',
            email:'lucas@meta.com',
            senha:bcrypt.hashSync('12323456',10)
          },
          {
            id: 3,
            nome:'giovanna',
            email:'giovanna@meta.com',
            senha:bcrypt.hashSync('1234523236',10)
          }
        ], {});
    
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('usuarios', null, {});
  }
};
