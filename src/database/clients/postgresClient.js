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
// const postgresClient = {
//     query: (callback) => {
//         callback(err, pool);
//     }
// };

export const pgQuery = (sql, callback) => { 
    // console.log(text, values);
    return pool.query(sql, callback); 
};

export const pgConnection = (callback) => {
    return pool.connection(callback);
};

