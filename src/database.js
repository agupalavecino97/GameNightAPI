import Sequelize  from "sequelize";

export const sequelize = new Sequelize(
    'game_night', 
    'root', 
    '', {
        host: '127.0.0.1',
        dialect: 'mysql'
    }
);
