import authorizer from '../auth';
import google from 'googleapis';

let calendar = google.calendar('v3');
let auth = {};
authorizer.authorize((err, res) => {
    if(err) throw(err);
    auth = res;
});
const calendars = {
    calendarList:{
        list(callback) {
            calendar.calendarList.list(
                    {auth:auth}, 
                    (err,res) =>{
                        callback(err, res);
                    });
        },
        insert(callback){
            
        },
        get(calendarId, callback){
            calendar.calendars.get(
                {auth:auth, calendarId: calendarId},
                (err,res) => {
                    callback(err, res);
                });
        }    
    },
    events: {
        list(id, callback){
            calendar.events.list({auth:auth, calendarId:id},
            (err, res) => {
                callback(err, res);
            });
        }

    }
}
export default calendars;