import { GraphQLObjectType } from "graphql";

import { userMutations } from './../users/mutations'

const rootM = new GraphQLObjectType({
    name: 'RootMutationsType',
    fields: {
        update_user: userMutations.update_user,
        add_user: userMutations.add_user
    }
})

export default rootM