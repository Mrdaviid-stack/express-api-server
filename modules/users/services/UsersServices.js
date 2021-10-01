import { v4 as generateUUID } from "uuid"
import bcrypt from "bcrypt"

import { UsersModel } from "../models/UsersModel"

export class UsersServices {

  /**
   * Create and save new user
   * 
   * @param {User} user new user
   */
  static async create(user) {

    const decodedPassword = (Buffer.from(user.password, 'base64')).toString()
    const passwordHash = await bcrypt.hash(decodedPassword, parseInt(process.env.BCRYPT_SALT_ROUNDS))

    const userData = {
      [UsersModel.fields.uuid]: generateUUID(),
      [UsersModel.fields.firstName]: user.firstName,
      [UsersModel.fields.lastName]: user.lastName,
      [UsersModel.fields.email]: user.email,
      [UsersModel.fields.username]: user.username,
      [UsersModel.fields.password]: passwordHash
    }

    const [ insertedUser ] = await UsersModel.insert(userData)

    /* Delete the password hash in the record of the inserted user. */
    delete insertedUser[UsersModel.fields.password];
    return insertedUser;

  }

  /**
   * Login of a user with the given credentials.
   *
   * @param {string} identity Username or password of the user.
   * @param {string} password Password of the user.
   */
  static async login(identity, password) {

    const user = await UsersModel.findByIdentity(identity)
    if (!user)
      return
    
    /* Decode base64 decoded password */
    password = (Buffer.from(password, 'base64')).toString()
    return await bcrypt.compare(password, user[UsersModel.fields.password])
      ? {
          uuid: user[UsersModel.fields.uuid],
          user: user[UsersModel.fields.username],
          email: user[UsersModel.fields.email]
        }
      : false

  }

}
