function Project(sequelize, DataType) {
    const attributes = {

        id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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
                model: 'makers',
                key: 'id'
            }
        },
        privateStatus: {
            type: DataType.INTEGER,
            allowNull: true
        }

    };

    const options = {};

    return sequelize.define('project', attributes, options);
}

module.exports = Project;