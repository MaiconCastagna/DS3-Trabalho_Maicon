function Maker(sequelize, DataType) {
    const attributes = {

        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataType.STRING,
            allowNull: false
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        },
    };

    const options = {};
    
    return sequelize.define('maker', attributes, options);
}

module.exports = Maker;