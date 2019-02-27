import Column from './columns'

const columnMutations = {
    update_column: (queryFields, fields, context) => new Column(context, queryFields).update(fields),
    create_column: (queryFields, fields, context) => new Column(context, queryFields).create(fields)
}

export default columnMutations