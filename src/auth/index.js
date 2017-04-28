import googleJwtClient from './google/googleJwtClient';
import googleUserClient from './google/googleUserClient';

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
    }
};

export default authorizer;