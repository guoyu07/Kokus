import googleAuth from 'google-auth-library';
import google from 'googleapis';
import config, { google_info } from '../config';
import CREDENTIALS from '../credentials/serverAccess';


// Destructuring
const { 
    scopes:SCOPES,
    subject:SUBJECT } = google_info;
const jwtClient = {
    authorize(callback){
        let jwtClient = new google.auth.JWT(
            CREDENTIALS.client_email,
            null,
            CREDENTIALS.private_key,
            SCOPES,
            SUBJECT
        );

        jwtClient.authorize((err, tokens) => {
            // Return the autherized client
            callback(err, jwtClient);
        });
    }
}

export default jwtClient;