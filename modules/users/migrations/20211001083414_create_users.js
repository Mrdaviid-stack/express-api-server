const tableName = 'users';

/** @param {import('knex')} knex */
exports.up = async function(knex) {
  await knex.schema.dropTableIfExists(tableName)
  await knex.schema.createTable(tableName, table => {
    /* Created fields */
    table.increments('users_id')
    table.string('users_uuid', 36).notNullable()
    table.string('users_first_name')
    table.string('users_last_name')
    table.string('users_email')
    table.string('users_username')
    table.string('users_password_hash')
    table.dateTime('users_created_at').defaultTo(knex.fn.now())
    table.dateTime('users_updated_at')
    table.dateTime('users_deleted_at')
    /* Add indices */
    table.unique('users_uuid', 'users_uuid')
    table.unique('users_email', 'users_email')
    table.unique('users_username', 'users_username')
    table.unique('users_password_hash', 'users_password_hash')
    table.unique('users_created_at', 'users_created_at')
    table.unique('users_updated_at', 'users_updated_at')
    table.unique('users_deleted_at', 'users_deleted_at')
  })
};

/** @param {import('knex')} knex */
exports.down = async function(knex) {
  /* Drop table if exist */
  await knex.schema.dropTableIfExists(tableName)
};