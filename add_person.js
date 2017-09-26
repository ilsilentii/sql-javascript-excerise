const settings = require("./settings");
const knex = require('knex')({
    dialect: 'postgresql',
    connection: settings
});

// Adds information to the database based on the users input

function write_to_database() {
    if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
        console.log("Pleas enter correct information")
        knex.destroy();
    } else {

        const insert = {
            first_name: process.argv[2],
            last_name: process.argv[3],
            birthdate: process.argv[4]
        }

        knex.insert(insert).into("famous_people").finally(function() {
            get_table();
            knex.destroy();
        });
    }
}

write_to_database()

//This function displays the information in the current database

function get_table() {
    knex.select('*').from('famous_people')
        .asCallback(function(err, table) {
            if (err) return console.error(err);
            console.log(table)
        });
}