import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLNonNull, GraphQLSkipDirective } from "graphql";
import TableType from "./schema";
import Table from "./tables";


export const tableMutations = {
    add_table: (queryFields, fields, context) => new Table(context, queryFields).create(fields),
    update_table: (queryFields, fields, context) => new Table(context, queryFields).update(fields)
}