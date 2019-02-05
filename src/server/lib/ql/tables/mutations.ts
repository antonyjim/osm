import Table from "./tables";


export const tableMutations = {
    add_table: (queryFields, fields, context) => new Table(context, queryFields).create(fields),
    update_table: (queryFields, fields, context) => new Table(context, queryFields).update(fields),
    add_field: (queryFields, fields, context) => new Table(context, queryFields).createFields(fields),
    update_field: (queryFields, fields, context) => new Table(context, queryFields).updateFields(fields)
}