import Column from './columns'

const columnMutations = {
    update_column: (queryFields, fields, context) => new Column(context, queryFields).update(fields)
}

export default columnMutations