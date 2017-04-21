import jwtClient from './jwtClient';
import google from 'googleapis';

let adminCalendar = google.admin('directory_v1');

const calendarsAdmin = {
    list(callback){
        jwtClient.authorize((err,res) => {
            adminCalendar.resources.calendars.list(
                {auth:res, customer:'my_customer'}, (err,res) =>{
                    callback(err, res);
                }
            )
        });
    },
    insert(callback){
        
    },
    get(resourceId, callback){
        jwtClient.authorize((err,res) => {
            console.log(adminCalendar.resources.calendars);
            adminCalendar.resources.calendars.get(
                {auth:res, 
                    customer:'my_customer',
                    calendarResourceId: resourceId 
                }, (err,res) =>{
                    callback(err, res);
                }
            )
        });        
    }
}
export default calendarsAdmin;