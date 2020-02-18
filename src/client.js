import { gql } from "apollo-boost";
import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
    uri: 'http://pine64:8000/graphql',
});