import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";
import CustomerType from './schema'
import { Customer } from './customers'

export const customerQueries = {
    customer_list: ((queryFields, fields, context, pagination) => new Customer(context, queryFields).where(fields, pagination)),
    customer: ((queryFields, {nsNonsig}, context) => new Customer(context, queryFields).getById(nsNonsig))
}

export default customerQueries