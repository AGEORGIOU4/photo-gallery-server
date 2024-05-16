import { DataTypes, Model } from 'sequelize';
import db from '../../../config/database.config';

class Event extends Model {
    declare id: string;
    declare start_time: string;
    declare end_time: string;
    declare title: string;
    declare description: string;
    declare user_id: string;
}

Event.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: db,
        tableName: 'events',
    }
);

export default Event;