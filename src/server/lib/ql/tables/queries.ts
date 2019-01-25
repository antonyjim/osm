import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLID } from "graphql";
import TableType from './schema'
import Table from './tables'

export const tableQueries = {
    table_list: {
        type: new GraphQLList(TableType),
        args: {
            name: {
                type: GraphQLString
            },
            label: {
                type: GraphQLString
            }
        },
        resolve: ((_, fields, context) => new Table(context).where(fields))
    },
    table: {
        type: TableType,
        args: {
            name: {
                type: GraphQLID
            }
        },
        resolve: ((_, {name}, context) => new Table(context).getById(name))
    }
}