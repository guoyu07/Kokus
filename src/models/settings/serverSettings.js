import { serverConfig, paths } from '../../configs';
import fs from 'fs';
import path from 'path';


const serverSettigsModel = {
    set: (key, value, callback) => {
        if(!serverConfig.hasOwnProperty(key)) return callback('Setting doesn\'t exist', null);
        serverConfig[key] = value;
        let save = JSON.stringify(serverConfig);
        fs.writeFile(paths.serverConfigPath, save,'UTF-8', (err, data)=> {
            callback(err, data);
        });
    },
    get: (key) => {
        return serverConfig[key];
    },
    getAll: () => {
        return serverConfig;
    },
    find: (key, callback) => {
        if(!serverConfig.hasOwnProperty(key)) return callback('Setting doesn\'t exist', null);
        callback(null, serverConfig[key]);
    }
};

export default serverSettigsModel;