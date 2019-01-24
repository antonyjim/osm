import {
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLNonNull, 
    GraphQLString, 
    GraphQLBoolean
} from "graphql";


const CustomerType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Customer',
    description: 'Information about customers',
    fields: {
        nsNonsig: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'Unique customer number'
        },
        nsTradeStyle: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Name of business'
        },
        nsAddr1: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Address line 1'
        },
        nsAddr2: {
            type: GraphQLString,
            description: 'Address line 2'
        },
        nsCity: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'City'
        },
        nsState: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'State'
        },
        nsPostalCode: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Zip/Postal Code'
        },
        nsCountry: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Country code'
        },
        nsBrandKey: {
            type: GraphQLString,
            description: 'Allowable merchandise'
        },
        nsIsActive: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'Active status'
        },
        nsIsActiveTHQ: {
            type: new GraphQLNonNull(GraphQLBoolean),
            description: 'Active status for the website'
        },
        nsType: {
            type: GraphQLString,
            description: '3 digit type of customer'
        }
    }
})

export { CustomerType }