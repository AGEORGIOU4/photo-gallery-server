import { DataTypes, Model } from 'sequelize';
import db from '../../../config/database.config';

class Protocol extends Model {
    declare id: string;
    declare name: string;
    declare category: string;
    declare author: string;
    declare rating: string;
    declare json: string;
}

Protocol.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        json: {
            type: DataTypes.JSON,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'protocols'
    }
);

export default Protocol;