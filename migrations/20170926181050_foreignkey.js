exports.up = function(knex, Promise) {
    return knex.schema.createTable('public_milestones', (table) => {
        table.increments();
        table.integer('famous_person_id');
        table.string('Description');
        table.date('Date_Achieved');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('public_milestones');
};