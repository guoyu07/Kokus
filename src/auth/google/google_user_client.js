import googleAuth from 'google-auth-library';
import google from 'googleapis';
import config, { google_info } from '../../config';
import web from '../../credentials/client_secret_362110245741-im59raf78epd98bbu0keril4d1f8ccp7.apps.googleusercontent.com';
let OAuth2 = google.auth.OAuth2;

// let oauth2Client = new OAuth2(
//   google_info.,
//   YOUR_CLIENT_SECRET,
//   YOUR_REDIRECT_URL
// );


const google_user_client = {
    authorize(){
        console.log(web);

    } 

}

export default google_user_client;