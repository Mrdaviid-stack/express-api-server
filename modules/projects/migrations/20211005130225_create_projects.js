const tableName = 'projects';

/** @param {import('knex')} knex */
exports.up = async function(knex) {
  await knex.schema.dropTableIfExists(tableName)
  await knex.schema.createTable(tableName, table => {
    /* Created fields */
    table.increments('projects_id')
    table.string('projects_uuid', 36).notNullable()
    table.string('projects_slug'),
    table.string('projects_title'),
    table.string('projects_description'),
    table.string('projects_article'),
    table.string('projects_status'),
    table.dateTime('projects_created_at').defaultTo(knex.fn.now())
    table.dateTime('projects_updated_at')
    table.dateTime('projects_deleted_at')
    /* Add indices */
    table.unique('projects_uuid', 'projects_uuid')
    table.unique('projects_slug', 'projects_slug')
    table.unique('projects_title', 'projects_title')
    table.unique('projects_description', 'projects_description')
    table.unique('projects_created_at', 'projects_created_at')
    table.unique('projects_updated_at', 'projects_updated_at')
    table.unique('projects_deleted_at', 'projects_deleted_at')
  })
};

/** @param {import('knex')} knex */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists(tableName)
};