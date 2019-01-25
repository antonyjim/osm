import { GraphQLObjectType } from "graphql";

import { userQueries } from './../users/queries'
import { customerQueries } from "../customers/queries";
import { tableQueries } from "../tables/queries";

const rootQ = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user_list: userQueries.user_list,
        user: userQueries.user,
        customer_list: customerQueries.customer_list,
        customer: customerQueries.customer,
        table_list: tableQueries.table_list,
        table: tableQueries.table
    }
})

export { rootQ }