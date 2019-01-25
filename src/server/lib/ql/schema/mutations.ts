import { GraphQLObjectType } from "graphql";

import { userMutations } from './../users/mutations'
import { tableMutations } from "../tables/mutations";

const rootM = new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        update_user: userMutations.update_user,
        add_user: userMutations.add_user,
        update_table: tableMutations.update_table,
        add_table: tableMutations.add_table
    }
})

export default rootM