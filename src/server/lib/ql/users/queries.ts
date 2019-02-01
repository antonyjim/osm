 import { GraphQLList, GraphQLString, GraphQLBoolean, GraphQLID } from "graphql";
import { UserType } from './schema'
import CustomerType from '../customers/schema'
import User from "./users";

const userQueries = {
    user_list: (queryFields, fields, context, pagination) => new User(context, queryFields).where(fields, pagination),
    user: (queryFields, {userId}, context) => new User(context, queryFields).getById(userId)
}

export default userQueries
