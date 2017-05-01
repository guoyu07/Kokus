import { serverConfig } from '../../configs';


const serverSettigsModel = {
    set: (key, value) => {
        serverConfig[key] = value;
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