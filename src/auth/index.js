import jwt from 'jsonwebtoken';
import database from '../database';
import secret from '../credentials/jwtsecret';
import sqlConstructor from '../lib/statementConstructor';
import googleJwtClient from './google/googleJwtClient';
import googleUserClient from './google/googleUserClient';

import config from '../config';

const authorizer = {
    google: {
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
    },
    authorizeApi: (key, callback) => {
        let statement = sqlConstructor.select('apikeys', { 'key': key });
        database.query(statement, (err, res) => {
            if (err) return err;
            if(res.rowCount > 0){
                jwt.sign(res.rows[0], secret.secret, (err, token) => {
                    callback(err, token);
                });
            } else {
                callback({'status':'error', 'message': 'API Key does not exist!'}, null)
            }
        });
    }
};

export default authorizer;