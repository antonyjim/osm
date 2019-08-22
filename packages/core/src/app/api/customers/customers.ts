import { Querynator, simpleQuery } from '../../../lib/queries'

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

  public async getMyCustomers(userId: string = this.context.req.auth.u) {
    const query = 'SELECT nsaNonsig FROM sys_user_nsacl WHERE nsaUserId = ?'
    const params = [userId]
    return await simpleQuery(query, params)
  }
}

export { Customer }
