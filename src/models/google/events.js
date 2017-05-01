import authorizer from '../../auth';
import google from 'googleapis';

// Create calendar object
let calendar = google.calendar('v3');
// Create the event object
let { events } = calendar;
 
let auth = {};
// Get authorization from google with the credentials.
authorizer.google.authorize((err, JWTToken) => {
    if(err) throw(err);

    // Store the authorization in the auth object
    auth = JWTToken;
});
const googleEventsModel = {
    // List all calendar events
    list(calendarId, callback){
        let eventOptions = {
            auth, 
            calendarId
        };
        events.list(eventOptions, (err, event) => {
            callback(err, event);
        });
    },

    // Create a google calendar event
    create(event, callback){
        let eventOptions = {
            auth, // Always have the auth object.
            calendarId: event.calendarId,
            resource: event
        }; 
        events.insert(eventOptions,(err, event) => {
            callback(err, event);
        });
    },

    // Updates a given event in google calendar
    update(event, callback){
        let eventOptions = {
            auth,
            calendarId: event.calendarId,
            eventId: event.eventId,
            resource: event
        }; 
        events.update(eventOptions,(err, event) => {
            callback(err, event);
        });
    },

    // Get a specific calendar event from calendarId with eventId
    get(calendarId, eventId, callback){
        let eventOptions = {
            auth,
            calendarId,
            eventId
        };
        events.get(eventOptions, (err, event) => {
            callback(err, event);
        });
    },

    // Delete a specific calendar event 
    delete(event, callback){
        let eventOptions = {
            auth,
            calendarId: event.calendarId,
            eventId: event.eventId
        };
        events.delete(eventOptions, (err, event) => {
            callback(err, event);
        });
    }
}
export default googleEventsModel;