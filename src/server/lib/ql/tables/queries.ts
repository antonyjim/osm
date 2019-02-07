import Table from './tables'

const tableQueries = {
    table_list: ((queryFields, fields, context, pagination) => new Table(context, queryFields).where(fields, pagination)),
    table: ((queryFields, id, context) => new Table(context, queryFields).getById(id)),
    sys_db_object_list: ((queryFields, fields, context, pagination) => new Table(context, queryFields).where(fields, pagination))
}

export default tableQueries