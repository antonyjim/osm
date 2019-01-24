/**
 * lib/ql/users/mutations.ts
 * Create and modify user accounts
*/

// Node Modules
import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLID, GraphQLNonNull } from "graphql";

// NPM Modules


// Local Modules
import { UserType } from './schema'
import { User } from "./users";

// Constants and global variables


export const userMutations = {
    add_user: {
        type: UserType,
        args: {
            userName: {
                type: new GraphQLNonNull(GraphQLString)
            },
            userEmail: {
                type: new GraphQLNonNull(GraphQLString)
            },
            userDefaultNonsig: {
                type: new GraphQLNonNull(GraphQLString)
            },
            userFirstName: {
                type: new GraphQLNonNull(GraphQLString)
            },
            userLastName: {
                type: new GraphQLNonNull(GraphQLString)
            },
            userPhone: {
                type: new GraphQLNonNull(GraphQLString)
            }
        },
        resolve: ((_, fields, context) => new User().create(fields))
    },

    update_user: {
        type: UserType,
        args: {
            userId: {
                type: new GraphQLNonNull(GraphQLID)
            },
            userEmail: {
                type: GraphQLString
            },
            userDefaultNonsig: {
                type: GraphQLString
            },
            userFirstName: {
                type: GraphQLString
            },
            userLastName: {
                type: GraphQLString
            },
            userPhone: {
                type: GraphQLString
            },
            userPass: {
                type: GraphQLString
            },
            userPassConfirmation: {
                type: GraphQLString
            }
        },
        resolve: ((_, fields, context) => new User().update(fields, context))
    }
}