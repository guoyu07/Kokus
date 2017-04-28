import database from '../database';

const roomsModel = {
    create: (roomData, callback) => {
        let statement = database.statementConstructor('INSERT', "rooms", roomData);
        database.query(statement, (err, data) => {
            callback(err, data.rowCount > 0 ? { "Success": "Room created" } : null);
        });
    },
    read:   (room, callback) => {
        let statement = database.statementConstructor('SELECT', "rooms", room);
        database.query(statement, (err, data) => {
            callback(err, data.rows[0]);
            console.log("test");
        });
    },
    update: (room, callback) => {
            
    },
    delete: (room, callback) => {
            
    },
    list: (callback) =>{
        let statement = database.statementConstructor('SELECT', "rooms");
        database.query(statement, (err, data) => {
            callback(err, data.rows.length > 0  ? data.rows : { "Error": "No rooms" });
         });
        },
 
};

export default roomsModel;