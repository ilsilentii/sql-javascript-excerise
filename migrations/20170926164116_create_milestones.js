exports.up = function(knex, Promise) {
    return knex.schema.createTable('milestones', (table) => {
        table.increments();
        table.string('Description');
        table.date('Date_Achieved');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('milestones');
};