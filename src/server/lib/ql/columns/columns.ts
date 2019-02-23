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
        const query = 'INSERT INTO ?? SET ?'
        let params: any[] = [this.tableName]
        let invalidFields = new Validation(fields)
        .required([
            'column_name',
            
        ])
        if (invalidFields.length > 0) {
            throw new TypeError('Missing required fields ' + JSON.stringify(invalidFields))
        } else {
            params.push(new Validation(fields).updateFields([this.primaryKey, 'label', 'description']))
	        this.createQ({query, params})
            return await this.byId(fields.name)
        }  
    }

    public async update(fields) {
        const query = 'UPDATE ?? SET ? WHERE ?? = ?'
        let params: any[] = [this.tableName]
        let invalidFields = new Validation(fields)
        .required([
            'sys_id',
        ])
        if (invalidFields.length > 0) {
            throw new TypeError('Missing required fields ' + invalidFields.join(','))
        } else {
            params.push(new Validation(fields).updateFields(['label', 'hint', 'type', 'length', 'readonly', 'linkable', 'nullable', 'update_key', 'default_view', 'admin_view', 'table_name', 'reference_id']))
            params.push(this.primaryKey)
            params.push(this.context.req.params.id)
            this.createQ({query, params})
            return this.byId(this.context.req.params.id)
        }  
    }

    public async getFields(fields, pagination) {
        if (fields) {
            return await this.byFields({fields}, pagination)
        } else {
            return await this.all(pagination)
        }
    }
}