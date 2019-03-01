import { Querynator } from "../../connection";
import { Validation } from "../../validation";

/**
 * lib/ql/columns/columns.ts
 * Manage the schema
*/

// Node Modules


// NPM Modules


// Local Modules


// Constants and global variables


export default class Column extends Querynator {
    constructor(context, fields) {
        super(context, fields)
        this.tableName = 'sys_db_dictionary'
        this.primaryKey = 'sys_id'
        this.emit('init')
    }

    public async getById(id) {
        return await this.byId(id)
    }

    public async create(fields) {
        return await this.insert(fields)
    }

    public async update(fields) {
        return await this.createUpdate(fields)
    }

    public async getFields(fields, pagination) {
        if (fields) {
            return await this.byFields({fields}, pagination)
        } else {
            return await this.all(pagination)
        }
    }
}