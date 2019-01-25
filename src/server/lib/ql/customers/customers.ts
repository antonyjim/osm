import { Querynator } from './../../connection'

class Customer extends Querynator {
    constructor() {
        super()
        this.tableName = 'nsInfo'
        this.primaryKey = 'nsNonsig'
    }

    public async getById({nsNonsig}) {
        console.log(nsNonsig)
        return await this.byId(nsNonsig)
    }

    public async where({fields}) {
        console.log('Searching for ', JSON.stringify(fields))
        if (!fields || Object.keys(fields).length === 0) return this.all()

        return await this.byFields({fields})
    }
}

export { Customer }