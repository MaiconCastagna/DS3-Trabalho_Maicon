function Project(sequelize, DataType) {
    const attributes = {

        name: {
            type: DataType.STRING,
            allowNull: false
        },
        image: {
            type: DataType.STRING,
            allowNull: true
        },
        description: {
            type: DataType.STRING,
            allowNull: false
        },
        authorId: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'maker'  ,
                key: 'id'
            }
        },

    };

    const options = {};

    return sequelize.define('project', attributes, options);
}

module.exports = Project;