// import jwtClient from '../auth/jwtClient';
import authorizer from '../auth';

import google from 'googleapis';

let adminCalendar = google.admin('directory_v1');

let auth = {};
// Get authorization from google with the credentials.
authorizer.google.authorize((err, res) => {
    if(err) throw(err);

    // Store the authorization in the auth object
    auth = res;
});

const calendarsAdmin = {
    list(callback){
        adminCalendar.resources.calendars.list(
            {
                auth, 
                customer:'my_customer'
            }, (err,res) =>{
                callback(err, res);
            }
        );
    },
    insert(callback){
        
    },
    get(resourceId, callback){
        adminCalendar.resources.calendars.get(
            {
                auth, 
                customer:'my_customer',
                calendarResourceId: resourceId 
            }, (err,res) =>{
                callback(err, res);
            }
        );
    }
}
export default calendarsAdmin;