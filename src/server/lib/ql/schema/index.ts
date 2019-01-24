import { GraphQLSchema } from "graphql";
import { rootQ } from './queries'
import rootM from "./mutations";

const qlSchema = new GraphQLSchema({
    query: rootQ,
    mutation: rootM
})

export { qlSchema }