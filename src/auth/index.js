import googleJwtClient from './google/googleJwtClient';
import googleUserClient from './google/googleUserClient';
import postgresClient from './database/postgresClient';

import config from '../config';

const authorizer = {
    authorize(callback){
        switch(config.authorizeMethod.google){
            case 'jwt': 
                googleJwtClient.authorize((err, authorizedClient) => {
                    callback(err, authorizedClient);
                });
                break;
            case 'client':
                googleUserClient.authorize((err, authorizedClient) => {
                    callback(err, authorizedClient);
                });
                break;            
        }
    },
    connectDatabase: (callback) => {
        postgresClient.authorize((err, client) => {
            callback(err, client);
        });
    }
}

export default authorizer;