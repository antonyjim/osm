import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLID } from "graphql";
import { UserType } from './schema'
import { User } from "./users";

export const userQueries = {
    user_list: {
        type: new GraphQLList(UserType),
        args: {
            userName: {
                type: GraphQLString
            },
            userEmail: {
                type: GraphQLString
            },
            userIsLocked: {
                type: GraphQLBoolean
            },
            userIsConfirmed: {
                type: GraphQLBoolean
            },
            userAwaitingPassword: {
                type: GraphQLBoolean
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
            userLastLogin: {
                type: GraphQLString
            }
        },
        resolve: ((_, fields) => new User().where(fields))
    },
    user: {
        type: UserType,
        args: {
            userId: {
                type: GraphQLID
            }
        },
        resolve: ((_, {userId}, context) => new User().getById(userId, context))
    }
}
