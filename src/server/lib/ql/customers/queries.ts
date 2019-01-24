import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";
import { CustomerType } from './schema'
import { Customer } from './customers'

export const customerQueries = {
    customer_list: {
        type: new GraphQLList(CustomerType),
        args: {
            nsTradeStyle: {
                type: GraphQLString
            },
            nsAddr1: {
                type: GraphQLString
            },
            nsAddr2: {
                type: GraphQLString
            },
            nsCity: {
                type: GraphQLString
            },
            nsState: {
                type: GraphQLString
            },
            nsPostalCode: {
                type: GraphQLString
            },
            nsCountry: {
                type: GraphQLString
            },
            nsIsActive: {
                type: GraphQLBoolean
            },
            nsIsActiveTHQ: {
                type: GraphQLBoolean
            },
            nsType: {
                type: GraphQLString
            }
        },
        resolve: ((_, {fields}) => new Customer().where({fields}))
    },
    customer: {
        type: CustomerType,
        args: {
            nsNonsig: {
                type: GraphQLNonNull(GraphQLID)
            }
        },
        resolve: ((_, {nsNonsig}, context) => {
            console.log(JSON.stringify(context))
            new Customer().getById({nsNonsig})
        })
    }
}