function Maker(sequelize, DataType) {
    const attributes = {

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