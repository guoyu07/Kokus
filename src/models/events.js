import jwtClient from './jwtClient';
import google from 'googleapis';

let calendar = google.calendar('v3');
let { events } = calendar; 
let auth = {};
jwtClient.authorize((err, res) => {
    if(err) throw(err);
    auth = res;
});
const eventsModel = {
    list(id, callback){
        events.list({auth:auth, calendarId:id},
        (err, res) => {
            callback(err, res);
        });
    },
    create(event, callback){
        let eventOptions = {
            auth: auth,
            calendarId: event.calendarId,
            resource: event
        }; 
        events.insert(eventOptions,(err, res) => {
            callback(err,res);
        });
    },
    get(calendarId, eventId, callback){
        let eventOptions = {
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        };
        events.get(eventOptions, (err, event) => {
            callback(err, event);
        });
    }
}
export default eventsModel;