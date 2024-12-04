// template to include files to MySQL instance

const mysql = require('mysql2');
const readline = require('readline');
const fs = require('fs');
const { rejects } = require('assert');

// interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const waitForInput = (query) => {
    return new Promise(resolve => rl.question(query, resolve));
};

// (async () => {
//     try {
//         // setup connection
//         const host = process.env.SQL_INSTANCE_IP || await waitForInput('SQL instance IP: ');
//         const user = process.env.MYSQL_USER || await waitForInput('MySQL username: ');
//         const password = process.env.MYSQL_PASSWORD || await waitForInput('MySQL password: ');
//         const databse = process.env.DATABASE_NAME || await waitForInput('Database name: ');
//         const source = await waitForInput('Path to command source: ');

//         // connect to Google Cloud SQL
//         const connection = mysql.createConnection({
//             host: host.trim(),
//             user: user.trim(),
//             password: password.trim(),
//             database: databse.trim()
//         });

//         // connect to database
//         connection.connect(async (err) => {
//             if (err) {
//                 console.error("Error: ", err);
//                 rl.close();
//                 return;
//             }
//             console.log("Database connected");

//             try {
//                 // load commands
//                 const sqlCommands = fs.readFileSync(source, 'utf8');
//                 const cmds = sqlCommands.split(';').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);
//                 // execute
//                 for (const cmd of cmds) {
//                     await new Promise((resolve, reject) => {
//                         connection.query(cmd, (err, res) => {
//                             if (err) {
//                                 console.error("Error during command execution: ", err);
//                                 reject(err);
//                             } else {
//                                 resolve(res);
//                             }
//                         });
//                     });
//                 }

//                 console.log("Execution completed");
//             } catch (error) {
//                 console.error("Error: ", error);
//             } finally {
//                 connection.end();
//                 rl.close();
//             }

//         });
//         rl.close();
//     } catch (error) {
//         console.error("Error:", error);
//         rl.close();
//     }
// })();


// function version of above
function querySQL(qry, source, callback, params = []) {
    require('dotenv').config();
    const connection = mysql.createConnection({
        // host: process.env.SQL_INSTANCE_IP,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.DATABASE_NAME,
        socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`
    });

    connection.connect((err) => {
        if (err) {
            console.error('Database Connection Error1:', err.message);
            return callback(err, null);
        }
        const cmd = qry || fs.readFileSync(source, 'utf8');

        connection.query(cmd, params, (err, results) => {
            connection.end();
            if (err) {
                console.error('Database Connection Error2:', err.message);
                return callback(err, null);
            }
            callback(null, results);
        });
    });
}

module.exports = querySQL;