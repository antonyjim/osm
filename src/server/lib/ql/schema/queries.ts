import { GraphQLObjectType } from "graphql";

import { userQueries } from './../users/queries'
import { customerQueries } from "../customers/queries";

const rootQ = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user_list: userQueries.user_list,
        user: userQueries.user,
        customer_list: customerQueries.customer_list,
        customer: customerQueries.customer
    }
})

export { rootQ }