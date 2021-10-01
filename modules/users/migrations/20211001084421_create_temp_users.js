const { v4: generateUUID } = require('uuid')
const bcrypt = require('bcrypt')

const tableName = 'users';

/** @param {import('knex')} knex */
exports.up = async function(knex) {
  /* Create a temporary users */
  const decodedPassword = (Buffer.from('password12345', 'base64')).toString()
  const passwordHash = await bcrypt.hash(decodedPassword, parseInt(process.env.BCRYPT_SALT_ROUNDS))
  await knex(tableName).insert({
    users_uuid: generateUUID(),
    users_first_name: 'John',
    users_last_name: 'Doe',
    users_email: 'johndoe@gmail.com',
    users_username: 'john.doe',
    users_password_hash: passwordHash
  })
};

/** @param {import('knex')} knex */
exports.down = async function(knex) {
  await knex(tableName)
    .where('users_username')
    .delete()
};
