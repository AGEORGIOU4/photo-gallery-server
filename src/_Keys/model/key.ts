import { DataTypes, Model } from 'sequelize';
import db from '../../../config/database.config';

class Key extends Model {
	declare type: string;
}

Key.init(
	{
		id: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
		},
		type: {
			type: DataTypes.ENUM('admin', 'technician', 'user' ),
			allowNull: false,
		},
	},
	{
		sequelize: db,
		tableName: 'keys',
	}
);

export default Key;