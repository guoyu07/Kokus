import serverConfig from './server';
import databaseConfig from './database';

export const paths = {
    serverConfigPath: __dirname + '/server.json',    
    databaseConfigPath: __dirname + '/database.json'
};

export {
    serverConfig,
    databaseConfig
};