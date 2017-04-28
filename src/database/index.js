import { pgQuery, pgConnection } from './clients/postgresClient';
import config from '../config';
import squel from 'squel';

let sqlBuilder = squel.useFlavour(config.databaseType);


const database = {
    query: (sql,callback) => {
        pgQuery(sql, callback);
    },

    connection: (callback) => {
        pgConnection(callback);
    },

    statementConstructor: (type, table, room) => {
        let sql = "";
        switch(type){
            case 'INSERT':
                sql = sqlBuilder.insert()
                .into(table)
                .set('room_name', room.name)
                .set('room_description', "\"" + room.description + "\"")
                .set('room_calendar_id', room.calendarId)
                .toString();
                return sql;            
            case 'UPDATE':

            break;
            case 'SELECT':
                if(room != null){
                    sql = sqlBuilder.select()
                    .from(table)
                    .where('room_id = ' + room.id)
                    .toString();
                } else {
                    sql = sqlBuilder.select()
                    .from(table)
                    .toString();
                }
                return sql;
            case 'DROP':

            break;
        }
    }
};

export default database;