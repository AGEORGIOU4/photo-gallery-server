import { DataTypes, Model } from 'sequelize';
import db from '../../../config/database.config';

class Search extends Model {
    declare userId: string;
    declare keywords: object[];
}

Search.init(
    {
        userId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        keywords: {
            type: DataTypes.JSON,
            allowNull: false,
        }
    },
    {
        sequelize: db,
        tableName: 'searches',
    }
);

export default Search;

