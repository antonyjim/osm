import { rootQueries } from "./queries";
import { Querynator } from "../../connection";
import constructSchema, { sqlToJsType } from "./constructSchema";

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
        return new Promise(async (resolve) => {
            /* Message to be returned with the response */
            let message: string = 'Details for view ' + this.tableName
            /* Provide the key to be used when pushing updates */
            let updateKey: string = '' 
            /* Describe the fields to the tableview */
            let formattedFields = {}
            /* Privileges that the user has on the table 
                one or more of: ['READ', 'UPDATE', 'DELETE', 'CREATE'] */
            let privs: string[] = []

            const schema = await constructSchema()
            const thisTable = schema[this.tableName]
            if (!thisTable) {
                return resolve({
                    errors: [
                        {
                            message: 'No data found for table ' + this.tableName
                        }
                    ]
                })
            }
            Object.keys(thisTable.columns).map(col => {
                if (col.endsWith('_display')) return false
                let thisCol = thisTable.columns[col]
                let colDetails: {
                    type: string,
                    readonly: boolean,
                    reference: boolean,
                    boundTo: string,
                    refTable?: string
                } = {type: 'string', readonly: true, reference: false, boundTo: null};
                colDetails.type = thisCol.type
                colDetails.readonly = !!thisCol.readonly
                colDetails.reference = thisCol.reference
                colDetails.boundTo = col
                
                if (thisCol.reference) {
                    const displayCol = thisTable.columns[col + '_display']
                    colDetails.refTable = displayCol.tableRef
                    colDetails.boundTo = col + '_display'
                }
                formattedFields[thisCol.label] = colDetails
            })
            return resolve({...schema[this.tableName]})
        })
    }
}