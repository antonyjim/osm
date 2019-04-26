import Column from './columns'

const columnQueries = {
  sys_db_dictionary: (queryFields, id, context) =>
    new Column(context, queryFields).getById(id),
  sys_db_dictionary_list: (queryFields, fields, context, pagination) =>
    new Column(context, queryFields).getFields(fields, pagination)
}

export default columnQueries
