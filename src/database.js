import Sequelize  from "sequelize";

export const sequelize = new Sequelize(
    'railway', 
    'root', 
    'cxTaE1HBNV8oRg2HLzZA', {
        host: 'containers-us-west-8.railway.app',
        dialect: 'mysql',
        port: 5586
    }
);
