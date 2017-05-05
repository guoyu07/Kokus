import database from '../../database';
import sqlConstructor from '../../lib/statementConstructor';
import dateFilter from '../../lib/dateFilter';


const eventsModel = {
    list: (data, params, callback) =>{
        if(params.filter != 'false'){
            // If the filter isent set, default to week view.
            if(!params.filter){
                params.filter = 'week';
            }
            // Merge the two objects
            Object.assign(data, dateFilter(params.filter, 'start_time')); 
        }
        if(params.userid){
            // Search by user id
            data.user_id = params.userid;
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
export default eventsModel;