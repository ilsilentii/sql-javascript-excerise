const pg = require("pg");
const settings = require("./settings"); // settings.json

const people = process.argv.slice(2)

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

//Connects to Database

client.connect((err, result) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    readname();
});

//Query's the database based on user input

function readname() {
    console.log("Searching Database ...")

    client.query("SELECT * FROM famous_people WHERE last_name = $1::text", people, (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }
        printname(result);
        client.end();
    });
}

//Prints out the results of the query

function printname(result) {

    console.log("Found " + result.rows.length + " person(s) by the name of " + "'" + people + "'")

    for (let i in result.rows)
        console.log("- " + (parseInt(i) + 1) + ": " + result.rows[i].first_name + " " + result.rows[i].last_name + ", " + "born " + result.rows[i].birthdate.toISOString().substr(0, 10));

}