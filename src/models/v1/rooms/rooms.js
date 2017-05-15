import database from '../../../database';
import sqlConstructor from '../../../lib/statementConstructor';


const roomsModel = {
    list: (callback) =>{
        let statement = sqlConstructor.select("rooms");
        database.query(statement, (err, data) => {
            callback(err, data);
         });
    },
    create: (room, callback) => {
        let statement = sqlConstructor.insert("rooms", room);
        database.query(statement, (err, data) => {
            callback(err, data);
        });
    },
    read:   (room, callback) => {
        let statement = sqlConstructor.select("rooms", room);
        database.query(statement, (err, data) => {
            callback(err, data);
        });
    },
    update: (roomId, room, callback) => {
        let statement = sqlConstructor.update("rooms", roomId, room);
        database.query(statement, (err, data) => {
            callback(err, data);
        });
    },
    delete: (room, callback) => {
        let statement = sqlConstructor.delete("rooms", room);
        database.query(statement, (err, data) => {
            callback(err, data);
        });
    },
};

export default roomsModel;