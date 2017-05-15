import credentials from '../../credentials/databaseCrendentials';
import { databaseSettings } from '../../config';
import pg from 'pg';
const { postgres } = credentials.databaseCredentials;
const { user, password } = postgres;
const { host, port, database } = databaseSettings;
const poolConfig = {
    user,
    password,
    database,
    host,
    port,
    max: 10, // Max clients in the pool
    idleTimeoutMillis: 30000,
};
const pool = new pg.Pool(poolConfig);
pool.on('error', (err, client) => {
    console.error('Idle client error', err.message, err.stack);
});

export const pgQuery = (sql, callback) => { 
    pool.connect((err, client, done)=> {
        if(err) return callback(err, null);
        client.query(sql, (err, result) => {
            done();
            callback(err, result);
        });
    });
};

export const pgConnection = (callback) => {
    return pool.connect(callback);
};

