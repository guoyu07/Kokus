import database from '../../database';
import sqlConstructor from '../../lib/statementConstructor';


const apikeyModel = {
    list: (callback) => {
        let statement = sqlConstructor.select("apikeys");
        database.query(statement, (err, data) => {
            callback(err, data);
         });
    },
    create: (room, callback) => {
        let statement = sqlConstructor.insert("apikeys", room);
        
        database.query(statement, (err, data) => {
            callback(err, data);
        });
    },
    read:   (room, callback) => {
        let statement = sqlConstructor.select("apikeys", room);
        database.query(statement, (err, data) => {
            callback(err, data);
        });
    },
    update: (roomId, room, callback) => {
        let statement = sqlConstructor.update("apikeys", roomId, room);
        database.query(statement, (err, data) => {
            callback(err, data);
        });
    },
    delete: (room, callback) => {
        let statement = sqlConstructor.delete("apikeys", room);
        database.query(statement, (err, data) => {
            callback(err, data);
        });
    },
};

export default apikeyModel;