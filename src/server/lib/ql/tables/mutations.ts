import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLSkipDirective } from "graphql";
import TableType from "./schema";
import Table from "./tables";


export const tableMutations = {
    add_table: {
        type: TableType,
        args: {
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            label: {
                type: new GraphQLNonNull(GraphQLString)
            },
            description: {
                type: GraphQLString
            }
        },
        resolve: ((_, fields, context) => new Table(context).create(fields))
    },

    update_table: {
        type: TableType,
        args: {
            name: {
                type: GraphQLID
            },
            label: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            }
        },
        resolve: ((_, fields, context) => new Table(context).update(fields))
    }
}