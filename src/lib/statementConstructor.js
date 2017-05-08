import config from '../config';
import knex from 'knex';

let builder = new knex({ client: config.databaseSettings.databaseType });

const sqlConstructor = {
    /**
     * Table can be an array of tables ['foo', 'bar', ...];
     * Data is an Object eg {'foo': 'foo', 'bar': 'bar', ... };
     * 
     * @param table String
     * @param table Array
     * @param data Object 
     * @param data String 
     * 
     */
    insert: (table, data) => {
        let sql = builder.into(table);
        sql.returning('id');
        if(data){
            // Check if its a json object for the database
            for(let key in data){
                if(typeof data[key] === 'object'){
                    data[key] = JSON.stringify(data[key]);
                }
            }
            sql.insert(data);
        }
        return sql.toString();  
    },
    /**
     * Table can be an array of tables ['foo', 'bar', ...];
     * Params is where you want updated eg {'foo_id': 1, 'bar_id': 2, ... };
     * Params can be a String too eg "foo_id = 1"
     * Data is what you want updated eg {'foo_name': 'bar', ... }
     * 
     * @param table String
     * @param table Array
     * @param params Object 
     * @param params String 
     * @param data Object 
     * 
     */
    update: (table, data, params) => {
        let sql = builder.into(table);
        sql.returning('id');        
        if(data){
            // Check if its a json object for the database
            for(let key in data){
                if(typeof data[key] === 'object'){
                    // Then stringify it.
                    data[key] = JSON.stringify(data[key]);
                }
            }
            sql.update(data);
        }
        if(params){
            sql.where(params);
        }
        return sql.toString();
    },
    /**
     * Table can be an array of tables ['foo', 'bar', ...];
     * Data is "where foo = bar". This can be an object or String
     * params is what you want as an array ['foo', 'bar', 'foo.name', ...];
     * 
     * @param params String
     * @param params Array
     * 
     * @param data Object
     * @param data String
     * 
     * @param table Array
     * @param table String
     */
    select: (table, data, params) => {
        let sql = builder.select().from(table);
        if(params){
            sql.select(params);
        }
        if(data){
            if(data.filter){
                sql = helpers.filter(sql, data.filter);
                delete data.filter;
            }
            if(data.between){
                sql = helpers.between(sql, data.between);
                delete data.between;
            }
            if(data.after){
                sql = helpers.after(sql, data.after);
                delete data.after;
            }
            if(data.orderBy){
                sql = helpers.orderBy(sql, data.orderBy);
                delete data.orderBy;
            }
            sql.where(data);
        }
        return sql.toString();
    },
    /**
     * Table can be an array of tables ['foo', 'bar', ...];
     * Data is "where foo = bar". This can be an object or String 
     * 
     * @param data Object
     * @param data String
     * 
     * @param table Array
     * @param table String
     */
    delete: (table, data) => {
        let sql = builder.delete().from(table);
        if(data){
            sql.where(data);
        }
        return sql.toString();
    }

};
const helpers = {
    between: (sql, between) => {
        if(Array.isArray(between)) {
            between.forEach((element) => {
                // Which attribute is the being checked
                sql.whereBetween(element.attribute, [element.first, element.last]);     
            });
        } else {
            sql.whereBetween(between.attribute, [between.first, between.last]);
        }
        return sql;
    },
    filter: (sql, filter) => {
        if(Array.isArray(filter)) {
            filter.forEach((element) => {
                // Where the first is something than the last
                // eg first < last 
                sql.where(element.first, element.operator, element.last);     
            });
        } else {
            sql.where(filter.first, filter.operator, filter.last);
        }
        return sql;
    },
    after: (sql, after) => {
        sql.where(after.attribute, '>=', after.date);  
        return sql;      
    },
    orderBy: (sql, orderBy) => {
        sql.orderBy(
            orderBy.attribute ? orderBy.attribute : orderBy,
            // The default order way is ascending.
            orderBy.type ? orderBy.type : 'ASEC'
            );  
        return sql;      
    }
}
export default sqlConstructor;
