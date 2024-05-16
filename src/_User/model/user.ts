import {DataTypes, Model} from 'sequelize';
import db from '../../../config/database.config';

class User extends Model {
    declare id: string;
    declare first_name: string;
    declare last_name: string;
    declare email: string;
    declare phone: string;
    declare role_id: string;
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'users',
    }
);

export default User;