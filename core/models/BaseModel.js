import { DB } from '../database/connection'

/**
 * Base model for querying CRUD operation table
 * 
 * @author Mark David Bogayan <mrkdvdbgyn@gmail.com>
 */
export class BaseModel {
  
  static transaction

  constructor({ table, primaryKey, singularName, defaultOrderByColumn, defaultOrder }) {

    this.db = DB

    this.query = () => DB(table)

    if (!table)
      throw new Error(`Please set the table field of the model for the '${table}' table.`)

    if (!primaryKey)
      throw new Error(`Please set the primary key field of the model for the '${table}' table.`);

    if (!singularName)
      throw new Error(`Please set the singular name field of the model for the '${table}' table.`);

    this.table = table
    this.primaryKey = primaryKey
    this.singularName = singularName
    this.defaultOrderByColumn = defaultOrderByColumn
    this.defaultOrder = defaultOrder

  }

  // Start a transaction
  async startTransaction() {

    BaseModel.transaction = await DB.transaction()

  }

  // End database transaction by either commiting or doing rollback
  endTransaction(toCommit = true) {

    if (!BaseModel.transaction)
      return

    if (toCommit)
      BaseModel.transaction.commit()
    else
      BaseModel.transaction.rollback()

    module.transaction = null
    
  }

  /**
   * Gets all records
   * 
   * @param {number} page Pagination
   * @param {limit} limit Number of record to get
   */
  findAll(page = 1, limit = 10) {

    const query = (BaseModel.transaction ? BaseModel.transaction(this.table) : this.query())
      .orderBy(this.defaultOrderByColumn || `${this.singularName}_id`, this.defaultOrder || 'asc')
      .limit(limit)
      .offset(limit * (page - 1))
    
    this.lastQuery = query.toQuery()

    return query

  }

  /**
   * Get one record by id
   * 
   * @param {number} id Id of the record to get.
   */
  async find(id) {

    const query = (BaseModel.transaction ? BaseModel.transaction(this.table) : this.query())
      .where({ [this.primaryKey]: id })
      .first()

    this.lastQuery = query.toQuery()

    return query
      .then(result => result || 0)

  }

  /**
   * Create a record ans return the inserted row
   * 
   * @param {{}} data Data to insert
   * @param {String | String[]} [returnColumn] Columns to return
   */
  async insert(data, returnColumn) {

    const query = (BaseModel.transaction ? BaseModel.transaction(this.table) : this.query())
      .insert(data)
      .returning(returnColumn || '*')

    this.lastQuery = query.toQuery()

    return query
      .then(result => result || 0)

  }

  /**
   * Edit record
   * 
   * @param {number} id Id of the record to update
   * @param {{}} data New data to set to the record
   */
  async update(id, data) {

    const query = (BaseModel.transaction ? BaseModel.transaction(this.table) : this.query())
      .where({ [this.primaryKey]: id })
      .update(data)
      .returning('*')

    this.lastQuery = query.toQuery()

    return query
      .then(([ result ]) => result || 0)

  }

  /**
   * Deletes a record
   * 
   * @param {number} id ID of the given data to delete  
   */
  delete(id) {

    const query = (BaseModel.transaction ? BaseModel.transaction(this.table) : this.query())
      .where({ [this.idColumn]: id })
      .delete()

    this.lastQuery = query.toQuery()

    return query

  }

}
