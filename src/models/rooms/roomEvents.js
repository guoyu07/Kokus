import database from '../../database';
import sqlConstructor from '../../lib/statementConstructor';
import dateFilter from '../../lib/dateFilter';


const roomEventsModel = {
    list: (data, callback) =>{
        if(data.filter == 'false' || data.filter == false){
            delete data.filter;
        } else {
            let week = {
                between: {
                    attribute: 'start_time', 
                    first: dateFilter.getWeek().first,
                    last: dateFilter.getWeek().last
                }
            }
            data = Object.assign(data, week);
        }

        let statement = sqlConstructor.select('events', data);
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