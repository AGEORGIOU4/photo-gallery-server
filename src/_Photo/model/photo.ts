import { DataTypes, Model } from 'sequelize';
import db from '../../../config/database.config';

class Photo extends Model {
    declare id: string;
    declare info: object;
    declare userId: string;
}

Photo.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        info: {
            type: DataTypes.JSON,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        tableName: 'photos',
    }
);


export default Photo;
