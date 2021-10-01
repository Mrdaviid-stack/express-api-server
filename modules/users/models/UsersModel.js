/* Reference the custom type declaration file */
/// <reference path="../../../typings/index.d.ts"/>

import { BaseModel } from "../../../core/models/BaseModel"

class UsersModel extends BaseModel {

  constructor() {

    const fields = {
      id: 'users_id',
      uuid: 'users_uuid',
      firstName: 'users_first_name',
      lastName: 'users_last_name',
      email: 'users_email',
      username: 'users_username',
      password: 'users_password_hash',
      createdAt: 'users_created_at'
    }

    super({
      table: 'users',
      primaryKey: fields.uuid,
      singularName: 'user',
      defaultOrderByColumn: fields.id
    })

    this.fields = fields

  }

  /**
   * Finds a user with the given identity, which is a username or an email
   * 
   * @param {string} identity username or email of the user
   */
  findByIdentity(identity) {
    return this.query()
      .where({ [this.fields.email]: identity })
      .orWhere({ [this.fields.username]: identity })
      .first()
  }

}

const usersModel = new UsersModel()
export { usersModel as UsersModel }
