const knex = require('knex')({
    dialect: 'postgresql',
    connection: {
        user: 'travis',
        password: 'password'
    }
});

const insert = {
    first_name: process.argv[2],
    last_name: process.argv[3],
    birthdate: process.argv[4]
}

knex.insert(insert).into("famous_people").finally(function() {
    get_table();
    knex.destroy();
});

function get_table() {
    knex.select('*').from('famous_people')
        .asCallback(function(err, table) {
            if (err) return console.error(err);
            console.log(table)
        });
}