import { pgQuery, pgConnection } from './clients/postgresClient';

const database = {
    query: (sql,callback) => {
        pgQuery(sql, callback);
    },

    connection: (callback) => {
        pgConnection(callback);
    }
};

export default database;