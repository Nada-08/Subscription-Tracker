import pg from 'pg'

const { Pool } = pg;

const connectToPostgres = new Pool({
    user: 'postgres',
    password: 'nada',
    host: 'localhost',
    port: 5432,
    database: 'Subscription-Tracker'
});

// module.exports = {
//     query: (text, params) => connectToPostgres.query(text, params)
// };

export default connectToPostgres;