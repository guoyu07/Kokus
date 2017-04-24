import google_jwt_client from './google/google_jwt_client';
import google_user_client from './google/google_user_client';
import config from '../config';

const authorizer = {
    authorize(callback){
        switch(config.authorize_method){
            case 'google_jwt': 
                google_jwt_client.authorize((err, authorizedClient) => {
                    callback(err, authorizedClient);
                });
                break;
            case 'google_client':
                google_user_client.authorize((err, authorizedClient) => {
                    callback(err, authorizedClient);
                });
                break;            
        }
    }
}

export default authorizer;