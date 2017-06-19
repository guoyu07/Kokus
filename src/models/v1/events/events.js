import database from '../../../database';
import sqlConstructor from '../../../lib/statementConstructor';
import dateFilter from '../../../lib/dateFilter';


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
        if(params.orderBy){
            // This is if the "user" wants it to be ordered by something else than the defualt value
            if(params.orderType){
                Object.assign(data, { orderBy: { attribute: params.orderBy, type: params.orderType } })
            } else {
                data.orderBy = params.orderBy;
            }
        } else {
            // Defualt order is by start_time
            data.orderBy = 'start_time'
        }

        let statement = sqlConstructor.select('events', data);
        database.query(statement, (err, event) => {
            callback(err, event);
         });
    },
    create: (event, callback) => {
        // Check if it's legal to create the event           
        eventsModel.illegalTimeFrameChecker(event, (err) => {
            if(err) return callback(err, null);
            let statement = sqlConstructor.insert('events', event);
            database.query(statement, (err, event) => {
                callback(err, event);
            });
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
    },
    illegalTimeFrameChecker: (event, callback) => {
        let newState = sqlConstructor.illegalCheck('events', event);
            database.query(newState, (err, events) => {
                // if(err) return callback(err, events);
                if(!events) return callback('Illegal time frame, overlapping events');
                callback(null, events);
            })
    }
};
export default eventsModel;