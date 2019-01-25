import { 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLNonNull, 
    GraphQLString, 
    GraphQLBoolean, 
    GraphQLInt 
} from "graphql";

const TableType: GraphQLObjectType = new GraphQLObjectType({
    name: 'Table',
    description: 'Basic table description',
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        label: {
            type: new GraphQLNonNull(GraphQLString)
        },
        description: {
            type: GraphQLString
        }
    }
})

export default TableType