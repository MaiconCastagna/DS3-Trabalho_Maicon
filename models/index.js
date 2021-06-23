/**
 * Inicializa models
 */
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
});

// Carrega os models existentes!
sequelize.Maker = sequelize.import('./maker.js');
sequelize.Project = sequelize.import('./project.js');

// Sincronize/crie o banco de dados
sequelize.sync();

module.exports = sequelize;
