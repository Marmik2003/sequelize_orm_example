const { DataTypes } = require('sequelize');

module.exports = model;

async function model(sequelize) {
    const attributes = {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id',
            }
        },
        name: { type: DataTypes.STRING, allowNull: false },
        deletedDate: { type: DataTypes.DATE, allowNull: true },
    };

    return sequelize.define('Campaign', attributes);
}