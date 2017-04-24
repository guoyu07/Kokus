import jwtClient from './jwtClient';
import google from 'googleapis';

// Create calendar object
let calendar = google.calendar('v3');
// Create the event object
let { events } = calendar;
 
let auth = {};
// Get authorization from google with the credentials.
jwtClient.authorize((err, res) => {
    if(err) throw(err);

    // Store the authorization in the auth object
    auth = res;
});
const eventsModel = {
    // List all calendar events
    list(calendarId, callback){
        let eventOptions = {
            auth, 
            calendarId
        };
        events.list(eventOptions, (err, res) => {
            callback(err, res);
        });
    },

    // Create a google calendar event
    create(event, callback){
        let eventOptions = {
            auth: auth, // Always have the auth object.
            calendarId: event.calendarId,
            resource: event
        }; 
        events.insert(eventOptions,(err, res) => {
            callback(err,res);
        });
    },

    // Updates a given event in google calendar
    update(event, callback){
        let eventOptions = {
            auth: auth,
            calendarId: event.calendarId,
            eventId: event.eventId,
            resource: event
        }; 
        events.update(eventOptions,(err, res) => {
            callback(err,res);
        });
    },

    // Get a specific calendar event from calendarId with eventId
    get(calendarId, eventId, callback){
        let eventOptions = {
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        };
        events.get(eventOptions, (err, event) => {
            callback(err, event);
        });
    },

    // Delete a specific calendar event 
    delete(event, callback){
        let eventOptions = {
            auth: auth,
            calendarId: event.calendarId,
            eventId: event.eventId
        };
        events.delete(eventOptions, (err, event) => {
            callback(err, event);
        });
    }
}
export default eventsModel;