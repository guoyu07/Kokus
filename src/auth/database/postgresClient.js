import credentials from '../../credentials/databaseCrendentials';
import { databaseSettings } from '../../config';
import pg from 'pg';

// Destructuring the needed connection information.
const { postgres } = credentials.databaseCredentials;
const { user, password } = postgres;
const { host, port, database } = databaseSettings;

// Database connection information 
const poolConfig = {
    user,
    password,
    database,
    host,
    port,
    max: 10, // Max clients in the pool
    idleTimeoutMillis: 30000,
};
// A PG pool - Read here https://github.com/brianc/node-postgres
const pool = new pg.Pool(poolConfig);

pool.on('error', (err, client) => {
    console.error('Idle client error', err.message, err.stack);
});

export const pgQuery = (sql, callback) => { 
    return pool.query(sql, callback); 
};

export const pgConnection = (callback) => {
    return pool.connection(callback);
};

