import database from '../../database';
import sqlConstructor from '../../lib/statementConstructor';

const roomEventsModel = {
    list: (roomId, callback) =>{
        let statement = sqlConstructor.select('events', roomId);
        database.query(statement, (err, event) => {
            callback(err, event);
         });
    },
    create: (event, callback) => {
        let statement = sqlConstructor.insert('events', event);
        database.query(statement, (err, event) => {
            callback(err, event);
        });
    },
    read:   (event, callback) => {
        let statement = sqlConstructor.select('events', event);
        database.query(statement, (err, event) => {
            callback(err, event);
        });
    },
    update: (eventId, event, callback) => {
        let statement = sqlConstructor.update('events', event, eventId);
        database.query(statement, (err, event) => {
            callback(err, event);
        });
    },
    delete: (event, callback) => {
        let statement = sqlConstructor.delete('events', event);
        database.query(statement, (err, event) => {
            callback(err, event);
        });
    }
};
export default roomEventsModel;