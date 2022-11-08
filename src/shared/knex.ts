import Knex from 'knex';
import env from './env';

const knex = Knex({
    client: 'mysql',
    connection: {
        host : env.mysql.host,
        port : env.mysql.port,
        user : env.mysql.user,
        password : env.mysql.pwd,
        database : env.mysql.db
    }
});

export default knex;