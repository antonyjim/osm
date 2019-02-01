import { Querynator } from "../../connection";
import { Validation } from "../../validation";

class Table extends Querynator {
    constructor(context, fields) {
        super(context, fields)
        this.tableName = 'sys_db_object'
        this.primaryKey = 'name'
    }

    public async getById(id) {
        return await this.byId(id)
    }

    public async where(fields, pagination) {
        if (Object.keys(fields).length > 0) {
            return await this.byFields({fields}, pagination)
        } else {
            return await this.all(pagination)
        }
    }

    public async create(fields) {
        const query = 'INSERT INTO ?? SET ?'
        let params: any[] = [this.tableName]
        let invalidFields = new Validation(fields)
        .required([
            'name',
            'label'
        ])
        if (invalidFields.length > 0) {
            throw new TypeError('Missing required fields ' + JSON.stringify(invalidFields))
        } else {
            params.push(new Validation(fields).updateFields(['name', 'label', 'description']))
            console.log('Submitting to query')
	    this.createQ({query, params})
            return this.byId(fields.name)
        }  
    }

    public async update(fields) {
        const query = 'UPDATE ?? SET ? WHERE ?? = ?'
        let params: any[] = [this.tableName]
        let invalidFields = new Validation(fields)
        .required([
            'name',
        ])
        if (invalidFields) {
            throw new TypeError('Missing required fields')
        } else {
            params.push(new Validation(fields).updateFields(['label, description']))
            params.push(this.primaryKey)
            params.push(fields.name)
            return this.createQ({query, params})
        }  
    }
}

export default Table;
