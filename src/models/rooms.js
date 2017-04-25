import authorizer from '../auth';
import squel from 'squel';

let sqlBuilder = squel.useFlavour('postgres');

let client = null;
//TODO: Err handling, this is only here temporaly
let err = null;


const roomsModel = {
    openConnection: () => {
        authorizer.connectDatabase((err, connection) => {
            if(err) throw(err);
            client = connection;
        });
    },
    create: (roomData, callback) => {
        roomsModel.openConnection();
        client.connect();
        let statement = roomsModel.statementConstructor('INSERT', "rooms", roomData);
        let query = client.query(statement);


    },
    read:   (room, callback) => {
        roomsModel.openConnection();
        client.connect();
        let statement = roomsModel.statementConstructor('SELECT', "rooms", room);
        let query = client.query(statement);
        query.on('end', (result) => {
            if(result.rows){
                callback(err, result.rows[0]);
            } else {
                callback(err, {"error": "no rooms in database"});
            }
            client.end();
        });
        
    },
    update: (room, callback) => {
            
    },
    delete: (room, callback) => {
            
    },
    list: (callback) =>{
        roomsModel.openConnection();
        client.connect();
        let statement = roomsModel.statementConstructor('SELECT', "rooms");
        let query = client.query(statement);
        query.on('end', (result) => {
            if(result.rows){
                callback(err, result.rows);
            } else {
                callback(err, {"error": "no rooms in database"});
            }
            client.end();
        });
    },
    statementConstructor: (type, table, room) => {
        let sql = "";
        switch(type){
            case 'INSERT':
                sql = sqlBuilder.insert()
                .into(table)
                .set('room_name', room.name)
                .set('room_description', room.description)
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
}
export default roomsModel;