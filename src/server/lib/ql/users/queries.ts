 import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLID } from "graphql";
import { UserType } from './schema'
import CustomerType from '../customers/schema'
import User from "./users";
import { inspect } from 'util';

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
            },
            userCustomer: {
                type: CustomerType
            }
        },
        resolve: ((_, fields, context, info) => new User(context, info).where(fields))
    },
    user: {
        type: UserType,
        args: {
            userId: {
                type: GraphQLString
            }
        },
        resolve: ((_, {userId}, context, info) => new User(context, info).getById(userId))
    }
}
