import { Querynator } from './../../connection'

class Customer extends Querynator {
    constructor(context, queryFields) {
        super(context, queryFields)
        this.tableName = 'sys_customer'
        this.primaryKey = 'nsNonsig'
    }

    public async getById(nsNonsig) {
        console.log(nsNonsig)
        return await this.byId(nsNonsig)
    }

    public async where(fields, pagination) {
        console.log('Searching for ', JSON.stringify(fields))
        if (!fields || Object.keys(fields).length === 0) return this.all(pagination)

        return await this.byFields({fields}, pagination)
    }
}

export { Customer }
