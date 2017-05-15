import jwt from 'jsonwebtoken';
import database from '../../database';
import secret from '../../credentials/jwtsecret';
import sqlConstructor from '../../lib/statementConstructor';

import config from '../../config';

const authorizer = {
    authorizeApi: (key, callback) => {
        let statement = sqlConstructor.select('apikeys', { 'key': key });
        database.query(statement, (err, res) => {
            let data = res.rows[0];            
            if (err) return callback(err, null);
            if(res.rowCount > 0){
                jwt.sign(data, secret.secret, (err, token) => {
                    callback(err, token);
                });
            } else {
                callback({'status':'error', 'message': 'API Key does not exist!'}, null)
            }
        });
    },
    authorizeLicenseKey: (license, callback) => {
        let statement = sqlConstructor.select('license_keys', { 'license_key': license });
        database.query(statement, (err, res) => {
            if (err) return callback(err, null);
            if(res.rowCount > 0){
                let data = res.rows[0];
                if(!data.valid) return callback('Invalid license key', null);
                jwt.sign(data, secret.secret, (err, token) => {
                    callback(err, token);
                });
            } else {
                callback({'status':'error', 'message': 'License key does not exist!'}, null)
            }
        });
    }
};

export default authorizer;