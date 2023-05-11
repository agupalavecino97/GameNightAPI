import app from './app.js';
import { sequelize } from './database.js'
import './models/User.js';
// import './models/task.js';

async function main () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await sequelize.sync({force: false});
        app.listen(4000);
        console.log("Server listenig on port", 4000);
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

main();