import googleAuth from 'google-auth-library';
import google from 'googleapis';
import config, { googleInfo } from '../../config';
import CREDENTIALS from '../../credentials/moobook-d04d72b7dca7';


// Destructuring
const { 
    scopes:SCOPES,
    subject:SUBJECT 
} = googleInfo;

const googleJwtClient = {
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

export default googleJwtClient;