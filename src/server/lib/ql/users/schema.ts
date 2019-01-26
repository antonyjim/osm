import { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLNonNull, 
    GraphQLString, 
    GraphQLBoolean, 
    GraphQLInt 
} from "graphql";
import CustomerType from '../customers/schema'
import User from './users'

const UserType: GraphQLObjectType = new GraphQLObjectType({
    name: 'User',
    description: 'Basic user entity',
    fields: {
        userId: {
            type: new GraphQLNonNull(GraphQLID)
        },
        userName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userEmail: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userIsLocked: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        userIsConfirmed: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        userInvalidLoginAttempts: {
            type: GraphQLInt
        },
        userDefaultNonsig: {
            type: CustomerType
        },
        userAwaitingPassword: {
            type: GraphQLBoolean
        },
        userFirstName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userLastName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userPhone: {
            type: new GraphQLNonNull(GraphQLString)
        },
        userLastLogin: {
            type: GraphQLString
        }
    }
})

export { UserType }
