import { Querynator } from './../../connection'

class Customer extends Querynator {
  constructor(context, queryFields) {
    super(context, queryFields)
    this.tableName = 'sys_customer'
    this.primaryKey = 'nonsig'
    this.emit('init')
  }

  public async getById(nsNonsig) {
    return await this.byId(nsNonsig)
  }

  public async where(fields, pagination) {
    if (!fields || Object.keys(fields).length === 0) return this.all(pagination)

    return await this.byFields({ fields }, pagination)
  }

  public async getMyCustomers() {
    const query = 'SELECT nsaNonsig FROM sys_user_nsacl WHERE nsaUserId = ?'
    const params = [this.context.req.auth.u]
    return await this.createQ({ query, params }, 'CALL')
  }
}

export { Customer }
