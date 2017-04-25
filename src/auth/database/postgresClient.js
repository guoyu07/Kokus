import credentials from '../../credentials/databaseCrendentials';
import { databaseSettings } from '../../config';
import pg from 'pg';

const { postgres } = credentials.databaseCredentials;
const { user, password } = postgres;
const { host, port, database } = databaseSettings;

const postgresClient = {
    authorize: (callback) => {
        let url;
        if(process.env.DATABASE_URL){
            url = process.env.DATABASE_URL;
        } else {
            url = postgresClient.constructUrl();
        }
        let databaseClient = new pg.Client(url);
        // TODO: create err
        let err = null;
        callback(err, databaseClient);
    },
    constructUrl: (callback) => {
        let url = 'postgres://';
        url += user + ":" + password + "@";
        url += host + ":" + port + "/" + database;
        return url;
    }
};

export default postgresClient;

