import { Querynator } from "../../connection";
import { Validation } from "../../validation";

enum FOREIGN_KEY_ACTIONS {
    'CASCADE',
    'RESTRICT'
}

const ALTER_TABLE = 'ALTER TABLE'
const MODIFY_COLUMN = 'MODIFY COLUMN'
const CHANGE_COLUMN = 'CHANGE'
const VARCHAR = (len: number) => {
    if (typeof len !== 'number') throw new TypeError('VARCHAR length must be a number')
    return 'VARCHAR(' + len + ')'
}
const CHAR = (len: number) => {
    if (typeof len !== 'number') throw new TypeError('CHAR length must be a number')
    return  'CHAR(' + len + ')'
}
const TEXT = 'TEXT'
const NOT_NULL = 'NOT NULL'
const AUTO_INCREMENT = 'AUTO_INCREMENT'
const UNIQUE = 'UNIQUE'
const FOREIGN_KEY = async (table: string, column: string, onDelete: FOREIGN_KEY_ACTIONS = FOREIGN_KEY_ACTIONS.CASCADE, onUpdate: FOREIGN_KEY_ACTIONS = FOREIGN_KEY_ACTIONS.CASCADE) => {
    
}

class Table extends Querynator {
    constructor(context, fields) {
        super(context, fields)
        this.tableName = 'sys_db_object'
        this.primaryKey = 'sys_id'
        this.emit('init')
    }

    public async getById(id) {
        return await this.byId(id)
    }

    public async where(fields, pagination) {
        if (fields && Object.keys(fields).length > 0) {
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

    public async updateFields(fields) {
        
    }

    public async createFields(fields) {

    }
}

export default Table;
