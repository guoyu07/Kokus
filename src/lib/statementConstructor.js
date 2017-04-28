import config from '../config';
import squel from 'squel';

let sqlBuilder = squel.useFlavour(config.databaseType);


const sqlConstructor = {
    insert: (table, data) => {
        let sql = sqlBuilder.insert().into(table);
        
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                sql.set(key, data[key]);
            }
        }
        return sql.toString();  
    },
    /**
     * update can accept table as an array
     * @param table String
     * @param table Array
     */
    update: (table, id, data) => {
        let sql = sqlBuilder.update();
        if(table.constructor == Array){
            table.forEach((t) => {
                sql.table(t);
            });
        } else {
            sql.table(table);
        }
        if(id){
            for (let key in id) {
                if (id.hasOwnProperty(key)) {
                   sql.where(key +"= '" + id[key] +"'");
                }
            }
        }
        if(data){
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    sql.set(key, data[key]);
                }
            }
        }
        return sql.toString();
    },
    select: (table, data) => {
        let sql = sqlBuilder.select().from(table);
        if(data){
            for (let key in data) {
                // This is flawed, it will keep adding where clauses
                // it should add " AND " instead. Fix incoming
                if (data.hasOwnProperty(key)) {
                    sql.where(key +"= '" + data[key] +"'");
                }
            }
        }
        return sql.toString();
    },
    delete: (table, data) => {
    }
}


export default sqlConstructor;
