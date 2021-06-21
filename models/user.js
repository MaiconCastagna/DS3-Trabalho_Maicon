/**
 * Model User - Representa a tabela user no banco de dados
 * Realiza o mapeamento de colunas em chaves do objeto no javascript
 */

function User(sequelize, DataType) {
  const attributes = {
    // atributos
    name: {
      type: DataType.STRING,
      allowNull: false // Não permite valores nulos
    },
    age: {
      type: DataType.INTEGER
    },
    username: {
      type: DataType.STRING,
      allowNull: false // Não permite valores nulos
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },
    isMaker: {
      type: DataType.BOOLEAN,
    },
  };

  const options = {};

  return sequelize.define('user', attributes, options);
}

module.exports = User;
