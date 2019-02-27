import { rootQueries } from "./queries";
import { Querynator } from "../../connection";
import { sqlToJsType } from "./constructSchema";

/**
 * lib/ql/schemadescriptions.ts
 * Provide descriptions for views and tables
*/

// Node Modules


// NPM Modules


// Local Modules


// Constants and global variables

export default class Description extends Querynator {
    constructor(context, table) {
        super(context)
        if (table.toLowerCase().slice(-5) === '_list') this.tableName = table.slice(0, -5)
        else this.tableName = table
        this.verifyAndReturnFields()
    }

    /**
     * Return the columns that are visible and queryable on any given table
     */
    public async verifyAndReturnFields() {
        return new Promise((resolve) => {
            /* Message to be returned with the response */
            let message: string = 'Details for view ' + this.tableName
            /* Provide the key to be used when pushing updates */
            let updateKey: string = '' 
            /* Describe the fields to the tableview */
            let formattedFields = {}
            /* Privileges that the user has on the table 
                one or more of: ['READ', 'UPDATE', 'DELETE', 'CREATE'] */
            let privs: string[] = []

            this.once('notFound', (e) => {
                return resolve({
                    errors: [
                        {
                            message: 'No data found for table ' + this.tableName
                        }
                    ]
                })
            })
            this.once('fieldDescriptors', (e) => {
                return resolve({
                    message,
                    privs,
                    id: updateKey,
                    cols: formattedFields
                })
            })
            const query = 'SELECT * FROM sys_db_dictionary_list WHERE table_name = ?'
            const params = [this.tableName]
            this.createQ({query, params}, 'CALL')
            .then(fields => {
                if (fields.length > 0) {
                    fields.map(field => {
                        if (field.update_key) updateKey = field.column_name
                        if (field.visible) {
                            formattedFields[field.label] = {
                                boundTo: field.column_name,
                                type: sqlToJsType(field.type),
                                nullable: field.nullable,
                                linkable: field.reference_id !== null || field.base_url ? true : false,
                                baseURL: field.base_url
                            }
                        }
                    })
                    /* Return a query for the user's authorized actions */
                    return this.createQ({
                        query: 'SELECT * FROM ??',
                        params: ['sys_authorization']
                    }, 'CALL')
                } else {
                    return this.emit('notFound')
                }
            })
            .then(authorization => {
                privs = authorization[0]
                this.emit('fieldDescriptors')
            })
            .catch(err => {
                console.error(err)
                this.emit('error')
            })
        })
    }
}