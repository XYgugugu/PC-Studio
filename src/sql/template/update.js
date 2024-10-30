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

(async () => {
    try {
        // setup connection
        const host = await waitForInput('SQL instance IP: ');
        const user = await waitForInput('MySQL username: ');
        const password = await waitForInput('MySQL password: ');
        const databse = await waitForInput('Database name: ');
        const source = await waitForInput('Path to command source: ');

        // connect to Google Cloud SQL
        const connection = mysql.createConnection({
            host: host.trim(),
            user: user.trim(),
            password: password.trim(),
            database: databse.trim()
        });

        // connect to database
        connection.connect(async (err) => {
            if (err) {
                console.error("Error: ", err);
                rl.close();
                return;
            }
            console.log("Database connected");

            try {
                // load commands
                const sqlCommands = fs.readFileSync(source, 'utf8');
                const cmds = sqlCommands.split(';').map(cmd => cmd.trim()).filter(cmd => cmd.length > 0);
                // execute
                for (const cmd of cmds) {
                    await new Promise((resolve, reject) => {
                        connection.query(cmd, (err, res) => {
                            if (err) {
                                console.error("Error during command execution: ", err);
                                reject(err);
                            } else {
                                resolve(res);
                            }
                        });
                    });
                }

                console.log("Execution completed");
            } catch (error) {
                console.error("Error: ", error);
            } finally {
                connection.end();
                rl.close();
            }

        });
        rl.close();
    } catch (error) {
        console.error("Error:", error);
        rl.close();
    }
})();